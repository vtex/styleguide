import { useMemo, useCallback, useEffect, useReducer } from 'react'

const useTableTreeCheckboxes = ({
  items,
  columns,
}: hookInput): checkboxesHookReturn => {
  const [checkedItems, dispatch] = useReducer(reducer, [])

  const itemTree = useMemo(() => {
    return { id: 'root', children: items.map((item, i) => parseTree(item, i)) }
  }, [items, columns])

  const toggle = useCallback(
    (item: ItemTree): void => {
      dispatch({ type: ActionType.Toggle, item })
    },
    [checkedItems]
  )

  useEffect(() => {
    const shake = (tree: ItemTree) => {
      const { children } = tree
      const checkedIds = idsFrom(checkedItems)

      if (!children) return

      const areChildsChecked = children.every(child =>
        checkedIds.includes(child.id)
      )
      const isRootChecked = checkedIds.includes(tree.id)

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
      const { children } = item
      const condition = children
        ? children.every(child => idsFrom(checkedItems).includes(child.id))
        : checkedItems.some(row => row.id === item.id)
      return condition
    },
    [checkedItems]
  )

  const isPartiallyChecked = useCallback(
    (item: ItemTree) => {
      const { children } = item
      const flatChildren = getFlat(item).slice(1)
      return (
        children &&
        flatChildren.some(child => idsFrom(checkedItems).includes(child.id))
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

      if (!item.children) {
        return state.some(row => row.id === item.id)
          ? state.filter(row => row.id !== item.id)
          : [...state, item]
      } else {
        const flatItems = getFlat(item)
        return state.some(row => row.id === item.id)
          ? state.filter(row => !idsFrom(flatItems).includes(row.id))
          : [...state, ...flatItems].reduce(
              (acc, item) =>
                idsFrom(acc).includes(item.id) ? acc : [...acc, item],
              []
            )
      }
    }
    default: {
      return state
    }
  }
}

function idsFrom(arr: Array<any>): Array<string> {
  return arr.map(item => (item.id ? item.id : ''))
}

function getFlat(tree: ItemTree, arr: Array<ItemTree> = []) {
  arr.push(tree)
  if (!tree.children) return arr
  else {
    tree.children.forEach(child => getFlat(child, arr))
    return arr
  }
}

function parseTree(item: UnparsedItem, index: number, path: string = '') {
  const { children, ...rest } = item

  if (!children) return { id: `${path}.${index}`, ...item }

  const parsedChilden = children.map((child, i) => {
    return parseTree(child, i, `${path}.${index}`)
  })

  return {
    id: `${path}.${index}`,
    children: parsedChilden,
    ...rest,
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

type UnparsedItem = {
  children?: Array<UnparsedItem>
}

type hookInput = {
  items: Array<UnparsedItem>
  columns: Array<Column>
}

export type ItemTree = {
  children?: Array<ItemTree>
  id?: string
}

export type checkboxesHookReturn = {
  checkedItems?: Array<ItemTree>
  itemTree?: ItemTree
  toggle?: (item: ItemTree) => void
  isChecked?: (item: ItemTree) => boolean
  isPartiallyChecked?: (item: ItemTree) => boolean
}

export default useTableTreeCheckboxes
