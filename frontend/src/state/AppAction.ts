export type CollabActionType = "";

export interface CollabAction<T extends CollabActionType, P> {
  type: T;
  payload: P;
}
