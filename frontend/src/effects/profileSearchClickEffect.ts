import { AppEffect } from "./AppEffect"
import { navigate } from "hookrouter"
import { ProfileSearchClickAction, spotifyProfileLoading } from "../state/AppAction"

const profileSearchClickEffect: AppEffect = async (state, action, context) => {
  if (state.profileSearchErrors.size() === 0) {
    navigate(`/@${state.profileSearchValue}`)
    return spotifyProfileLoading((action as ProfileSearchClickAction).payload)
  }
}

export default profileSearchClickEffect
