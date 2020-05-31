import { AppEffect } from "./AppEffect"
import { userDataError, userDataSuccess } from "../state/AppAction"

const getUserDataEffect: AppEffect = async (state, action, context) => {
  try {
    const userData = await context.integration.getUserData()
    context.integration.setUserSessionData(userData)

    return userDataSuccess(userData)
  } catch (error) {
    return userDataError(error)
  }
}

export default getUserDataEffect
