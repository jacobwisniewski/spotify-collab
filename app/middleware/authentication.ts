import { config } from "dotenv"
import { verify } from "jsonwebtoken"
import { Request, Response } from "express"
import UserAuthenticationUsecase from "../usecases/UserAuthenticationUsecase"

config()

export interface AuthRequest extends Request {
  user: string
}

interface DecodedAccessToken {
  spotifyId: string
  iat: number
  exp: number
}

export const userAuthentication = async (req: AuthRequest, res: Response, next: any) => {
  const cookieAccessToken = req.cookies[process.env.COOKIE_ACCESS_TOKEN]
  const cookieRefreshToken = req.cookies[process.env.COOKIE_REFRESH_TOKEN]

  if (!cookieRefreshToken) return res.sendStatus(401)

  let accessToken
  if (!cookieAccessToken) {
    try {
      const refreshedAccessToken = await UserAuthenticationUsecase.refreshAccessToken(cookieRefreshToken)

      accessToken = refreshedAccessToken.token

      res.cookie(process.env.COOKIE_ACCESS_TOKEN, refreshedAccessToken.token, {
        maxAge: refreshedAccessToken.expiresIn * 1000,
        httpOnly: true
      })
    } catch (errors) {
      res.sendStatus(401) // TODO Better error handling
    }
  } else {
    accessToken = cookieAccessToken
  }

  try {
    const decoded = verify(accessToken, process.env.JWT_ACCESS_TOKEN_SECRET_KEY) as DecodedAccessToken
    req.user = decoded.spotifyId
    next()
  } catch (error) {
    next(error)
  }
}
