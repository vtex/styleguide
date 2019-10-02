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
  childsKey = 'children',
}: hookInput): checkboxesHookReturn => {
  const [checkedItems, dispatch] = useReducer(reducer, [])

  const itemTree = useMemo(() => {
    return getItemTree(items, childsKey)
  }, [items, columns])

  const toggle = useCallback(
    (item: ItemTree): void => {
      dispatch({ type: ActionType.Toggle, itemToToggle: { item, childsKey } })
    },
    [checkedItems]
  )

  useEffect(() => {
    onToggle({ checkedItems })
  }, [toggle])

  useEffect(() => {
    const shake = (tree: ItemTree) => {
      const childs = tree[childsKey] as Array<ItemTree>

      if (!childs) return

      const areChildsChecked = childs.every(child =>
        checkedItems.some(equalsId(child))
      )
      const isRootChecked = checkedItems.some(equalsId(tree))

      if (areChildsChecked && !isRootChecked)
        dispatch({ type: ActionType.Check, item: tree })

      if (!areChildsChecked && isRootChecked)
        dispatch({ type: ActionType.Uncheck, item: tree })

      childs.forEach(shake)
    }
    shake(itemTree)
  }, [checkedItems])

  const isChecked = useCallback(
    (item: ItemTree) => {
      const childs = item[childsKey] as Array<ItemTree>
      return childs
        ? childs.every(child => checkedItems.some(equalsId(child)))
        : checkedItems.some(equalsId(item))
    },
    [checkedItems]
  )

  const isPartiallyChecked = useCallback(
    (item: ItemTree) => {
      return (
        (item[childsKey] as Array<ItemTree>) &&
        getFlat(item, [], childsKey)
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
      const { itemToToggle } = action
      if (!itemToToggle) return state
      return getToggledState(state, itemToToggle.item, itemToToggle.childsKey)
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
  itemToToggle?: {
    item: ItemTree
    childsKey: string
  }
}

type hookInput = {
  items: Array<UnparsedItem>
  columns: Array<Column>
  onToggle?: ({ checkedItems }) => void
  childsKey?: string
}

export type ChildKey = { [key: string]: Array<ItemTree> }

export type ItemTree = Partial<{
  id: string
  [key: string]: unknown
}>

export type UnparsedItem = Partial<{ [key: string]: unknown }>

export type checkboxesHookReturn = {
  checkedItems?: Array<ItemTree>
  itemTree?: ItemTree
  toggle?: (item: ItemTree) => void
  isChecked?: (item: ItemTree) => boolean
  isPartiallyChecked?: (item: ItemTree) => boolean
}

export default useTableTreeCheckboxes
