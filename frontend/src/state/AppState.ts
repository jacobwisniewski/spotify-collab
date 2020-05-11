import { SpotifyProfileResponse } from "../models/SpotifyProfileResponse"
import { ImmutableMap } from "../models/ImmutableMap"

export enum SpotifyProfileStatus {
  INITIAL,
  LOADING,
  SUCCESS,
  ERROR
}

export type ProfileSearchErrorType = "PROFILE_SEARCH_ERROR"

export interface AppState {
  spotifyProfile: SpotifyProfileResponse
  spotifyProfileStatus: SpotifyProfileStatus
  spotifyProfileError: Error | undefined
  profileSearchValue: string
  profileSearchErrors: ImmutableMap<ProfileSearchErrorType, string>
}

const AppState: AppState = {
  spotifyProfile: {
    spotify_id: "",
    display_name: "",
    profile_picture_url: "",
    spotify_profile_url: "",
    followers: -1
  },
  spotifyProfileStatus: SpotifyProfileStatus.INITIAL,
  spotifyProfileError: undefined,
  profileSearchValue: "",
  profileSearchErrors: new ImmutableMap()
}

export default AppState
