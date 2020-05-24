import { AppEffect } from "./AppEffect"
import { spotifyUserTopTracksError, SpotifyUserTopTracksLoadingAction, spotifyUserTopTracksSuccess } from "../state/AppAction"

const spotifyUserTopTracksLoadingEffect: AppEffect = async (state, action, context) => {
  try {
    const spotifyUserTopTracksResponse = await context.integration.getSpotifyUserTopTracks(
      (action as SpotifyUserTopTracksLoadingAction).payload,
      state.timeRange
    )
    return spotifyUserTopTracksSuccess(spotifyUserTopTracksResponse)
  } catch (error) {
    return spotifyUserTopTracksError(new Error(error))
  }
}

export default spotifyUserTopTracksLoadingEffect
