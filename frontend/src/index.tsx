import "./index.css";
import React from "react";
import ReactDOM from "react-dom";
import SpotifyCollab from "./components/SpotifyCollab/SpotifyCollab";
import { Integration } from "./integrations/Integration";

const init = async () => {
  const integrationModule = await import(
    `./integrations/${process.env.REACT_APP_INTEGRATION_TYPE}Integration.ts`
  );

  const integration: Integration = integrationModule.default;

  ReactDOM.render(
    <SpotifyCollab integration={integration} />,
    document.getElementById("root")
  );
};

init();
