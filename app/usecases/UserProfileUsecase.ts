import { getPublicSpotifyUserData, getUserTopTracks } from "../spotify"
import { SpotifyProfileResponse } from "../models/SpotifyProfileResponse"
import SpotifyService, { TimeRange } from "../services/SpotifyService"
import createHttpError from "http-errors"
import Queries from "../db/queries"

interface SpotifyUserTopTracksResponse {}

interface UserProfileUsecase {
  getSpotifyProfile(spotifyId: string): Promise<SpotifyProfileResponse>
  getUserTopTracks(spotifyId: string, timeRange: string): Promise<SpotifyUserTopTracksResponse>
}

const UserProfileUsecase: UserProfileUsecase = {
  async getSpotifyProfile(spotifyId: string): Promise<SpotifyProfileResponse> {
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
  async getUserTopTracks(spotifyId: string, timeRange: string): Promise<SpotifyUserTopTracksResponse> {
    if (!Object.values(TimeRange).includes(timeRange as TimeRange)) {
      throw createHttpError(400, "Time range not a valid choice")
    }
    try {
      return await getUserTopTracks(spotifyId, timeRange as TimeRange)
    } catch (error) {
      throw error
    }
  }
}

export default UserProfileUsecase
