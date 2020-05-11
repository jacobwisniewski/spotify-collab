import { Page } from "./pages/Page"
import LandingPage from "./pages/LandingPage/LandingPage"
import ProfilePage from "./pages/ProfilePage/ProfilePage"
import { HookRouter } from "hookrouter"

interface RouteConfig {
  [k: string]: (params: HookRouter.QueryParams) => { page: Page; params?: HookRouter.QueryParams }
}

const routeConfig: RouteConfig = {
  "/": () => ({ page: LandingPage }),
  "/@:spotifyId": (params) => (!!params.spotifyId ? { page: ProfilePage, params } : { page: LandingPage })
}

export default routeConfig
