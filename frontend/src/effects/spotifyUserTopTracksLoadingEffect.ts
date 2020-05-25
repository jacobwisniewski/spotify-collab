import { AppEffect } from "./AppEffect"
import { spotifyUserTopTracksError, spotifyUserTopTracksSuccess } from "../state/AppAction"

const spotifyUserTopTracksLoadingEffect: AppEffect = async (state, action, context) => {
  try {
    const spotifyUserTopTracksResponse = await context.integration.getSpotifyUserTopTracks(
      state.spotifyProfile.spotify_id,
      state.timeRangeSelected
    )
    return spotifyUserTopTracksSuccess(spotifyUserTopTracksResponse)
  } catch (error) {
    return spotifyUserTopTracksError(new Error(error))
  }
}

export default spotifyUserTopTracksLoadingEffect
