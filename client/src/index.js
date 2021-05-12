import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { Auth0Provider } from "@auth0/auth0-react";
ReactDOM.render(
  <Auth0Provider
    domain="dev-v7ksxr01.us.auth0.com"
    clientId="tTfzDrAI3x4IPCfqJkfr20z9d1aJu49Q"
    redirectUri={window.location.origin}
  >
    <App />
  </Auth0Provider>,
  document.getElementById("root")
);
