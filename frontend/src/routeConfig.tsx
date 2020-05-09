import LandingPageContainer from "../LandingPageContainer/LandingPageContainer";
import React, { Dispatch } from "react";
import { AppState } from "../../state/AppState";
import { Integration } from "../../integrations/Integration";
import { Action, ActionType } from "../../state/AppAction";

interface RouteConfig {
  [k: string]: () => any;
}

const routeConfig = (
  integration: Integration,
  state: AppState,
  dispatch: Dispatch<Action<ActionType, any>>
): RouteConfig => {
  return {
    "/": () => (
      <LandingPageContainer
        integration={integration}
        state={state}
        dispatch={dispatch}
      />
    ),
  };
};

export default routeConfig;
