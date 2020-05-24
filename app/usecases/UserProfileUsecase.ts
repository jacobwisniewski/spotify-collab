import { accessTokenToSpotifyId } from "../utils/accessTokenToSpotifyId"
import { getPublicSpotifyUserData, getUserTopTracks } from "../spotify"
import Queries from "../db/queries"
import { SpotifyProfileResponse } from "../models/SpotifyProfileResponse"

interface UserProfileUsecase {
  getSpotifyProfile(accessToken: string, spotifyId: string): Promise<SpotifyProfileResponse>
}

const UserProfileUsecase: UserProfileUsecase = {
  async getSpotifyProfile(accessToken: string, spotifyId: string): Promise<SpotifyProfileResponse> {
    try {
      let spotifyProfile
      if (accessToken) {
        const loggedInSpotifyId = accessTokenToSpotifyId(accessToken)
        if (loggedInSpotifyId === spotifyId) {
          spotifyProfile = await Queries.getPrivateSpotifyProfile(spotifyId)
        }
      }
      return await getPublicSpotifyUserData(spotifyId)
    } catch (error) {
      throw error
    }
  }
}

export default UserProfileUsecase
