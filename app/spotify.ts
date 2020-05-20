import Queries from "./db/queries"
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
  let spotifyProfile = await Queries.getUserSpotifyProfile(spotifyId)
  if (!spotifyProfile) {
    console.log(`Didn't find ${spotifyId} in database, requesting from Spotify.`)
    const accessToken = await checkForExpiredSpotifyAccessToken(process.env.DEFAULT_SPOTIFY_ID)
    try {
      const spotifyProfileResponse = await Integration.getSpotifyPublicUserProfile(accessToken, spotifyId)
      await Queries.createUserWithSpotifyProfile(spotifyProfileResponse)
      spotifyProfile = await Queries.getUserSpotifyProfile(spotifyProfileResponse.id)
    } catch (err) {
      return Promise.reject(err)
    }
  }

  return Promise.resolve(spotifyProfile)
}

const checkForExpiredSpotifyAccessToken = async (spotifyId: string): Promise<string> => {
  console.log(`Getting Spotify access token for ${spotifyId}.`)
  const spotifyTokens = await Queries.getUserSpotifyTokens(spotifyId)

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
  const spotifyTokens = await Queries.getUserSpotifyTokens(spotifyId)

  try {
    const newAccessToken = await Integration.refreshSpotifyToken(spotifyTokens.refresh_token)
    await Queries.updateUserWithAccessToken(spotifyId, newAccessToken)
    return Promise.resolve(newAccessToken)
  } catch (err) {
    return Promise.reject(err)
  }
}
