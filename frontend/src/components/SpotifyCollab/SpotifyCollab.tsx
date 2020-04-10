import React, { FunctionComponent, useReducer } from "react";
import CollabInitialState from "../../state/CollabInitialState";
import routeConfig from "./routeConfig";
import { useRoutes } from "hookrouter";
import CollabReducer from "../../state/CollabReducer";
import { Integration } from "../../integrations/Integration";

interface SpotifyCollabProps {
  integration: Integration;
}

const SpotifyCollab: FunctionComponent<SpotifyCollabProps> = ({
  integration,
}) => {
  const [state, dispatch] = useReducer(CollabReducer, CollabInitialState);
  const CurrentRoute = useRoutes(routeConfig(integration, state, dispatch));

  return <main>{CurrentRoute ? CurrentRoute : <h1>Page not found.</h1>}</main>;
};

export default SpotifyCollab;
