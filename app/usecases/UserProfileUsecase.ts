import { getPublicSpotifyUserData, getUserTopArtists, getUserTopTracks } from "../spotify"
import { SpotifyProfile } from "../models/SpotifyProfile"
import SpotifyService, { TimeRange } from "../services/SpotifyService"
import createHttpError from "http-errors"
import Queries, { SpotifyArtist } from "../db/queries"
import { SpotifyUserTopTracks } from "../models/SpotifyUserTopTracks"

interface SpotifyUserTopTracksResponse {}

type SpotifyUserTopArtists = SpotifyArtist[]

interface UserProfileUsecase {
  getSpotifyProfile(spotifyId: string): Promise<SpotifyProfile>
  getUserTopTracks(spotifyId: string, timeRange: string): Promise<SpotifyUserTopTracks>
  getUserTopArtists(spotifyId: string, timeRange: string): Promise<SpotifyUserTopArtists>
}

const UserProfileUsecase: UserProfileUsecase = {
  async getSpotifyProfile(spotifyId: string): Promise<SpotifyProfile> {
    try {
      const spotifyTokens = await Queries.getUserSpotifyTokens(spotifyId)
      const spotifyProfile = await getPublicSpotifyUserData(spotifyId)
      return {
        ...spotifyProfile,
        extended_data: !!spotifyTokens
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
