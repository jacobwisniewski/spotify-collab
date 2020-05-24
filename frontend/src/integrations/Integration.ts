import { SpotifyProfileResponse } from "../models/SpotifyProfileResponse"
import responseToJson from "../utils/responseToJson"
import { SpotifyUserTopTracksResponse } from "../models/SpotifyUserTopTracksResponse"

export enum TimeRange {
  SHORT_TERM = "short_term",
  MEDIUM_TERM = "medium_term",
  LONG_TERM = "long_term"
}

export interface Integration {
  getSpotifyProfileData(spotifyId: string): Promise<SpotifyProfileResponse>
  getSpotifyUserTopTracks(spotifyId: string, timeRange: TimeRange): Promise<SpotifyUserTopTracksResponse>
}

const Integration: Integration = {
  getSpotifyProfileData(spotifyId) {
    return fetch(`/api/users/${spotifyId}`, {
      method: "GET"
    }).then(responseToJson)
  },
  getSpotifyUserTopTracks(spotifyId: string, timeRange: TimeRange): Promise<SpotifyUserTopTracksResponse> {
    return fetch(`/api/users/${spotifyId}/tracks?time_range=${timeRange}`, {
      method: "GET"
    }).then(responseToJson)
  }
}

export default Integration
