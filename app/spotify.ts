import Queries, { PrivateSpotifyProfile, PublicSpotifyProfile, SpotifyArtist, SpotifyTrack } from "./db/queries"
import SpotifyService, { SpotifyAccessTokenResponse, TimeRange } from "./services/SpotifyService"
import { config } from "dotenv"
import createError from "http-errors"

config()

export const getPublicSpotifyUserData = async (spotifyId: string): Promise<PublicSpotifyProfile> => {
  let spotifyProfile = await Queries.getPublicSpotifyProfile(spotifyId)
  if (!spotifyProfile) {
    console.log(`Didn't find ${spotifyId} in database, requesting from Spotify.`)
    try {
      const accessToken = await checkForExpiredSpotifyAccessToken(process.env.DEFAULT_SPOTIFY_ID)
      const spotifyProfileResponse = await SpotifyService.getSpotifyPublicUserProfile(accessToken, spotifyId)
      await Queries.createUserWithSpotifyProfile(spotifyProfileResponse)
      spotifyProfile = await Queries.getPublicSpotifyProfile(spotifyProfileResponse.id)
    } catch (error) {
      throw error
    }

    if (!spotifyProfile) {
      throw createError(400, "User doesn't exist with that Spotify id")
    }
  }

  return spotifyProfile
}

export const getPrivateSpotifyUserData = async (spotifyId: string): Promise<PrivateSpotifyProfile> => {
  try {
    return await Queries.getPrivateSpotifyProfile(spotifyId)
  } catch (error) {
    throw error
  }
}

export const getUserTopTracks = async (spotifyId: string, timeRange: TimeRange): Promise<SpotifyTrack[]> => {
  try {
    const accessToken = await checkForExpiredSpotifyAccessToken(spotifyId)
    const topTracksResponse = await SpotifyService.getUserTopTracks(accessToken, timeRange, 25, 0)
    const topTracks = topTracksResponse.items.map(({ id, name, external_urls, album, artists }) => ({
      id,
      name,
      url: external_urls.spotify,
      artists: artists.map(({ id, name, external_urls }) => ({ id, name, url: external_urls.spotify })),
      album: { id: album.id, name: album.name, image: album.images[0].url, url: external_urls.spotify }
    }))
    await Queries.addUserTopTracks(spotifyId, timeRange, topTracks)
    return topTracks
  } catch (error) {
    throw error
  }
}

export const getUserTopArtists = async (spotifyId: string, timeRange: TimeRange): Promise<SpotifyArtist[]> => {
  try {
    const accessToken = await checkForExpiredSpotifyAccessToken(spotifyId)
    const topArtistsResponse = await SpotifyService.getUserTopArtists(accessToken, timeRange, 25, 0)
    const topArtists = topArtistsResponse.items.map(({ id, name, images, external_urls }) => ({
      id,
      name,
      image: images[0].url,
      url: external_urls.spotify
    }))
    await Queries.addUserTopArtists(spotifyId, timeRange, topArtists)
    return topArtists
  } catch (error) {
    throw error
  }
}

const checkForExpiredSpotifyAccessToken = async (spotifyId: string): Promise<string> => {
  console.log(`Getting Spotify access token for ${spotifyId}.`)
  let accessToken
  try {
    const spotifyTokens = await Queries.getUserSpotifyTokens(spotifyId)
    if (!spotifyTokens) {
      throw createError(400, "That user has not signed up before")
    }

    if (new Date(spotifyTokens.expires_on).getTime() - Date.now() <= 5 * 1000) {
      const newAccessTokens = await refreshUsersSpotifyToken(spotifyId)
      accessToken = newAccessTokens.access_token
    } else {
      accessToken = spotifyTokens.access_token
    }
  } catch (error) {
    throw error
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
