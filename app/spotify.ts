import Queries from "./db/queries"
import SpotifyService, { SpotifyAccessTokenResponse } from "./services/SpotifyService"
import { config } from "dotenv"
import createError from "http-errors"

config()

export interface PublicSpotifyProfileData {
  spotify_id: string
  display_name: string
  profile_picture_url: string
  spotify_profile_url: string
  followers: number
}

export const getPublicSpotifyUserData = async (spotifyId: string): Promise<PublicSpotifyProfileData> => {
  let spotifyProfile = await Queries.getPublicSpotifyProfile(spotifyId)
  if (!spotifyProfile) {
    console.log(`Didn't find ${spotifyId} in database, requesting from Spotify.`)
    const accessToken = await checkForExpiredSpotifyAccessToken(process.env.DEFAULT_SPOTIFY_ID)
    try {
      const spotifyProfileResponse = await SpotifyService.getSpotifyPublicUserProfile(accessToken, spotifyId)
      await Queries.createUserWithSpotifyProfile(spotifyProfileResponse)
      spotifyProfile = await Queries.getPublicSpotifyProfile(spotifyProfileResponse.id)
    } catch (err) {
      throw createError("User doesn't exist with that Spotify id")
    }
  }

  return spotifyProfile
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
    const newAccessToken = await SpotifyService.refreshSpotifyToken(spotifyTokens.refresh_token)
    await Queries.updateUserWithAccessToken(spotifyId, newAccessToken)
    return Promise.resolve(newAccessToken)
  } catch (err) {
    return Promise.reject(err)
  }
}
