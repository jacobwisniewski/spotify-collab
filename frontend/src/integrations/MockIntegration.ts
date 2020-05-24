import { Integration } from "./Integration"
import { SpotifyProfileResponse } from "../models/SpotifyProfileResponse"

const MockIntegration: Integration = {
  getSpotifyProfileData() {
    return Promise.resolve({
      spotify_id: "mlqeo7jnhsus5p2tks5jlxkzw",
      display_name: "Jacob Wisniewski",
      country: "AU",
      email: "jacobwisniee@gmail.com",
      spotify_profile_url: "https://open.spotify.com/user/mlqeo7jnhsus5p2tks5jlxkzw",
      profile_picture_url: null,
      followers: 0,
      spotify_account_type: "premium"
    } as SpotifyProfileResponse)
  }
}

export default MockIntegration
