import { AppEffect } from "./AppEffect"
import { spotifyProfileError, SpotifyProfileLoadingAction, spotifyProfileSuccess } from "../state/AppAction"

const getSpotifyProfileEffect: AppEffect = async (state, action, context) => {
  try {
    const spotifyProfileResponse = await context.integration.getUserProfile((action as SpotifyProfileLoadingAction).payload)
    return spotifyProfileSuccess(spotifyProfileResponse)
  } catch (error) {
    return spotifyProfileError(error)
  }
}

export default getSpotifyProfileEffect
