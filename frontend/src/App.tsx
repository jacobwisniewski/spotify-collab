import React, { FunctionComponent, useReducer } from "react";
import AppState from "../../state/AppState";
import routeConfig from "./routeConfig";
import { useRoutes } from "hookrouter";
import AppReducer from "../../state/AppReducer";
import { Integration } from "../../integrations/Integration";

interface SpotifyCollabProps {
    integration: Integration;
}

const SpotifyCollab: FunctionComponent<SpotifyCollabProps> = ({
                                                                  integration,
                                                              }) => {
    const [state, dispatch] = useReducer(AppReducer, AppState);
    const CurrentRoute = useRoutes(routeConfig);

    return <main>{CurrentRoute ? CurrentRoute : <h1>Page not found.</h1>}</main>;
};

    export default SpotifyCollab;
