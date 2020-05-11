import { AppEffect } from "./AppEffect"
import { navigate } from "hookrouter"

const profileSearchClickEffect: AppEffect = async (state, action, context) => {
  if (state.profileSearchErrors.size() === 0) {
    navigate(`/@${state.profileSearchValue}`)
  }
}

export default profileSearchClickEffect
