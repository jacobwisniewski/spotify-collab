import { CollabAction, CollabActionType } from "./CollabActions";
import { Reducer } from "react";
import { AppState } from "./CollabInitialState";

const CollabReducer: Reducer<
  AppState,
  CollabAction<CollabActionType, any>
> = (prevState, action): AppState => {
  return prevState;
};

export default CollabReducer;
