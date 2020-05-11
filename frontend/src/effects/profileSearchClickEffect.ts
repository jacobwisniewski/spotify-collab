import { AppEffect } from "./AppEffect"
import { navigate } from "hookrouter"
import { ProfileSearchClickAction, spotifyProfileLoading } from "../state/AppAction"

const profileSearchClickEffect: AppEffect = async (state, action, context) => {
  if (state.profileSearchErrors.size() === 0) {
    const profileSearchValue = (action as ProfileSearchClickAction).payload
    navigate(`/@${profileSearchValue}`)
    return spotifyProfileLoading(profileSearchValue)
  }
}

export default profileSearchClickEffect
