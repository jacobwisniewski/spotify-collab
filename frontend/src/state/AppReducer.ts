import { AppAction } from "./AppAction"
import { Reducer } from "react"
import { AppState, SpotifyProfileStatus } from "./AppState"
import { applyValidationResults } from "../utils/applyValidationResults"
import { validateProfileSearch } from "./AppValidators"

const AppReducer: Reducer<AppState, AppAction> = (prevState, action): AppState => {
  switch (action.type) {
    case "SPOTIFY_PROFILE_LOADING":
      return {
        ...prevState,
        spotifyProfileStatus: SpotifyProfileStatus.LOADING
      }
    case "SPOTIFY_PROFILE_SUCCESS":
      return {
        ...prevState,
        spotifyProfileStatus: SpotifyProfileStatus.SUCCESS,
        spotifyProfile: action.payload
      }
    case "SPOTIFY_PROFILE_ERROR":
      return {
        ...prevState,
        spotifyProfileStatus: SpotifyProfileStatus.ERROR
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
        profileSearchErrors: applyValidationResults([validateProfileSearch(prevState.profileSearchValue)], prevState.profileSearchErrors)
      }

    case "NAVIGATE_TO_LANDING_PAGE":
      return {
        ...prevState,
        spotifyProfileStatus: SpotifyProfileStatus.INITIAL,
        spotifyProfile: {
          spotify_id: "",
          display_name: "",
          profile_picture_url: "",
          spotify_profile_url: "",
          followers: -1
        },
        profileSearchValue: ""
      }
  }
  return prevState
}

export default AppReducer
