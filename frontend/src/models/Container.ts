import { Integration } from "../integrations/Integration";
import { CollabAction, CollabActionType } from "../state/CollabActions";
import { CollabState } from "../state/CollabInitialState";
import { Dispatch, FunctionComponent } from "react";

interface ContainerProps<T> {
  integration: Integration;
  state: T;
  dispatch: Dispatch<CollabAction<CollabActionType, any>>;
  children?: never;
}

export interface Container<T = CollabState>
  extends FunctionComponent<ContainerProps<T>> {}
