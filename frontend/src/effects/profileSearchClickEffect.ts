import { AppEffect } from "./AppEffect"
import { navigate } from "hookrouter"
import { spotifyProfileLoading } from "../state/AppAction"

const profileSearchClickEffect: AppEffect = async (state, action, context) => {
  if (state.profileSearchErrors.size() === 0) {
    navigate(`/@${state.profileSearchValue}`)
    return spotifyProfileLoading(state.profileSearchValue)
  }
}

export default profileSearchClickEffect
