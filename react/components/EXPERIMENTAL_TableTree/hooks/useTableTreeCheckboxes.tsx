import React, {
  useMemo,
  useEffect,
  useReducer,
  useCallback,
  Children,
} from 'react'

// const WIDTH = 40

const useTableTreeCheckboxes = ({
  items,
  columns,
}: hookInput): checkboxesHookReturn => {
  const [checkboxesState, dispatch] = useReducer(reducer, {
    checked: [],
    partial: [],
    allChecked: false,
  })

  const parsedItems = useMemo(() => {
    return items.map((item, i) => parseTree(item, i))
  }, [items, columns])

  const toggle = (item: ParsedItem): void => {
    dispatch({ type: ActionType.Toggle, item })
  }

  const isChecked = (item: ParsedItem) => {
    const { children } = item
    const { checked, allChecked } = checkboxesState
    return children
      ? children.every(child => idsFrom(checked).includes(child.id))
      : allChecked || checked.some(row => row.id === item.id)
  }

  const isPartiallyChecked = (item: ParsedItem) => {
    const { children } = item
    const { checked } = checkboxesState
    const flatChildren = getFlat(item).slice(1)
    return (
      children && flatChildren.some(child => idsFrom(checked).includes(child.id))
    )
  }

  return { checkboxesState, isChecked, isPartiallyChecked, parsedItems, toggle }
}

function reducer(state: CheckboxesState, action: Action) {
  switch (action.type) {
    case ActionType.SetChecked: {
      return {
        ...state,
        checked: action.checked,
      }
    }
    case ActionType.SetPartial: {
      return {
        ...state,
        partial: action.partial,
      }
    }
    case ActionType.UncheckAll: {
      return {
        ...state,
        checked: [],
        partial: [],
        allChecked: false,
      }
    }
    case ActionType.CheckAll: {
      return {
        ...state,
        partial: [],
        checked: action.checked,
        allChecked: true,
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
              checked: [...checked, ...flatItems],
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

function getFlat(tree: ParsedItem, arr: Array<ParsedItem> = []) {
  const { children, ...root } = tree
  arr.push(root)
  if (!children) return arr
  else {
    children.forEach(child => getFlat(child, arr))
    return arr
  }
}

function parseTree(item: Item, index: number, path: string = '') {
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

export type CheckboxesState = {
  checked?: Array<ParsedItem>
  partial?: Array<ParsedItem>
  allChecked?: boolean
}

enum ActionType {
  SetChecked,
  SetPartial,
  Toggle,
  CheckAll,
  UncheckAll,
}

type Action = {
  type: ActionType
  item?: ParsedItem
  checked?: Array<ParsedItem>
  partial?: Array<ParsedItem>
}

type Item = {
  children?: Array<ParsedItem>
}

type hookInput = {
  items: Array<Item>
  columns: Array<Column>
}

export type ParsedItem = Item & {
  id?: string
}

export type checkboxesHookReturn = {
  checkboxesState?: CheckboxesState
  parsedItems?: Array<ParsedItem>
  toggle?: (item: ParsedItem) => void
  isChecked?: (item: ParsedItem) => boolean
  isPartiallyChecked?: (item: ParsedItem) => boolean
}

export default useTableTreeCheckboxes
