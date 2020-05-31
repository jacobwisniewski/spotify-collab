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
  refreshAccessToken(refreshToken: string): Promise<Token>
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

      const { refresh_token: refreshTokenString } = await Queries.getRefreshTokenFromSpotifyId(spotifyUserData.id)

      let accessToken: Token
      let refreshToken: Token
      if (!refreshTokenString) {
        const authenticationToken = createAuthenticationTokens(spotifyUserData.id)
        accessToken = authenticationToken.accessToken
        refreshToken = authenticationToken.refreshToken

        await Queries.updateUserRefreshToken(authenticationToken.refreshToken.token, spotifyUserData.id)
      } else {
        refreshToken = {
          token: refreshTokenString,
          expiresIn: 365 * 24 * 60 * 60
        }
        accessToken = createAccessToken(spotifyUserData.id)
      }

      return {
        tokens: {
          accessToken,
          refreshToken
        },
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
  async refreshAccessToken(refreshToken: string): Promise<Token> {
    const { spotify_id: spotifyId } = await Queries.getSpotifyIdFromRefreshToken(refreshToken)

    if (!spotifyId) throw createError(400, "Refresh token does not return valid user")

    return createAccessToken(spotifyId)
  }
}

const createAuthenticationTokens = (spotifyId: string): AuthenticationTokens => ({
  refreshToken: createJWTToken(spotifyId, process.env.JWT_REFRESH_TOKEN_SECRET_KEY, 365 * 24 * 60 * 60),
  accessToken: createAccessToken(spotifyId)
})

const createAccessToken = (spotifyId: string): Token =>
  createJWTToken(spotifyId, process.env.JWT_ACCESS_TOKEN_SECRET_KEY, Number(process.env.JWT_ACCESS_TOKEN_EXPIRY_SECONDS))

const createJWTToken = (spotifyId: string, secretKey: string, expiresIn: number): Token => {
  return {
    token: sign({ spotifyId }, secretKey, { expiresIn }),
    expiresIn
  }
}

export default UserAuthenticationUsecase
