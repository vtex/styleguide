import { useReducer } from 'react'

export enum SortOrder {
  ASC = 'ASC',
  DSC = 'DSC',
}

type State = {
  order: SortOrder | null
  by: string | null
}

enum ActionType {
  SortASC = 'SORT_ASC',
  SortDSC = 'SORT_DSC',
  Clear = 'CLEAR',
}

type Action =
  | { type: ActionType.SortASC; id: string }
  | { type: ActionType.SortDSC; id: string }
  | { type: ActionType.Clear }

const initialState: State = {
  by: null,
  order: null,
}

export default function useTableSort() {
  const [sorted, dispatch] = useReducer(reducer, initialState)

  const sortASC = (id: string) => dispatch({ type: ActionType.SortASC, id })

  const sortDSC = (id: string) => dispatch({ type: ActionType.SortDSC, id })

  const clear = () => dispatch({ type: ActionType.Clear })

  const sort = (id: string) => {
    const { by, order } = sorted
    if (!by || by !== id) {
      sortASC(id)
    } else {
      const sortFn = order === SortOrder.ASC ? sortDSC : sortASC
      sortFn(id)
    }
  }

  return {
    sorted,
    clear,
    sort,
  }
}

function reducer(state: State, action: Action) {
  switch (action.type) {
    case ActionType.SortASC: {
      const { id } = action
      return {
        by: id,
        order: SortOrder.ASC,
      }
    }
    case ActionType.SortDSC: {
      const { id } = action
      return {
        by: id,
        order: SortOrder.DSC,
      }
    }
    case ActionType.Clear: {
      return initialState
    }
    default:
      return state
  }
}
