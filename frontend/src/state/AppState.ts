import { SpotifyProfileResponse } from "../models/SpotifyProfileResponse"
import { ImmutableMap } from "../models/ImmutableMap"
import { TimeRange } from "../integrations/Integration"
import { SpotifyTrack } from "../models/SpotifyUserTopTracksResponse"
import { SpotifyArtist } from "../../../app/db/queries"

export enum IntegrationStatus {
  INITIAL,
  LOADING,
  SUCCESS,
  ERROR
}

export type ProfileSearchErrorType = "PROFILE_SEARCH_ERROR"

export enum TopType {
  TRACKS,
  ARTISTS
}

export interface AppState {
  spotifyProfile: SpotifyProfileResponse
  spotifyProfileStatus: IntegrationStatus
  spotifyProfileError: Error | undefined
  profileSearchValue: string
  profileSearchErrors: ImmutableMap<ProfileSearchErrorType, string>
  spotifyTopTracks: SpotifyTrack[]
  spotifyTopTracksStatus: IntegrationStatus
  spotifyTopTracksError: Error | undefined
  timeRangeSelected: TimeRange
  topType: TopType
  spotifyTopArtists: SpotifyArtist[]
  spotifyTopArtistsStatus: IntegrationStatus
  spotifyTopArtistsError: Error | undefined
}

const AppState: AppState = {
  spotifyProfile: {
    spotify_id: "",
    display_name: "",
    profile_picture_url: "",
    spotify_profile_url: "",
    followers: -1,
    extended_data: false
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
  spotifyTopArtistsStatus: IntegrationStatus.INITIAL
}

export default AppState
