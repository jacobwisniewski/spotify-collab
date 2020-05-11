import "./index.css"
import React from "react"
import ReactDOM from "react-dom"
import { Integration } from "./integrations/Integration"
import App from "./App"

const init = async () => {
  const integrationModule = await import(`./integrations/${process.env.REACT_APP_INTEGRATION_TYPE}Integration.ts`)

  const integration: Integration = integrationModule.default

  ReactDOM.render(<App integration={integration} />, document.getElementById("root"))
}

init()
