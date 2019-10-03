import { useMemo, useCallback, useEffect, useReducer } from 'react'
import { getFlat, getToggledState, eqProp } from './checkboxesUtils'

const useTableTreeCheckboxes = ({
  items,
  columns,
  onToggle,
  childsKey = 'children',
  unicityKey = 'id',
}: hookInput): checkboxesHookReturn => {
  const [checkedItems, dispatch] = useReducer(reducer, [])
  const equalsUnicityKey = eqProp(unicityKey)

  const itemTree = useMemo(() => {
    return { [unicityKey]: 'root', [childsKey]: items }
  }, [items, columns])

  const toggle = useCallback(
    (item: Item): void => {
      dispatch({
        type: ActionType.Toggle,
        itemToToggle: { item, childsKey, unicityKey },
      })
    },
    [checkedItems]
  )

  useEffect(() => {
    onToggle({ checkedItems })
  }, [toggle])

  useEffect(() => {
    const shake = (tree: Item) => {
      const childs = tree[childsKey] as Array<Item>

      if (!childs) return

      const areChildsChecked = childs.every(child =>
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

      childs.forEach(shake)
    }
    shake(itemTree)
  }, [checkedItems])

  const isChecked = useCallback(
    (item: Item) => {
      const childs = item[childsKey] as Array<Item>
      return childs
        ? childs.every(child => checkedItems.some(equalsUnicityKey(child)))
        : checkedItems.some(equalsUnicityKey(item))
    },
    [checkedItems]
  )

  const isPartiallyChecked = useCallback(
    (item: Item) => {
      return (
        (item[childsKey] as Array<Item>) &&
        getFlat(item, [], childsKey)
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
        itemToToggle.childsKey,
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
    childsKey?: string
    unicityKey?: string
  }
}

type hookInput = {
  items: Array<Item>
  columns: Array<Column>
  onToggle?: ({ checkedItems }) => void
  childsKey?: string
  unicityKey?: string
}

export type ChildKey = { [key: string]: Array<Item> }

export type Item = Partial<{
  [key: string]: any
}>

export type checkboxesHookReturn = {
  checkedItems?: Array<Item>
  itemTree?: Item
  toggle?: (item: Item) => void
  isChecked?: (item: Item) => boolean
  isPartiallyChecked?: (item: Item) => boolean
}

export default useTableTreeCheckboxes
