import express from "express"
import cookieParser from "cookie-parser"
import { config } from "dotenv"
import UserAuthenticationUsecase from "../usecases/UserAuthenticationUsecase"

config()

const router = express.Router()
router.use(cookieParser())

router.get("/callback", async (req, res, next) => {
  console.log(`/api/auth/callback: Callback initialized`)
  const receivedState = String(req.query.state)
  const authorizationCode = String(req.query.code)
  const expectedState = req.cookies[process.env.COOKIE_SPOTIFY_STATE]

  try {
    const { tokens, spotifyId } = await UserAuthenticationUsecase.createOrUpdateUser(receivedState, expectedState, authorizationCode)
    const { accessToken, refreshToken } = tokens

    res.cookie(process.env.COOKIE_ACCESS_TOKEN, accessToken.token, {
      maxAge: accessToken.expiresIn * 1000,
      httpOnly: true
    })

    res.cookie(process.env.COOKIE_REFRESH_TOKEN, refreshToken.token, {
      maxAge: refreshToken.expiresIn,
      httpOnly: true
    })

    res.redirect(process.env.REACT_APP_URL + `/@${spotifyId}`)
  } catch (error) {
    next(error)
  }
})

router.get("/authorize", (req, res, next) => {
  console.log(`/api/auth/authorize: Spotify authorize redirect`)
  const { state, url } = UserAuthenticationUsecase.getSpotifyAuthorizeUrl()

  res.cookie(process.env.COOKIE_SPOTIFY_STATE, state, {
    maxAge: 900000,
    httpOnly: true
  })

  res.redirect(url)
})

router.post("/token", async (req, res, next) => {
  console.log(`/api/auth/token: Refresh access token`)
  const token = req.cookies[process.env.COOKIE_REFRESH_TOKEN]

  try {
    const accessToken = await UserAuthenticationUsecase.refreshAccessToken(token)

    res.cookie(process.env.COOKIE_ACCESS_TOKEN, accessToken.token, {
      maxAge: accessToken.expiresIn * 1000,
      httpOnly: true
    })

    res.sendStatus(200)
  } catch (error) {
    next(error)
  }
})

export default router
