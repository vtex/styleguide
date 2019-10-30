import { useMemo, useCallback, useEffect, useReducer } from 'react'
import { getFlat, getToggledState, eqProp } from './checkboxesUtils'

export default function useTableTreeCheckboxes({
  items,
  onToggle,
  nodesKey = 'children',
  unicityKey = 'id',
  checked = [],
}: hookInput) {
  const [checkedItems, dispatch] = useReducer(reducer, checked)
  const equalsUnicityKey = eqProp(unicityKey)

  const itemTree = useMemo(() => {
    return { [unicityKey]: 'root', [nodesKey]: items }
  }, [items])

  const toggle = useCallback(
    (item: Item): void => {
      dispatch({
        type: ActionType.Toggle,
        itemToToggle: { item, nodesKey, unicityKey },
      })
    },
    [checkedItems]
  )

  useEffect(() => {
    onToggle({ checkedItems })
  }, [toggle])

  useEffect(() => {
    const shake = (tree: Item) => {
      const childNodes = tree[nodesKey] as Array<Item>

      if (!childNodes) return

      const areChildsChecked = childNodes.every(child =>
        checkedItems.some(equalsUnicityKey(child))
      )
      const isRootChecked = checkedItems.some(equalsUnicityKey(tree))

      if (areChildsChecked && !isRootChecked)
        dispatch({ type: ActionType.Check, item: tree })

      if (!areChildsChecked && isRootChecked)
        dispatch({
          type: ActionType.Uncheck,
          itemToToggle: { item: tree, unicityKey },
        })

      childNodes.forEach(shake)
    }
    shake(itemTree)
  }, [checkedItems])

  const isChecked = useCallback(
    (item: Item) => {
      const childs = item[nodesKey] as Array<Item>
      return childs
        ? childs.every(child => checkedItems.some(equalsUnicityKey(child)))
        : checkedItems.some(equalsUnicityKey(item))
    },
    [checkedItems]
  )

  const isPartiallyChecked = useCallback(
    (item: Item) => {
      return (
        (item[nodesKey] as Array<Item>) &&
        getFlat(item, [], nodesKey)
          .slice(1)
          .some(child => checkedItems.some(equalsUnicityKey(child)))
      )
    },
    [checkedItems]
  )

  return { checkedItems, isChecked, isPartiallyChecked, itemTree, toggle }
}

function reducer(state: Array<Item>, action: Action) {
  switch (action.type) {
    case ActionType.Check: {
      return [...state, action.item]
    }
    case ActionType.Uncheck: {
      const {
        itemToToggle: { item, unicityKey },
      } = action
      return state.filter(row => row[unicityKey] !== item[unicityKey])
    }
    case ActionType.Toggle: {
      const { itemToToggle } = action
      if (!itemToToggle) return state
      return getToggledState(
        state,
        itemToToggle.item,
        itemToToggle.nodesKey,
        itemToToggle.unicityKey
      )
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
  item?: Item
  checked?: Array<Item>
  itemToToggle?: {
    item: Item
    nodesKey?: string
    unicityKey?: string
  }
}

type hookInput = {
  items: Array<Item>
  onToggle?: ({ checkedItems }) => void
  nodesKey?: string
  unicityKey?: string
  checked?: Array<unknown>
}

export type ChildKey = { [key: string]: Array<Item> }

export type Item = Partial<{
  [key: string]: any
}>
