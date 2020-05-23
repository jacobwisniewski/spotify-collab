import responseToJson from "../utils/responseToJson"
import fetch from "node-fetch"

const SPOTIFY_AUTH_BASE_URL = "https://accounts.spotify.com"
const SPOTIFY_API_BASE_URL = "https://api.spotify.com/v1"

export interface SpotifyTokenResponse {
  access_token: string
  token_type: string
  scope: string
  expires_in: number
  refresh_token: string
}

interface ProfileExternalUrls {
  spotify: string
}

interface ProfileFollowers {
  href: string | null
  total: number
}

interface ProfileImages {
  height: string | null
  url: string
  width: string | null
}

export interface SpotifyPublicProfileResponse {
  display_name: string
  external_urls: ProfileExternalUrls
  followers: ProfileFollowers
  href: string
  id: string
  images: ProfileImages[]
  type: string
  uri: string
}

export interface SpotifyAccessTokenResponse {
  access_token: string
  token_type: string
  scope: string
  expires_in: number
}

export interface SpotifyPrivateProfileResponse {
  country: string
  display_name: string
  email: string
  external_urls: ProfileExternalUrls
  followers: ProfileFollowers
  href: string
  id: string
  images: ProfileImages[]
  product: string
  type: string
  uri: string
}

export interface SpotifyService {
  getSpotifyTokens(authorizationCode: string): Promise<SpotifyTokenResponse>
  getSpotifyPrivateUserProfile(accessToken: string): Promise<SpotifyPrivateProfileResponse>
  getSpotifyPublicUserProfile(accessCode: string, spotifyId: string): Promise<SpotifyPublicProfileResponse>
  refreshSpotifyToken(refreshToken: string): Promise<SpotifyAccessTokenResponse>
}

const SpotifyService: SpotifyService = {
  getSpotifyPrivateUserProfile(accessCode: string): Promise<SpotifyPrivateProfileResponse> {
    return fetch(SPOTIFY_API_BASE_URL + "/me", {
      headers: {
        Authorization: `Bearer ${accessCode}`
      }
    }).then(responseToJson)
  },
  getSpotifyTokens(authorizationCode: string): Promise<SpotifyTokenResponse> {
    return fetch(SPOTIFY_AUTH_BASE_URL + "/api/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: new URLSearchParams({
        grant_type: "authorization_code",
        code: authorizationCode,
        redirect_uri: process.env.SPOTIFY_REDIRECT_URI,
        client_id: process.env.SPOTIFY_CLIENT_ID,
        client_secret: process.env.SPOTIFY_CLIENT_SECRET
      })
    }).then(responseToJson)
  },
  getSpotifyPublicUserProfile(accessCode: string, spotifyId: string): Promise<SpotifyPublicProfileResponse> {
    return fetch(SPOTIFY_API_BASE_URL + `/users/${spotifyId}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessCode}`
      }
    }).then(responseToJson)
  },
  refreshSpotifyToken(refreshToken: string): Promise<SpotifyAccessTokenResponse> {
    return fetch(SPOTIFY_AUTH_BASE_URL + "/api/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: new URLSearchParams({
        grant_type: "refresh_token",
        refresh_token: refreshToken,
        client_id: process.env.SPOTIFY_CLIENT_ID,
        client_secret: process.env.SPOTIFY_CLIENT_SECRET
      })
    }).then(responseToJson)
  }
}
export default SpotifyService
