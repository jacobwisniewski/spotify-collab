import { AppEffect } from "./AppEffect"
import {
  spotifyUserTopArtistsError,
  spotifyUserTopArtistsSuccess,
  spotifyUserTopTracksError,
  spotifyUserTopTracksSuccess
} from "../state/AppAction"
import { TopType } from "../state/AppState"

const spotifyUserTopTypeLoadingEffect: AppEffect = async (state, action, context) => {
  console.log(state.topType)
  if (state.topType === TopType.TRACKS) {
    try {
      const spotifyUserTopTracksResponse = await context.integration.getSpotifyUserTopTracks(
        state.spotifyProfile.spotify_id,
        state.timeRangeSelected
      )
      console.log(spotifyUserTopTracksResponse)
      return spotifyUserTopTracksSuccess(spotifyUserTopTracksResponse)
    } catch (error) {
      return spotifyUserTopTracksError(new Error(error))
    }
  } else {
    try {
      const spotifyUserTopArtistsResponse = await context.integration.getSpotifyUserTopArtists(
        state.spotifyProfile.spotify_id,
        state.timeRangeSelected
      )
      return spotifyUserTopArtistsSuccess(spotifyUserTopArtistsResponse)
    } catch (error) {
      return spotifyUserTopArtistsError(new Error(error))
    }
  }
}

export default spotifyUserTopTypeLoadingEffect
