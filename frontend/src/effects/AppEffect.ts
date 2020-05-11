import { Integration } from "../integrations/Integration"
import { SideEffect } from "../hooks/userReducerWithEffects"
import { AppAction } from "../state/AppAction"
import { AppState } from "../state/AppState"

export interface AppEffectContext {
  integration: Integration
}

export type AppEffect = SideEffect<AppState, AppAction, AppEffectContext>
