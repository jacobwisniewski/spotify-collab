import { CollabAction, CollabActionType } from "./CollabActions";
import { Reducer } from "react";
import { CollabState } from "./CollabInitialState";

const CollabReducer: Reducer<
  CollabState,
  CollabAction<CollabActionType, any>
> = (prevState, action): CollabState => {
  return prevState;
};

export default CollabReducer;
