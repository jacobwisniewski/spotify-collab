import { ActionWithEffects } from "../hooks/userReducerWithEffects"
import { AppState } from "./AppState"
import { AppEffectContext } from "../effects/AppEffect"
import userProfilePageLoading from "../effects/userProfilePageLoading"
import { SpotifyProfileResponse } from "../models/SpotifyProfileResponse"
import profileSearchClickEffect from "../effects/profileSearchClickEffect"

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

export type ProfileSearchChangeAction = Action<"PROFILE_SEARCH_CHANGE", string>
export const profileSearchChange = (spotifyId: string): ProfileSearchChangeAction => ({
  type: "PROFILE_SEARCH_CHANGE",
  payload: spotifyId
})

export type ProfileSearchClickAction = Action<"PROFILE_SEARCH_CLICK", undefined>
export const profileSearchClick = (): ProfileSearchClickAction => ({
  type: "PROFILE_SEARCH_CLICK",
  payload: undefined,
  effects: profileSearchClickEffect
})

export type NavigateToLandingPageAction = Action<"NAVIGATE_TO_LANDING_PAGE", undefined>
export const navigateToLandingPage = (): NavigateToLandingPageAction => ({
  type: "NAVIGATE_TO_LANDING_PAGE",
  payload: undefined
})

export type AppAction =
  | SpotifyProfileLoadingAction
  | SpotifyProfileSuccessAction
  | SpotifyProfileErrorAction
  | ProfileSearchChangeAction
  | ProfileSearchClickAction
  | NavigateToLandingPageAction
