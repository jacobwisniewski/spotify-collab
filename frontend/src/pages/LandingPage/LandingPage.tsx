import { Container } from "../../models/Container";
import React from "react";

interface LandingPageContainerProps {}

const LandingPageContainer: Container<LandingPageContainerProps> = () => {
  const spotifyAuthorize = () => {
    window.location.href = `${process.env.REACT_APP_API_URL}/api/auth/authorize`;
  };

  const spotifyTokenRefresh = () => {
    fetch("/api/auth/token", {
      method: "POST",
      credentials: "include",
    }).then((res) => console.log(res));
  };

  return (
    <div>
      <h1>Collab</h1>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque
        pharetra pharetra diam, eu cursus augue auctor sed. Aenean leo turpis,
        fringilla eu dapibus at, auctor ac lorem. Donec in ipsum vitae sapien
        vestibulum gravida.
      </p>
      <button onClick={spotifyAuthorize}>Login with Spotify</button>
      <button onClick={spotifyTokenRefresh}>Refresh access tokens</button>
    </div>
  );
};

export default LandingPageContainer;
