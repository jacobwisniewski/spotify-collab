import { ActionWithEffects } from "../hooks/userReducerWithEffects"
import { AppState, TopType } from "./AppState"
import { AppEffectContext } from "../effects/AppEffect"
import getSpotifyProfileEffect from "../effects/getSpotifyProfileEffect"
import profileSearchClickEffect from "../effects/profileSearchClickEffect"
import getSpotifyUserTopTypeEffect from "../effects/getSpotifyUserTopTypeEffect"
import { SpotifyUserTopTracksResponse } from "../models/SpotifyUserTopTracksResponse"
import { TimeRange } from "../integrations/Integration"
import { SpotifyUserTopArtistsResponse } from "../models/SpotifyUserTopArtistsResponse"
import loginUserEffect from "../effects/loginUserEffect"
import { UserDataResponse } from "../models/UserDataResponse"
import getUserDataEffect from "../effects/getUserDataEffect"
import refreshAccessTokenEffect from "../effects/refreshAccessTokenEffect"
import { UserProfileResponse } from "../models/UserProfileResponse"

export interface Action<T, P> extends ActionWithEffects<AppState, AppAction, AppEffectContext> {
  type: T
  payload: P
}

export type SpotifyProfileLoadingAction = Action<"SPOTIFY_PROFILE_LOADING", string>
export const spotifyProfileLoading = (spotifyId: string): SpotifyProfileLoadingAction => ({
  type: "SPOTIFY_PROFILE_LOADING",
  payload: spotifyId,
  effects: getSpotifyProfileEffect
})

export type SpotifyProfileSuccessAction = Action<"SPOTIFY_PROFILE_SUCCESS", UserProfileResponse>
export const spotifyProfileSuccess = (userProfile: UserProfileResponse): SpotifyProfileSuccessAction => ({
  type: "SPOTIFY_PROFILE_SUCCESS",
  payload: userProfile
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
  effects: getSpotifyUserTopTypeEffect
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
  effects: getSpotifyUserTopTypeEffect
})

export type TopTypeChangeAction = Action<"TOP_TYPE_CHANGE", TopType>
export const topTypeChange = (topType: TopType): TopTypeChangeAction => ({
  type: "TOP_TYPE_CHANGE",
  payload: topType
})

export type LoginUserAction = Action<"LOGIN_USER", undefined>
export const loginUser = (): LoginUserAction => ({
  type: "LOGIN_USER",
  payload: undefined,
  effects: loginUserEffect
})

export type LogoutUserAction = Action<"LOGOUT_USER", undefined>
export const logoutUser = (): LogoutUserAction => ({
  type: "LOGOUT_USER",
  payload: undefined
})

export type UserDataLoadingAction = Action<"USER_DATA_LOADING_ACTION", undefined>
export const userDataLoading = (): UserDataLoadingAction => ({
  type: "USER_DATA_LOADING_ACTION",
  payload: undefined,
  effects: getUserDataEffect
})

export type UserDataSuccessAction = Action<"USER_DATA_SUCCESS_ACTION", UserDataResponse>
export const userDataSuccess = (userDataResponse: UserDataResponse): UserDataSuccessAction => ({
  type: "USER_DATA_SUCCESS_ACTION",
  payload: userDataResponse
})

export type UserDataErrorAction = Action<"USER_DATA_ERROR_ACTION", Error | undefined>
export const userDataError = (error?: Error): UserDataErrorAction => ({
  type: "USER_DATA_ERROR_ACTION",
  payload: error
})

export type RefreshAccessTokenLoadingAction = Action<"REFRESH_ACCESS_TOKEN_LOADING_ACTION", undefined>
export const refreshAccessTokenLoading = (): RefreshAccessTokenLoadingAction => ({
  type: "REFRESH_ACCESS_TOKEN_LOADING_ACTION",
  payload: undefined,
  effects: refreshAccessTokenEffect
})

export type RefreshAccessTokenSuccessAction = Action<"REFRESH_ACCESS_TOKEN_SUCCESS_ACTION", undefined>
export const refreshAccessTokenSuccess = (): RefreshAccessTokenSuccessAction => ({
  type: "REFRESH_ACCESS_TOKEN_SUCCESS_ACTION",
  payload: undefined
})

export type RefreshAccessTokenErrorAction = Action<"REFRESH_ACCESS_TOKEN_ERROR_ACTION", Error>
export const refreshAccessTokenError = (error: Error): RefreshAccessTokenErrorAction => ({
  type: "REFRESH_ACCESS_TOKEN_ERROR_ACTION",
  payload: error
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
  | LoginUserAction
  | LogoutUserAction
  | UserDataLoadingAction
  | UserDataSuccessAction
  | UserDataErrorAction
  | RefreshAccessTokenLoadingAction
  | RefreshAccessTokenSuccessAction
  | RefreshAccessTokenErrorAction
