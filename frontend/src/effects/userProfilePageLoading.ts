import { AppEffect } from "./AppEffect"
import { spotifyProfileError, SpotifyProfileLoadingAction, spotifyProfileSuccess } from "../state/AppAction"

const userProfilePageLoading: AppEffect = async (state, action, context) => {
  try {
    const spotifyProfileResponse = await context.integration.getSpotifyProfileData((action as SpotifyProfileLoadingAction).payload)
    return spotifyProfileSuccess(spotifyProfileResponse)
  } catch (error) {
    return spotifyProfileError(new Error(error))
  }
}

export default userProfilePageLoading
