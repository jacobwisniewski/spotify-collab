import { useReducer, useRef, useEffect, useCallback, Reducer, Dispatch } from "react"

export type SideEffect<S, A, C> = (state: S, action: A, context: C) => Promise<A | void>

export interface ActionWithEffects<S, A, C> {
  effects?: SideEffect<S, A, C>
}

const useReducerWithEffects = <S, A extends ActionWithEffects<S, A, C>, C>(
  reducer: Reducer<S, A>,
  state0: S,
  effectContext: C
): [S, Dispatch<A>] => {
  const [state, reactDispatch] = useReducer(reducer, state0)
  const actions = useRef<A[]>([])

  const dispatch = useCallback<Dispatch<any>>(
    (action) => {
      setTimeout(() => {
        if (action.effects) actions.current.push(action)
        reactDispatch(action)
      })
    },
    [reactDispatch]
  )

  useEffect(() => {
    actions.current.forEach(async (action) => {
      if (action.effects) {
        const nextAction = await action.effects(state, action, effectContext)

        if (nextAction) dispatch(nextAction)
      }
    })

    actions.current = []
  }, [state, dispatch, effectContext])

  return [state, dispatch]
}

export default useReducerWithEffects
