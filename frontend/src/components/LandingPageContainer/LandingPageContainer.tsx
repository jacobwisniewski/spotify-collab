import { Container } from "../../models/Container";
import React from "react";

interface LandingPageContainerProps {}

const LandingPageContainer: Container<LandingPageContainerProps> = () => {
  return (
    <div>
      <h1>Collab</h1>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque
        pharetra pharetra diam, eu cursus augue auctor sed. Aenean leo turpis,
        fringilla eu dapibus at, auctor ac lorem. Donec in ipsum vitae sapien
        vestibulum gravida.
      </p>
        <button>Login with Spotify</button>
    </div>
  );
};

export default LandingPageContainer;
