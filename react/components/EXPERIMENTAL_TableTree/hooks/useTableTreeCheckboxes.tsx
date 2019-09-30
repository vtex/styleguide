import { useMemo, useEffect, useReducer } from 'react'

const useTableTreeCheckboxes = ({
  items,
  columns,
}: hookInput): checkboxesHookReturn => {
  const [checkboxesState, dispatch] = useReducer(reducer, {
    checked: [],
  })

  const itemTree = useMemo(() => {
    return { id: 'root', children: items.map((item, i) => parseTree(item, i)) }
  }, [items, columns])

  const toggle = (item: ItemTree): void => {
    dispatch({ type: ActionType.Toggle, item })
  }

  useEffect(() => {
    console.log(checkboxesState.checked)
  })

  const shake = (tree: ItemTree) => {
    const { children } = tree
    const { checked } = checkboxesState
    const checkedIds = idsFrom(checked)

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

  useEffect(() => {
    shake(itemTree)
  }, [checkboxesState.checked])

  const isChecked = (item: ItemTree) => {
    const { children } = item
    const { checked } = checkboxesState
    const condition = children
      ? children.every(child => idsFrom(checked).includes(child.id))
      : checked.some(row => row.id === item.id)
    return condition
  }

  const isPartiallyChecked = (item: ItemTree) => {
    const { children } = item
    const { checked } = checkboxesState
    const flatChildren = getFlat(item).slice(1)
    return (
      children &&
      flatChildren.some(child => idsFrom(checked).includes(child.id))
    )
  }

  return { checkboxesState, isChecked, isPartiallyChecked, itemTree, toggle }
}

function reducer(state: CheckboxesState, action: Action) {
  switch (action.type) {
    case ActionType.Check: {
      return {
        ...state,
        checked: [...state.checked, action.item],
      }
    }
    case ActionType.Uncheck: {
      return {
        ...state,
        checked: state.checked.filter(row => row.id !== action.item.id),
      }
    }
    case ActionType.Toggle: {
      const { item } = action
      const { checked } = state

      if (!item) return state

      if (!item.children) {
        return checked.some(row => row.id === item.id)
          ? {
              ...state,
              checked: checked.filter(row => row.id !== item.id),
              allChecked: false,
            }
          : {
              ...state,
              checked: [...checked, item],
            }
      } else {
        const flatItems = getFlat(item)
        return checked.some(row => row.id === item.id)
          ? {
              ...state,
              checked: checked.filter(
                row => !idsFrom(flatItems).includes(row.id)
              ),
            }
          : {
              ...state,
              checked: [...checked, ...flatItems].reduce(
                (acc, item) =>
                  idsFrom(acc).includes(item.id) ? acc : [...acc, item],
                []
              ),
            }
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

export type CheckboxesState = {
  checked?: Array<ItemTree>
}

export type checkboxesHookReturn = {
  checkboxesState?: CheckboxesState
  itemTree?: ItemTree
  toggle?: (item: ItemTree) => void
  isChecked?: (item: ItemTree) => boolean
  isPartiallyChecked?: (item: ItemTree) => boolean
}

export default useTableTreeCheckboxes
