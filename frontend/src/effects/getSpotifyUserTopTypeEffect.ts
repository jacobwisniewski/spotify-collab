import { AppEffect } from "./AppEffect"
import {
  spotifyUserTopArtistsError,
  spotifyUserTopArtistsSuccess,
  spotifyUserTopTracksError,
  spotifyUserTopTracksSuccess
} from "../state/AppAction"
import { TopType } from "../state/AppState"

const getSpotifyUserTopTypeEffect: AppEffect = async (state, action, context) => {
  if (state.topType === TopType.TRACKS) {
    try {
      const spotifyUserTopTracksResponse = await context.integration.getSpotifyUserTopTracks(
        state.userProfile.spotifyId,
        state.timeRangeSelected
      )
      return spotifyUserTopTracksSuccess(spotifyUserTopTracksResponse)
    } catch (error) {
      return spotifyUserTopTracksError(error)
    }
  } else {
    try {
      const spotifyUserTopArtistsResponse = await context.integration.getSpotifyUserTopArtists(
        state.userProfile.spotifyId,
        state.timeRangeSelected
      )
      return spotifyUserTopArtistsSuccess(spotifyUserTopArtistsResponse)
    } catch (error) {
      return spotifyUserTopArtistsError(error)
    }
  }
}

export default getSpotifyUserTopTypeEffect
