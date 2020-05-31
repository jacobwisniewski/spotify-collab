import React, { FunctionComponent, useEffect } from "react"
import AppState, { LoginStatus } from "./state/AppState"
import routeConfig from "./routeConfig"
import { navigate, useRoutes } from "hookrouter"
import AppReducer from "./state/AppReducer"
import { Integration } from "./integrations/Integration"
import useReducerWithEffects from "./hooks/userReducerWithEffects"
import { loginUser } from "./state/AppAction"

interface AppProps {
  integration: Integration
}

const App: FunctionComponent<AppProps> = ({ integration }) => {
  const route = useRoutes(routeConfig)
  const [state, dispatch] = useReducerWithEffects(AppReducer, AppState, {
    integration
  })

  const { loginStatus } = state
  const isInitial = loginStatus === LoginStatus.INITIAL

  useEffect(() => {
    if (isInitial) {
      dispatch(loginUser())
    }
  }, [dispatch, isInitial])

  if (!route) {
    navigate("/", true)
    return null
  }

  const { page: CurrentRoute, params } = route

  return <CurrentRoute integration={integration} state={state} dispatch={dispatch} queryParams={params} />
}

export default App
