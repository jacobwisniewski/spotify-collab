import { Integration } from "./Integration"
import responseToJson from "../utils/responseToJson"

const MockIntegration: Integration = {
  getSpotifyProfileData(spotifyId) {
    return fetch(`/api/users/${spotifyId}`, {
      method: "GET"
    }).then(responseToJson)
  }
}

export default MockIntegration
