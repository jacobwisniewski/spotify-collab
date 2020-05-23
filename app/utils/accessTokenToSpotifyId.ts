import jwt from "jsonwebtoken"

interface DecodedAccessToken {
  spotifyId?: string
}

export const accessTokenToSpotifyId = (accessToken: string): string => {
  const decodedAccessToken = jwt.verify(accessToken, process.env.JWT_ACCESS_TOKEN_SECRET_KEY) as DecodedAccessToken
  return decodedAccessToken.spotifyId
}
