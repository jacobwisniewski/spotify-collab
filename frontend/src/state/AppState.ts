import { UserProfileResponse } from "../models/UserProfileResponse"
import { ImmutableMap } from "../models/ImmutableMap"
import { TimeRange } from "../integrations/Integration"
import { SpotifyTrack } from "../models/SpotifyUserTopTracksResponse"
import { SpotifyArtist } from "../../../app/db/queries"
import { UserDataResponse } from "../models/UserDataResponse"

export enum IntegrationStatus {
  INITIAL,
  LOADING,
  SUCCESS,
  ERROR
}

export type ProfileSearchErrorType = "PROFILE_SEARCH_ERROR"

export enum TopType {
  TRACKS = "TRACKS",
  ARTISTS = "ARTISTS"
}

export enum LoginStatus {
  INITIAL,
  LOADING,
  LOGGED_IN,
  NO_USER
}

export interface AppState {
  userProfile: UserProfileResponse
  spotifyProfileStatus: IntegrationStatus
  spotifyProfileError: Error | undefined

  profileSearchValue: string
  profileSearchErrors: ImmutableMap<ProfileSearchErrorType, string>

  spotifyTopTracks: SpotifyTrack[]
  spotifyTopTracksStatus: IntegrationStatus
  spotifyTopTracksError: Error | undefined

  spotifyTopArtists: SpotifyArtist[]
  spotifyTopArtistsStatus: IntegrationStatus
  spotifyTopArtistsError: Error | undefined

  timeRangeSelected: TimeRange
  topType: TopType

  refreshAccessTokenStatus: IntegrationStatus
  refreshAccessTokenError: Error | undefined

  userData: UserDataResponse
  userDataStatus: IntegrationStatus
  userDataError: Error | undefined

  loginStatus: LoginStatus
}

const AppState: AppState = {
  userProfile: {
    spotifyId: "",
    displayName: "",
    spotifyPictureUrl: "",
    spotifyProfileUrl: "",
    followers: -1,
    extendedData: false
  },
  spotifyTopTracks: [],
  spotifyTopTracksStatus: IntegrationStatus.INITIAL,
  spotifyTopTracksError: undefined,
  spotifyProfileStatus: IntegrationStatus.INITIAL,
  spotifyProfileError: undefined,
  profileSearchValue: "",
  profileSearchErrors: new ImmutableMap(),
  timeRangeSelected: TimeRange.MEDIUM_TERM,
  topType: TopType.TRACKS,
  spotifyTopArtists: [],
  spotifyTopArtistsError: undefined,
  spotifyTopArtistsStatus: IntegrationStatus.INITIAL,
  refreshAccessTokenStatus: IntegrationStatus.INITIAL,
  refreshAccessTokenError: undefined,
  userData: {
    spotify_id: "",
    display_name: "",
    profile_picture_url: "",
    spotify_profile_url: "",
    followers: -1,
    email: "",
    country: "",
    spotify_account_type: ""
  },
  userDataStatus: IntegrationStatus.INITIAL,
  userDataError: undefined,
  loginStatus: LoginStatus.INITIAL
}

export default AppState
