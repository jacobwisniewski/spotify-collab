import { Page } from "./pages/Page"
import LandingPage from "./pages/LandingPage/LandingPage"
import ProfilePage from "./pages/ProfilePage/ProfilePage"
import { HookRouter } from "hookrouter"

interface RouteConfig {
  [k: string]: (params: HookRouter.QueryParams) => { page: Page; params?: HookRouter.QueryParams }
}

const routeConfig: RouteConfig = {
  "/": () => {
    return { page: LandingPage }
  },
  "/@:spotifyId": (params) => {
    return { page: ProfilePage, params }
  }
}

export default routeConfig
