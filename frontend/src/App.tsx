import React, { FunctionComponent } from "react"
import AppState from "./state/AppState"
import routeConfig from "./routeConfig"
import { navigate, useRoutes } from "hookrouter"
import AppReducer from "./state/AppReducer"
import { Integration } from "./integrations/Integration"
import useReducerWithEffects from "./hooks/userReducerWithEffects"

interface AppProps {
  integration: Integration
}

const App: FunctionComponent<AppProps> = ({ integration }) => {
  const { page: CurrentRoute, params } = useRoutes(routeConfig)
  const [state, dispatch] = useReducerWithEffects(AppReducer, AppState, {
    integration
  })

  if (!CurrentRoute) {
    navigate("/", true)

    return null
  }

  return <CurrentRoute integration={integration} state={state} dispatch={dispatch} queryParams={params} />
}

export default App
