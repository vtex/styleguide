import { useMemo, useCallback, useEffect, useReducer } from 'react'
import {
  getFlat,
  getToggledState,
  getItemTree,
  equalsId,
} from './checkboxesUtils'

const useTableTreeCheckboxes = ({
  items,
  columns,
  onToggle,
}: hookInput): checkboxesHookReturn => {
  const [checkedItems, dispatch] = useReducer(reducer, [])

  const itemTree = useMemo(() => {
    return getItemTree(items)
  }, [items, columns])

  const toggle = useCallback(
    (item: ItemTree): void => {
      dispatch({ type: ActionType.Toggle, item })
    },
    [checkedItems]
  )

  useEffect(() => {
    onToggle({ checkedItems })
  }, [toggle])

  useEffect(() => {
    const shake = (tree: ItemTree) => {
      const { children } = tree

      if (!children) return

      const areChildsChecked = children.every(child =>
        checkedItems.some(equalsId(child))
      )
      const isRootChecked = checkedItems.some(equalsId(tree))

      if (areChildsChecked && !isRootChecked)
        dispatch({ type: ActionType.Check, item: tree })

      if (!areChildsChecked && isRootChecked)
        dispatch({ type: ActionType.Uncheck, item: tree })

      children.forEach(shake)
    }
    shake(itemTree)
  }, [checkedItems])

  const isChecked = useCallback(
    (item: ItemTree) => {
      return item.children
        ? item.children.every(child => checkedItems.some(equalsId(child)))
        : checkedItems.some(equalsId(item))
    },
    [checkedItems]
  )

  const isPartiallyChecked = useCallback(
    (item: ItemTree) => {
      return (
        item.children &&
        getFlat(item)
          .slice(1)
          .some(child => checkedItems.some(equalsId(child)))
      )
    },
    [checkedItems]
  )

  return { checkedItems, isChecked, isPartiallyChecked, itemTree, toggle }
}

function reducer(state: Array<ItemTree>, action: Action) {
  switch (action.type) {
    case ActionType.Check: {
      return [...state, action.item]
    }
    case ActionType.Uncheck: {
      return state.filter(row => row.id !== action.item.id)
    }
    case ActionType.Toggle: {
      const { item } = action
      if (!item) return state
      return getToggledState(state, item)
    }
    default: {
      return state
    }
  }
}

enum ActionType {
  Check,
  Uncheck,
  Toggle,
}

type Action = {
  type: ActionType
  item?: ItemTree
  checked?: Array<ItemTree>
}

type hookInput = {
  items: Array<UnparsedItem>
  columns: Array<Column>
  onToggle?: ({ checkedItems }) => void
}

export type ItemTree = Partial<{
  children: Array<ItemTree>
  id: string
  [key: string]: unknown
}>

export type UnparsedItem = Partial<{ children: any; [key: string]: unknown }>

export type checkboxesHookReturn = {
  checkedItems?: Array<ItemTree>
  itemTree?: ItemTree
  toggle?: (item: ItemTree) => void
  isChecked?: (item: ItemTree) => boolean
  isPartiallyChecked?: (item: ItemTree) => boolean
}

export default useTableTreeCheckboxes
