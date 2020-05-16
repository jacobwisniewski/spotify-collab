import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import { config } from "dotenv"
import { randomBytes } from "crypto"
import Integration from "../spotify/Integration"
import Queries from "../db/connect"
import { sign } from "jsonwebtoken"

config()

const router = express.Router()
router.use(cors())
router.use(cookieParser())

router.get("/callback", async (req, res) => {
  console.log(`/api/auth/callback: Callback initialized`)
  const receivedState = req.query.state
  const expectedState = req.cookies[process.env.COOKIE_SPOTIFY_STATE]

  if (receivedState !== expectedState) {
    res.sendStatus(401)
    return
  }

  // Get the users spotify tokens and spotify user data
  const authorizationCode = String(req.query.code)

  const tokenResponse = await Integration.getSpotifyTokens(authorizationCode)
  const spotifyUserData = await Integration.getSpotifyPrivateUserProfile(tokenResponse.access_token)

  // Check whether user has existing data, if they do update the user, otherwise create a new user
  const userDataQuery = await Queries.getSpotifyUserData(spotifyUserData.id)

  if (!!userDataQuery.rows) {
    await Queries.createUserWithSpotifyProfileDateAndTokens(spotifyUserData, tokenResponse)
  } else {
    await Queries.updateUserWithTokens(spotifyUserData, tokenResponse)
  }

  // Create access and refresh tokens + update the database with the refresh token
  const accessToken = createAccessToken(spotifyUserData.id)
  const refreshToken = createRefreshToken(spotifyUserData.id)

  await Queries.updateRefreshToken(refreshToken, spotifyUserData.id)

  res.cookie(process.env.COOKIE_ACCESS_TOKEN, accessToken.accessToken, {
    maxAge: accessToken.expiresIn * 1000,
    httpOnly: true
  })
  res.cookie(process.env.COOKIE_REFRESH_TOKEN, refreshToken, {
    maxAge: 365 * 24 * 60 * 60 * 1000,
    httpOnly: true
  })

  // Redirect to the users page
  res.redirect(process.env.REACT_APP_URL + `/${spotifyUserData.id}`)
})

router.get("/authorize", (req, res) => {
  console.log(`/api/auth/authorize: Spotify authorize redirect`)
  const state = randomBytes(10).toString("hex")
  res.cookie(process.env.COOKIE_SPOTIFY_STATE, state, {
    maxAge: 900000,
    httpOnly: true
  })

  const redirectUrl =
    "https://accounts.spotify.com/authorize" +
    `?client_id=${process.env.SPOTIFY_CLIENT_ID}` +
    `&response_type=code` +
    `&redirect_uri=${process.env.SPOTIFY_REDIRECT_URI}` +
    `&state=${state}` +
    `&scope=${process.env.SPOTIFY_SCOPE}` +
    `&show_dialog=false`

  res.redirect(redirectUrl)
})

router.post("/token", async (req, res) => {
  console.log(`/api/auth/token: Refresh access token`)
  const refreshToken = req.cookies[process.env.COOKIE_REFRESH_TOKEN]

  const refreshTokenUserQuery = await Queries.getRefreshTokenUser(refreshToken)

  if (refreshToken && !!refreshTokenUserQuery.rows) {
    const refreshTokenUserSpotifyId = refreshTokenUserQuery.rows[0].spotify_id
    const tokens = createAccessToken(refreshTokenUserSpotifyId)

    res.cookie(process.env.COOKIE_ACCESS_TOKEN, tokens.accessToken, {
      maxAge: Number(process.env.JWT_ACCESS_TOKEN_EXPIRY_SECONDS) * 1000,
      httpOnly: true
    })
    res.sendStatus(200)
  } else {
    res.sendStatus(400)
  }
})

interface AccessToken {
  accessToken: string
  expiresIn: number
}

const createAccessToken = (spotifyId: string): AccessToken => {
  const accessToken = sign({ spotifyId }, process.env.JWT_ACCESS_TOKEN_SECRET_KEY, {
    expiresIn: Number(process.env.JWT_ACCESS_TOKEN_EXPIRY_SECONDS)
  })

  return {
    accessToken,
    expiresIn: Number(process.env.JWT_ACCESS_TOKEN_EXPIRY_SECONDS)
  }
}

const createRefreshToken = (spotifyId: string): string => {
  return sign({ spotifyId }, process.env.JWT_REFRESH_TOKEN_SECRET_KEY)
}

export default router
