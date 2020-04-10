import LandingPageContainer from "../LandingPageContainer/LandingPageContainer";
import React, { Dispatch } from "react";
import { CollabState } from "../../state/CollabInitialState";
import { Integration } from "../../integrations/Integration";
import { CollabAction, CollabActionType } from "../../state/CollabActions";

interface RouteConfig {
  [k: string]: () => any;
}

const routeConfig = (
  integration: Integration,
  state: CollabState,
  dispatch: Dispatch<CollabAction<CollabActionType, any>>
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
