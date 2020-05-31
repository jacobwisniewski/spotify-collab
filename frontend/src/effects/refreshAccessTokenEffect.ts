import { AppEffect } from "./AppEffect"
import { refreshAccessTokenError, refreshAccessTokenSuccess } from "../state/AppAction"

const refreshAccessTokenEffect: AppEffect = async (state, action, context) => {
  try {
    await context.integration.refreshAccessTokens()
    return refreshAccessTokenSuccess()
  } catch (error) {
    return refreshAccessTokenError(error)
  }
}

export default refreshAccessTokenEffect
