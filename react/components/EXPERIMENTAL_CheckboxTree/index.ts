import { useMemo, useCallback, useEffect, useReducer } from 'react'
import PropTypes from 'prop-types'
import isEmpty from 'lodash/isEmpty'

import {
  getFlat,
  getToggledState,
  getBulkChecked,
  getBulkUnchecked,
} from './util'

const ROOT_KEY = 'VTEX_CheckboxTreeRoot'
const ROOT_VALUE = 'ROOT'

export default function useCheckboxTree<T>({
  items,
  onToggle,
  nodesKey = 'children',
  checked = [],
  comparator = defaultComparatorCurry,
}: hookInput<T>) {
  const [checkedItems, dispatch] = useReducer(reducer, checked)

  const itemTree = useMemo(() => {
    return { [ROOT_KEY]: ROOT_VALUE, [nodesKey]: items }
  }, [items])

  const toggle = useCallback(
    (item: T): void => {
      dispatch({
        type: ActionType.Toggle,
        itemToToggle: { item, nodesKey, comparator },
      })
    },
    [checkedItems]
  )

  useEffect(() => {
    onToggle({ checkedItems })
  }, [toggle])

  useEffect(() => {
    const shake = (tree: Tree<T>) => {
      const childNodes = tree[nodesKey] as Array<T>

      if (!childNodes || isEmpty(childNodes)) return

      const areChildsChecked = childNodes.every(child =>
        checkedItems.some(comparator(child))
      )
      const isRootChecked = checkedItems.some(comparator(tree))

      if (areChildsChecked && !isRootChecked)
        dispatch({ type: ActionType.Check, item: tree })

      if (!areChildsChecked && isRootChecked)
        dispatch({
          type: ActionType.Uncheck,
          itemToToggle: { item: tree, comparator },
        })

      childNodes.forEach(shake)
    }
    shake(itemTree)
  }, [checkedItems])

  const isChecked = useCallback(
    (item: T) => {
      const childs = item[nodesKey] as Array<T>
      return childs && !isEmpty(childs)
        ? childs.every(child => checkedItems.some(comparator(child)))
        : checkedItems.some(comparator(item))
    },
    [checkedItems]
  )

  const isPartiallyChecked = useCallback(
    (item: T) => {
      return (
        (item[nodesKey] as Array<T>) &&
        getFlat(item, [], nodesKey)
          .slice(1)
          .some(child => checkedItems.some(comparator(child)))
      )
    },
    [checkedItems]
  )

  const check = useCallback(
    (item: T) => {
      dispatch({
        type: ActionType.BulkCheck,
        itemToToggle: { item, comparator, nodesKey },
      })
    },
    [checkedItems]
  )

  const uncheck = useCallback(
    (item: T) => {
      dispatch({
        type: ActionType.BulkUncheck,
        itemToToggle: { item, comparator, nodesKey },
      })
    },
    [checkedItems]
  )

  return {
    checkedItems,
    isChecked,
    isPartiallyChecked,
    itemTree,
    toggle,
    check,
    uncheck,
  }
}

function reducer<T>(state: Array<T>, action: Action<T>) {
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

enum ActionType {
  Check,
  Uncheck,
  Toggle,
  BulkCheck,
  BulkUncheck,
}

type Action<T> = {
  type: ActionType
  item?: T
  checked?: Array<T>
  itemToToggle?: {
    item: T
    nodesKey?: string
    comparator?: comparatorCurry<T>
  }
}

type hookInput<T> = {
  items: Array<T>
  onToggle?: ({ checkedItems }) => void
  nodesKey?: string
  checked?: Array<unknown>
  comparator?: comparatorCurry<Tree<T>>
}

export const defaultComparatorCurry = (item: any) => (candidate: any) =>
  item.id && candidate.id && item.id === candidate.id

export type ChildKey<T> = { [key: string]: Array<T> }

export type comparatorCurry<T> = (item: T) => (candidate: T) => boolean

export type Checkboxes<T> = {
  checkedItems: Tree<T>[]
  isChecked: (item: T) => boolean
  isPartiallyChecked: (item: T) => boolean
  itemTree: {
    [x: string]: string | T[]
    [ROOT_KEY]: string
  }
  toggle: (item: T) => void
  check: (item: T) => void
  uncheck: (item: T) => void
}

export type Tree<T> = { [x: string]: string | T[]; [ROOT_KEY]: string } | T

export const checkboxesPropTypes = {
  checkboxes: PropTypes.shape({
    checkedItems: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string,
      })
    ),
    itemTree: PropTypes.shape({
      id: PropTypes.string,
    }),
    toggle: PropTypes.func,
    isChecked: PropTypes.func,
    isPartiallyChecked: PropTypes.func,
  }),
}
