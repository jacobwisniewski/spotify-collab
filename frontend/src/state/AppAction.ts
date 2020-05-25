import { ActionWithEffects } from "../hooks/userReducerWithEffects"
import { AppState, TopType } from "./AppState"
import { AppEffectContext } from "../effects/AppEffect"
import userProfilePageLoading from "../effects/userProfilePageLoading"
import { SpotifyProfileResponse } from "../models/SpotifyProfileResponse"
import profileSearchClickEffect from "../effects/profileSearchClickEffect"
import spotifyUserTopTypeLoadingEffect from "../effects/spotifyUserTopTypeLoadingEffect"
import { SpotifyUserTopTracksResponse } from "../models/SpotifyUserTopTracksResponse"
import { TimeRange } from "../integrations/Integration"
import { SpotifyUserTopArtistsResponse } from "../models/SpotifyUserTopArtistsResponse"

export interface Action<T, P> extends ActionWithEffects<AppState, AppAction, AppEffectContext> {
  type: T
  payload: P
}

export type SpotifyProfileLoadingAction = Action<"SPOTIFY_PROFILE_LOADING", string>
export const spotifyProfileLoading = (spotifyId: string): SpotifyProfileLoadingAction => ({
  type: "SPOTIFY_PROFILE_LOADING",
  payload: spotifyId,
  effects: userProfilePageLoading
})

export type SpotifyProfileSuccessAction = Action<"SPOTIFY_PROFILE_SUCCESS", SpotifyProfileResponse>
export const spotifyProfileSuccess = (spotifyProfile: SpotifyProfileResponse): SpotifyProfileSuccessAction => ({
  type: "SPOTIFY_PROFILE_SUCCESS",
  payload: spotifyProfile
})

export type SpotifyProfileErrorAction = Action<"SPOTIFY_PROFILE_ERROR", Error>
export const spotifyProfileError = (error: Error): SpotifyProfileErrorAction => ({
  type: "SPOTIFY_PROFILE_ERROR",
  payload: error
})

export type SpotifyUserTopTypeLoadingAction = Action<"SPOTIFY_USER_TOP_TYPE_LOADING", undefined>
export const spotifyUserTopTypeLoading = (): SpotifyUserTopTypeLoadingAction => ({
  type: "SPOTIFY_USER_TOP_TYPE_LOADING",
  payload: undefined,
  effects: spotifyUserTopTypeLoadingEffect
})

export type SpotifyUserTopTracksSuccessAction = Action<"SPOTIFY_USER_TOP_TRACKS_SUCCESS", SpotifyUserTopTracksResponse>
export const spotifyUserTopTracksSuccess = (spotifyUserTopTracks: SpotifyUserTopTracksResponse): SpotifyUserTopTracksSuccessAction => ({
  type: "SPOTIFY_USER_TOP_TRACKS_SUCCESS",
  payload: spotifyUserTopTracks
})

export type SpotifyUserTopTracksErrorAction = Action<"SPOTIFY_USER_TOP_TRACKS_ERROR", Error>
export const spotifyUserTopTracksError = (error: Error): SpotifyUserTopTracksErrorAction => ({
  type: "SPOTIFY_USER_TOP_TRACKS_ERROR",
  payload: error
})

export type SpotifyUserTopArtistsSuccessAction = Action<"SPOTIFY_USER_TOP_ARTISTS_SUCCESS", SpotifyUserTopArtistsResponse>
export const spotifyUserTopArtistsSuccess = (spotifyUserTopArtists: SpotifyUserTopArtistsResponse): SpotifyUserTopArtistsSuccessAction => ({
  type: "SPOTIFY_USER_TOP_ARTISTS_SUCCESS",
  payload: spotifyUserTopArtists
})

export type SpotifyUserTopArtistsErrorAction = Action<"SPOTIFY_USER_TOP_ARTISTS_ERROR", Error>
export const spotifyUserTopArtistsError = (error: Error): SpotifyUserTopArtistsErrorAction => ({
  type: "SPOTIFY_USER_TOP_ARTISTS_ERROR",
  payload: error
})

export type ProfileSearchChangeAction = Action<"PROFILE_SEARCH_CHANGE", string>
export const profileSearchChange = (spotifyId: string): ProfileSearchChangeAction => ({
  type: "PROFILE_SEARCH_CHANGE",
  payload: spotifyId
})

export type ProfileSearchClickAction = Action<"PROFILE_SEARCH_CLICK", string>
export const profileSearchClick = (spotifyId: string): ProfileSearchClickAction => ({
  type: "PROFILE_SEARCH_CLICK",
  payload: spotifyId,
  effects: profileSearchClickEffect
})

export type NavigateToLandingPageAction = Action<"NAVIGATE_TO_LANDING_PAGE", undefined>
export const navigateToLandingPage = (): NavigateToLandingPageAction => ({
  type: "NAVIGATE_TO_LANDING_PAGE",
  payload: undefined
})

export type TimeRangeChangeAction = Action<"TIME_RANGE_CHANGE", TimeRange>
export const timeRangeChange = (timeRange: TimeRange): TimeRangeChangeAction => ({
  type: "TIME_RANGE_CHANGE",
  payload: timeRange,
  effects: spotifyUserTopTypeLoadingEffect
})

export type TopTypeChangeAction = Action<"TOP_TYPE_CHANGE", TopType>
export const topTypeChange = (topType: TopType): TopTypeChangeAction => ({
  type: "TOP_TYPE_CHANGE",
  payload: topType
})

export type AppAction =
  | SpotifyProfileLoadingAction
  | SpotifyProfileSuccessAction
  | SpotifyProfileErrorAction
  | ProfileSearchChangeAction
  | ProfileSearchClickAction
  | NavigateToLandingPageAction
  | SpotifyUserTopTypeLoadingAction
  | SpotifyUserTopTracksSuccessAction
  | SpotifyUserTopTracksErrorAction
  | TimeRangeChangeAction
  | SpotifyUserTopArtistsErrorAction
  | SpotifyUserTopArtistsSuccessAction
  | TopTypeChangeAction
