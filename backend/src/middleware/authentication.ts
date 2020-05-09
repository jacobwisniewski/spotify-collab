import { config } from "dotenv"
import { JsonWebTokenError, verify } from "jsonwebtoken"
import { Request, Response } from "express"

config()

interface AuthRequest extends Request {
  user: string
}

interface DecodedAccessToken {
  spotifyId: string
  iat: number
  exp: number
}

export const userAuthentication = async (req: AuthRequest, res: Response, next: any) => {
  const accessToken = req.cookies[process.env.COOKIE_ACCESS_TOKEN]
  // Check for internal access token, if no token, return 401 (Unauthorised)
  if (!accessToken) return res.sendStatus(401)

  verify(accessToken, process.env.JWT_ACCESS_TOKEN_SECRET_KEY, (err: JsonWebTokenError, decoded: DecodedAccessToken) => {
    if (err) return res.sendStatus(403)
    req.user = decoded.spotifyId
    next()
  })
}
