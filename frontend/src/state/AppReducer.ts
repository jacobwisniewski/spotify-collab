import { AppAction } from "./AppAction"
import { Reducer } from "react"
import { AppState, IntegrationStatus, TopType } from "./AppState"
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
        spotifyProfile: action.payload
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
          spotifyTopTracksStatus: IntegrationStatus.LOADING
        }
      } else {
        return {
          ...prevState,
          spotifyTopArtistsStatus: IntegrationStatus.LOADING
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
        spotifyProfile: {
          spotify_id: "",
          display_name: "",
          profile_picture_url: "",
          spotify_profile_url: "",
          followers: -1,
          extended_data: false
        },
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
  }
  return prevState
}

export default AppReducer
