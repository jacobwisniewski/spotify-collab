import { SpotifyProfileResponse } from "../models/SpotifyProfileResponse"
import responseToJson from "../utils/responseToJson"

export interface Integration {
  getSpotifyProfileData(spotifyId: string): Promise<SpotifyProfileResponse>,
}

const Integration: Integration = {
  getSpotifyProfileData(spotifyId) {
    return fetch(`/api/users/${spotifyId}`, {
      method: "GET"
    }).then(responseToJson)
  }
}

export default Integration
