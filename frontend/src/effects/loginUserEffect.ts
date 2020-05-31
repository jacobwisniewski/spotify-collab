import { AppEffect } from "./AppEffect"
import { userDataLoading, userDataSuccess } from "../state/AppAction"

const loginUserEffect: AppEffect = async (state, action, context) => {
  const userSessionData = context.integration.getUserSessionData()

  if (userSessionData) {
    return userDataSuccess(userSessionData)
  }

  return userDataLoading()
}

export default loginUserEffect
