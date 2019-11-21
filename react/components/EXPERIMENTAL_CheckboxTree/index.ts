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

export default function useCheckboxTree({
  items,
  onToggle,
  nodesKey = 'children',
  checked = [],
  comparator = defaultComparatorCurry,
}: hookInput) {
  const [checkedItems, dispatch] = useReducer(reducer, checked)

  const itemTree = useMemo(() => {
    return { [ROOT_KEY]: ROOT_VALUE, [nodesKey]: items }
  }, [items])

  const toggle = useCallback(
    (item: Item): void => {
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
    const shake = (tree: Item) => {
      const childNodes = tree[nodesKey] as Array<Item>

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
    (item: Item) => {
      const childs = item[nodesKey] as Array<Item>
      return childs && !isEmpty(childs)
        ? childs.every(child => checkedItems.some(comparator(child)))
        : checkedItems.some(comparator(item))
    },
    [checkedItems]
  )

  const isPartiallyChecked = useCallback(
    (item: Item) => {
      return (
        (item[nodesKey] as Array<Item>) &&
        getFlat(item, [], nodesKey)
          .slice(1)
          .some(child => checkedItems.some(comparator(child)))
      )
    },
    [checkedItems]
  )

  const check = useCallback(
    (item: Item) => {
      dispatch({
        type: ActionType.BulkCheck,
        itemToToggle: { item, comparator, nodesKey },
      })
    },
    [checkedItems]
  )

  const uncheck = useCallback(
    (item: Item) => {
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

function reducer(state: Array<Item>, action: Action) {
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

type Action = {
  type: ActionType
  item?: Item
  checked?: Array<Item>
  itemToToggle?: {
    item: Item
    nodesKey?: string
    comparator?: comparatorCurry
  }
}

type hookInput = {
  items: Array<Item>
  onToggle?: ({ checkedItems }) => void
  nodesKey?: string
  checked?: Array<unknown>
  comparator?: comparatorCurry
}

export const defaultComparatorCurry = (item: Item) => (candidate: Item) =>
  item.id && candidate.id && item.id === candidate.id

export type ChildKey = { [key: string]: Array<Item> }

export type comparatorCurry = (item: any) => (candidate: any) => boolean

export type Item = Partial<{
  [key: string]: any
}>

export type Checkboxes = Partial<ReturnType<typeof useCheckboxTree>>

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
