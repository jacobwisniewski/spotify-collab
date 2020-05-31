import { getPrivateSpotifyUserData, getPublicSpotifyUserData, getUserTopArtists, getUserTopTracks } from "../spotify"
import { UserProfileResponse } from "../models/UserProfileResponse"
import SpotifyService, { TimeRange } from "../services/SpotifyService"
import createHttpError from "http-errors"
import Queries, { SpotifyArtist } from "../db/queries"
import { SpotifyUserTopTracks } from "../models/SpotifyUserTopTracks"

interface SpotifyUserTopTracksResponse {}

type SpotifyUserTopArtists = SpotifyArtist[]

interface UserData {
  spotify_id: string
  display_name: string
  spotify_profile_url: string
  followers: number
  profile_picture_url: null | string
  country: string
  email: string
  spotify_account_type: string
}

interface UserProfileUsecase {
  getUserData(spotifyId: string): Promise<UserData>
  getUserProfile(spotifyId: string): Promise<UserProfileResponse>
  getUserTopTracks(spotifyId: string, timeRange: string): Promise<SpotifyUserTopTracks>
  getUserTopArtists(spotifyId: string, timeRange: string): Promise<SpotifyUserTopArtists>
}

const UserProfileUsecase: UserProfileUsecase = {
  async getUserData(spotifyId: string): Promise<UserData> {
    try {
      const userData = await getPrivateSpotifyUserData(spotifyId)
      return {
        ...userData
      }
    } catch (error) {
      throw error
    }
  },
  async getUserProfile(spotifyId: string): Promise<UserProfileResponse> {
    try {
      const spotifyTokens = await Queries.getUserSpotifyTokens(spotifyId)
      const spotifyProfile = await getPublicSpotifyUserData(spotifyId)
      return {
        spotifyId: spotifyProfile.spotify_id,
        displayName: spotifyProfile.display_name,
        spotifyProfileUrl: spotifyProfile.spotify_profile_url,
        spotifyPictureUrl: spotifyProfile.profile_picture_url,
        followers: spotifyProfile.followers,
        extendedData: !!spotifyTokens
      }
    } catch (error) {
      throw error
    }
  },
  async getUserTopTracks(spotifyId: string, timeRange: string): Promise<SpotifyUserTopTracks> {
    if (!Object.values(TimeRange).includes(timeRange as TimeRange)) {
      throw createHttpError(400, "Time range not a valid choice")
    }
    try {
      return await getUserTopTracks(spotifyId, timeRange as TimeRange)
    } catch (error) {
      throw error
    }
  },
  async getUserTopArtists(spotifyId: string, timeRange: string): Promise<SpotifyUserTopArtists> {
    if (!Object.values(TimeRange).includes(timeRange as TimeRange)) {
      throw createHttpError(400, "Time range not a valid choice")
    }
    try {
      return await getUserTopArtists(spotifyId, timeRange as TimeRange)
    } catch (error) {
      throw error
    }
  }
}

export default UserProfileUsecase
