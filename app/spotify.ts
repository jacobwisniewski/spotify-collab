import Queries from "./db/connect"
import Integration, { SpotifyAccessTokenResponse } from "./spotify/Integration"
import { config } from "dotenv"

config()

export interface PublicSpotifyProfileData {
  spotify_id: string
  display_name: string
  profile_picture_url: string
  spotify_profile_url: string
  followers: number
}

export const getPublicSpotifyUserData = async (spotifyId: string): Promise<PublicSpotifyProfileData> => {
  let userSpotifyProfileDataQuery = await Queries.getSpotifyUserData(spotifyId)
  if (!userSpotifyProfileDataQuery.rows.length) {
    console.log(`Didn't find ${spotifyId} in database, requesting from Spotify.`)
    const accessToken = await checkForExpiredSpotifyAccessToken(process.env.DEFAULT_SPOTIFY_ID)
    try {
      const spotifyUserData = await Integration.getSpotifyPublicUserProfile(accessToken, spotifyId)
      userSpotifyProfileDataQuery = await Queries.createUserWithSpotifyProfileData(spotifyUserData)
    } catch (err) {
      return Promise.reject(err)
    }
  }

  return Promise.resolve(userSpotifyProfileDataQuery.rows[0])
}

const checkForExpiredSpotifyAccessToken = async (spotifyId: string): Promise<string> => {
  console.log(`Getting Spotify access token for ${spotifyId}.`)
  const spotifyTokensQuery = await Queries.getUserSpotifyTokens(spotifyId)
  const spotifyTokens = spotifyTokensQuery.rows[0]

  let accessToken
  if (new Date(spotifyTokens.expires_on).getTime() - Date.now() <= 5 * 1000) {
    const newAccessTokens = await refreshUsersSpotifyToken(spotifyId)
    accessToken = newAccessTokens.access_token
  } else {
    accessToken = spotifyTokens.access_token
  }

  console.log(`Successfully gotten Spotify access token: ${accessToken}.`)
  return accessToken
}

const refreshUsersSpotifyToken = async (spotifyId: string): Promise<SpotifyAccessTokenResponse> => {
  console.log(`Refreshing Spotify access token for ${spotifyId}.`)
  const spotifyTokensQuery = await Queries.getUserSpotifyTokens(spotifyId)

  const spotifyTokens = spotifyTokensQuery.rows[0]

  try {
    const newAccessToken = await Integration.refreshSpotifyToken(spotifyTokens.refresh_token)
    await Queries.updateUserWithAccessToken(spotifyId, newAccessToken)
    return Promise.resolve(newAccessToken)
  } catch (err) {
    return Promise.reject(err)
  }
}
