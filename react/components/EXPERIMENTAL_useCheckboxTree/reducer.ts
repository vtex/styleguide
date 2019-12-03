import { getBulkChecked, getBulkUnchecked, getToggledState } from './util'
import { comparatorCurry } from './types'

export default function reducer<T>(state: Array<T>, action: Action<T>) {
  switch (action.type) {
    case ActionType.Check: {
      return [...state, action.item]
    }
    case ActionType.Uncheck: {
      const {
        itemToToggle: { item, comparator },
      } = action
      return state.filter(row => !comparator(row)(item))
    }
    case ActionType.BulkCheck: {
      const { itemToToggle } = action
      if (!itemToToggle) return state

      return getBulkChecked(
        state,
        itemToToggle.item,
        itemToToggle.nodesKey,
        itemToToggle.comparator
      )
    }
    case ActionType.BulkUncheck: {
      const { itemToToggle } = action
      if (!itemToToggle) return state

      return getBulkUnchecked(
        state,
        itemToToggle.item,
        itemToToggle.nodesKey,
        itemToToggle.comparator
      )
    }
    case ActionType.Toggle: {
      const { itemToToggle } = action
      if (!itemToToggle) return state
      return getToggledState(
        state,
        itemToToggle.item,
        itemToToggle.nodesKey,
        itemToToggle.comparator
      )
    }
    default: {
      return state
    }
  }
}

export enum ActionType {
  Check,
  Uncheck,
  Toggle,
  BulkCheck,
  BulkUncheck,
}

export type Action<T> = {
  type: ActionType
  item?: T
  checked?: Array<T>
  itemToToggle?: {
    item: T
    nodesKey?: string
    comparator?: comparatorCurry<T>
  }
}
