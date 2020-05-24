import SpotifyService from "../services/SpotifyService"
import Queries from "../db/queries"
import { sign } from "jsonwebtoken"
import createError from "http-errors"
import { randomBytes } from "crypto"

interface Token {
  token: string
  expiresIn: number
}

interface AuthenticationTokens {
  accessToken: Token
  refreshToken: Token
}

interface CallbackResponse {
  tokens: AuthenticationTokens
  spotifyId: string
}

interface AuthorizeUrlResponse {
  url: string
  state: string
}

interface UserAuthenticationUsecase {
  createOrUpdateUser(receivedState: string, expectedState: string, authorizationCode: string): Promise<CallbackResponse>
  getSpotifyAuthorizeUrl(): AuthorizeUrlResponse
  refreshAuthorizationTokens(refreshToken: string): Promise<AuthenticationTokens>
}

const UserAuthenticationUsecase: UserAuthenticationUsecase = {
  async createOrUpdateUser(receivedState: string, expectedState: string, authorizationCode: string): Promise<CallbackResponse> {
    if (receivedState !== expectedState) {
      throw createError(401, `Received state "${receivedState}" not equal to expected state "${expectedState}"`)
    }

    try {
      const tokenResponse = await SpotifyService.getSpotifyTokens(authorizationCode)
      const spotifyUserData = await SpotifyService.getSpotifyPrivateUserProfile(tokenResponse.access_token)

      await Queries.addUserWithSpotifyProfileAndSpotifyTokens(spotifyUserData, tokenResponse)

      const authenticationTokens = createAuthenticationTokens(spotifyUserData.id)
      await Queries.updateUserRefreshToken(authenticationTokens.refreshToken.token, spotifyUserData.id)

      return {
        tokens: authenticationTokens,
        spotifyId: spotifyUserData.id
      }
    } catch (error) {
      throw error
    }
  },
  getSpotifyAuthorizeUrl(): AuthorizeUrlResponse {
    const state = randomBytes(10).toString("hex")

    return {
      state: state,
      url:
        "https://accounts.spotify.com/authorize" +
        `?client_id=${process.env.SPOTIFY_CLIENT_ID}` +
        `&response_type=code` +
        `&redirect_uri=${process.env.SPOTIFY_REDIRECT_URI}` +
        `&state=${state}` +
        `&scope=${process.env.SPOTIFY_SCOPE}` +
        `&show_dialog=false`
    }
  },
  async refreshAuthorizationTokens(refreshToken: string): Promise<AuthenticationTokens> {
    const spotifyId = await Queries.getSpotifyIdFromRefreshToken(refreshToken)

    if (!spotifyId) throw createError(400, "Refresh token does not return valid user")

    const tokens = createAuthenticationTokens(spotifyId)
    await Queries.updateUserRefreshToken(tokens.refreshToken.token, spotifyId)

    return tokens
  }
}

const createAuthenticationTokens = (spotifyId: string): AuthenticationTokens => {
  const accessToken = sign({ spotifyId }, process.env.JWT_ACCESS_TOKEN_SECRET_KEY, {
    expiresIn: Number(process.env.JWT_ACCESS_TOKEN_EXPIRY_SECONDS)
  })
  const refreshToken = sign({ spotifyId }, process.env.JWT_REFRESH_TOKEN_SECRET_KEY)
  return {
    refreshToken: {
      token: refreshToken,
      expiresIn: 365 * 24 * 60 * 60 * 1000
    },
    accessToken: {
      token: accessToken,
      expiresIn: Number(process.env.JWT_ACCESS_TOKEN_EXPIRY_SECONDS)
    }
  }
}

export default UserAuthenticationUsecase
