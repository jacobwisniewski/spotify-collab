import { UserProfileResponse } from "../models/UserProfileResponse"
import responseToJson from "../utils/responseToJson"
import { SpotifyUserTopTracksResponse } from "../models/SpotifyUserTopTracksResponse"
import { SpotifyUserTopArtistsResponse } from "../models/SpotifyUserTopArtistsResponse"
import { UserDataResponse } from "../models/UserDataResponse"

export enum TimeRange {
  SHORT_TERM = "short_term",
  MEDIUM_TERM = "medium_term",
  LONG_TERM = "long_term"
}

export interface Integration {
  getUserData(): Promise<UserDataResponse>
  refreshAccessTokens(): Promise<void>
  getUserProfile(spotifyId: string): Promise<UserProfileResponse>
  getSpotifyUserTopTracks(spotifyId: string, timeRange: TimeRange): Promise<SpotifyUserTopTracksResponse>
  getSpotifyUserTopArtists(spotifyId: string, timeRange: TimeRange): Promise<SpotifyUserTopArtistsResponse>
  getUserSessionData(): UserDataResponse | undefined
  setUserSessionData(userData: UserDataResponse): void
}

const Integration: Integration = {
  refreshAccessTokens(): Promise<void> {
    return fetch(`/api/auth/token`, {
      method: "POST",
      credentials: "include"
    }).then(responseToJson)
  },
  getUserData() {
    return fetch(`/api/users`, {
      method: "GET",
      credentials: "include"
    }).then(responseToJson)
  },
  getUserProfile(spotifyId) {
    return fetch(`/api/users/${spotifyId}`, {
      method: "GET"
    }).then(responseToJson)
  },
  getSpotifyUserTopTracks(spotifyId: string, timeRange: TimeRange): Promise<SpotifyUserTopTracksResponse> {
    return fetch(`/api/users/${spotifyId}/tracks?time_range=${timeRange}`, {
      method: "GET"
    }).then(responseToJson)
  },
  getSpotifyUserTopArtists(spotifyId: string, timeRange: TimeRange): Promise<SpotifyUserTopArtistsResponse> {
    return fetch(`/api/users/${spotifyId}/artists?time_range=${timeRange}`, {
      method: "GET"
    }).then(responseToJson)
  },
  getUserSessionData(): UserDataResponse | undefined {
    const userDataString = sessionStorage.getItem("userData")
    if (userDataString) return JSON.parse(userDataString)
    return undefined
  },
  setUserSessionData(userData: UserDataResponse): void {
    sessionStorage.setItem("userData", JSON.stringify(userData))
  }
}

export default Integration
