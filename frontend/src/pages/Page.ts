import { Integration } from "../integrations/Integration"
import { Dispatch, FunctionComponent } from "react"
import { AppState } from "../state/AppState"
import { AppAction } from "../state/AppAction"

export interface PageProps<T, A> {
  integration: Integration
  state: T
  dispatch: Dispatch<A>
  queryParams?: any
  children?: never
}

export interface Page<T = AppState, A = AppAction> extends FunctionComponent<PageProps<T, A>> {}
