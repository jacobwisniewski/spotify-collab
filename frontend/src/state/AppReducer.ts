import { AppAction } from "./AppAction"
import { Reducer } from "react"
import InitialAppState, { AppState, IntegrationStatus, LoginStatus, TopType } from "./AppState"
import { applyValidationResults } from "../utils/applyValidationResults"
import { validateProfileSearch } from "./AppValidators"

const AppReducer: Reducer<AppState, AppAction> = (prevState, action): AppState => {
  switch (action.type) {
    case "SPOTIFY_PROFILE_LOADING":
      return {
        ...prevState,
        spotifyProfileStatus: IntegrationStatus.LOADING
      }
    case "SPOTIFY_PROFILE_SUCCESS":
      return {
        ...prevState,
        spotifyProfileStatus: IntegrationStatus.SUCCESS,
        userProfile: action.payload
      }
    case "SPOTIFY_PROFILE_ERROR":
      return {
        ...prevState,
        spotifyProfileStatus: IntegrationStatus.ERROR
      }

    case "SPOTIFY_USER_TOP_TYPE_LOADING":
      if (prevState.topType === TopType.TRACKS) {
        return {
          ...prevState,
          spotifyTopTracksStatus: IntegrationStatus.LOADING,
          spotifyTopArtists: []
        }
      } else {
        return {
          ...prevState,
          spotifyTopArtistsStatus: IntegrationStatus.LOADING,
          spotifyTopTracks: []
        }
      }

    case "SPOTIFY_USER_TOP_TRACKS_SUCCESS":
      return {
        ...prevState,
        spotifyTopTracksStatus: IntegrationStatus.SUCCESS,
        spotifyTopTracks: action.payload
      }

    case "SPOTIFY_USER_TOP_TRACKS_ERROR":
      return {
        ...prevState,
        spotifyTopTracksStatus: IntegrationStatus.ERROR,
        spotifyTopTracksError: action.payload
      }

    case "PROFILE_SEARCH_CHANGE":
      return {
        ...prevState,
        profileSearchValue: action.payload,
        profileSearchErrors: applyValidationResults([validateProfileSearch(action.payload)], prevState.profileSearchErrors)
      }

    case "PROFILE_SEARCH_CLICK":
      return {
        ...prevState,
        profileSearchErrors: applyValidationResults([validateProfileSearch(prevState.profileSearchValue)], prevState.profileSearchErrors),
        profileSearchValue: ""
      }

    case "TIME_RANGE_CHANGE":
      return {
        ...prevState,
        timeRangeSelected: action.payload
      }

    case "NAVIGATE_TO_LANDING_PAGE":
      return {
        ...prevState,
        spotifyProfileStatus: IntegrationStatus.INITIAL,
        userProfile: InitialAppState.userProfile,
        profileSearchValue: ""
      }

    case "SPOTIFY_USER_TOP_ARTISTS_ERROR":
      return {
        ...prevState,
        spotifyTopArtistsError: action.payload,
        spotifyTopArtistsStatus: IntegrationStatus.ERROR
      }

    case "SPOTIFY_USER_TOP_ARTISTS_SUCCESS":
      return {
        ...prevState,
        spotifyTopArtists: action.payload,
        spotifyTopArtistsStatus: IntegrationStatus.SUCCESS
      }

    case "TOP_TYPE_CHANGE":
      return {
        ...prevState,
        topType: action.payload
      }

    case "LOGIN_USER":
      return {
        ...prevState,
        loginStatus: LoginStatus.LOADING
      }

    case "LOGOUT_USER":
      return {
        ...prevState,
        loginStatus: LoginStatus.NO_USER
      }

    case "REFRESH_ACCESS_TOKEN_LOADING_ACTION":
      return {
        ...prevState,
        refreshAccessTokenStatus: IntegrationStatus.LOADING
      }

    case "REFRESH_ACCESS_TOKEN_SUCCESS_ACTION":
      return {
        ...prevState,
        refreshAccessTokenStatus: IntegrationStatus.SUCCESS
      }

    case "REFRESH_ACCESS_TOKEN_ERROR_ACTION":
      return {
        ...prevState,
        refreshAccessTokenStatus: IntegrationStatus.ERROR,
        refreshAccessTokenError: action.payload
      }

    case "USER_DATA_LOADING_ACTION":
      return {
        ...prevState,
        userDataStatus: IntegrationStatus.LOADING
      }

    case "USER_DATA_SUCCESS_ACTION":
      return {
        ...prevState,
        userData: action.payload,
        userDataStatus: IntegrationStatus.SUCCESS,
        loginStatus: LoginStatus.LOGGED_IN
      }

    case "USER_DATA_ERROR_ACTION":
      return {
        ...prevState,
        userDataError: action.payload,
        userDataStatus: IntegrationStatus.ERROR,
        loginStatus: LoginStatus.NO_USER
      }
  }
  return prevState
}

export default AppReducer
