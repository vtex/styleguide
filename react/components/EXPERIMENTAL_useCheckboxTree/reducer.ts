import { getBulkChecked, getBulkUnchecked, getToggledState } from './util'
import { comparatorCurry, Tree } from './types'

export default function reducer<T>(state: Array<T>, action: Action<T>) {
  switch (action.type) {
    case ActionType.Check: {
      const { item } = action
      return [...state, item]
    }
    case ActionType.Uncheck: {
      const {
        itemToToggle: { item, comparator },
      } = action
      const rowFilter = (row: T) => !comparator(row)(item)
      return state.filter(rowFilter)
    }
    case ActionType.BulkCheck: {
      const { itemToToggle, isDisabled } = action
      if (!itemToToggle) return state
      const { item, nodesKey, comparator } = itemToToggle
      return getBulkChecked(state, item, nodesKey, comparator, isDisabled)
    }
    case ActionType.BulkUncheck: {
      const { itemToToggle } = action
      if (!itemToToggle) return state
      const { item, nodesKey, comparator } = itemToToggle
      return getBulkUnchecked(state, item, nodesKey, comparator)
    }
    case ActionType.Toggle: {
      const { itemToToggle, isDisabled } = action
      if (!itemToToggle) return state
      const { item, nodesKey, comparator } = itemToToggle
      return getToggledState(state, item, nodesKey, comparator, isDisabled)
    }
    case ActionType.SetChecked: {
      const { checked } = action
      return checked || state
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
  SetChecked,
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
  isDisabled?: (item: T | Tree<T>) => boolean
}
