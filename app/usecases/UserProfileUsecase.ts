import { SpotifyProfileResponse } from "../../frontend/src/models/SpotifyProfileResponse"
import { accessTokenToSpotifyId } from "../utils/accessTokenToSpotifyId"
import { getPublicSpotifyUserData } from "../spotify"
import createError from "http-errors"
import Queries from "../db/queries"

interface UserProfileUsecase {
  getSpotifyProfile(accessToken: string, spotifyId: string): Promise<SpotifyProfileResponse>
}

const UserProfileUsecase: UserProfileUsecase = {
  async getSpotifyProfile(accessToken: string, spotifyId: string): Promise<SpotifyProfileResponse> {
    try {
      if (accessToken) {
        const loggedInSpotifyId = accessTokenToSpotifyId(accessToken)
        if (loggedInSpotifyId === spotifyId) {
          return await Queries.getPrivateSpotifyProfile(spotifyId)
        }
      }
      return await getPublicSpotifyUserData(spotifyId)
    } catch (error) {
      throw error
    }
  }
}

export default UserProfileUsecase
