import { useMemo, useCallback, useEffect, useReducer, useState } from 'react'
import PropTypes from 'prop-types'
import isEmpty from 'lodash/isEmpty'

import { getFlat } from './util'
import { defaultComparatorCurry, ROOT_KEY, ROOT_VALUE } from './constants'
import { useCheckboxesInput, Tree } from './types'
import reducer, { ActionType } from './reducer'

export default function useCheckboxTree<T>({
  items,
  onToggle,
  nodesKey = 'children',
  checked = [],
  comparator = defaultComparatorCurry,
  isDisabled = (item: T | Tree<T>) => false,
}: useCheckboxesInput<T>) {
  const [checkedItems, dispatch] = useReducer(reducer, checked)
  const [lastToggled, setLastToggled] = useState(null)

  const itemTree = useMemo(() => {
    return { [ROOT_KEY]: ROOT_VALUE, [nodesKey]: items }
  }, [items])

  const disabledItems = useMemo(() => {
    return getFlat(itemTree).filter(isDisabled)
  }, [itemTree])

  const toggle = useCallback(
    (item: T | Tree<T>): void => {
      if (!isDisabled(item)) {
        dispatch({
          type: ActionType.Toggle,
          itemToToggle: { item, nodesKey, comparator },
          isDisabled,
        })
        setLastToggled(item)
      }
    },
    [checkedItems, itemTree]
  )

  useEffect(() => {
    onToggle && onToggle({ checkedItems, disabledItems, item: lastToggled })
  }, [toggle])

  const toggleAll = useCallback(() => {
    toggle(itemTree)
  }, [itemTree, toggle])

  useEffect(() => {
    const shake = (tree: Tree<T>) => {
      const childNodes = tree[nodesKey] as Array<T>

      if (!childNodes || isEmpty(childNodes)) return

      const childrenChecked = childNodes
        .filter(childNode => !isDisabled(childNode))
        .every(childNode => checkedItems.some(comparator(childNode)))

      const rootChecked = checkedItems.some(comparator(tree))

      if (childrenChecked && !rootChecked && !isDisabled(tree))
        dispatch({ type: ActionType.Check, item: tree })

      if (!childrenChecked && rootChecked)
        dispatch({
          type: ActionType.Uncheck,
          itemToToggle: { item: tree, comparator },
        })

      childNodes.forEach(shake)
    }
    shake(itemTree)
  }, [checkedItems, toggle, itemTree])

  const isChecked = useCallback(
    (item: T | Tree<T>) => {
      const children = item[nodesKey]
      const onCheckedList = (item: T | Tree<T>) =>
        checkedItems.some(comparator(item))
      const notDisabled = (item: T | Tree<T>) => !isDisabled(item)

      const notDisabledChildren = children && children.filter(notDisabled)
      const notEmpty = !!notDisabledChildren && !isEmpty(notDisabledChildren)

      return notEmpty
        ? notDisabledChildren.every(onCheckedList)
        : checkedItems.some(comparator(item))
    },
    [checkedItems, toggle]
  )

  const isPartiallyChecked = useCallback(
    (item: T | Tree<T>) => {
      return (
        !isDisabled(item) &&
        (item[nodesKey] &&
          getFlat(item, [], nodesKey)
            .slice(1)
            .some(child => checkedItems.some(comparator(child))))
      )
    },
    [checkedItems, itemTree, toggle]
  )

  const allChecked = useMemo(() => {
    return isChecked(itemTree)
  }, [checkedItems, itemTree, toggle])

  const someChecked = useMemo(() => {
    return checkedItems.length > 0
  }, [checkedItems, itemTree, toggle])

  const check = (item: T | Tree<T>) => {
    if (!isDisabled(item))
      dispatch({
        type: ActionType.BulkCheck,
        itemToToggle: { item, comparator, nodesKey },
        isDisabled,
      })
  }

  const checkAll = () => check(itemTree)

  const uncheck = (item: T | Tree<T>) => {
    if (!isDisabled(item))
      dispatch({
        type: ActionType.BulkUncheck,
        itemToToggle: { item, comparator, nodesKey },
      })
  }

  const uncheckAll = useCallback(() => {
    uncheck(itemTree)
  }, [checkedItems, itemTree, toggle])

  const setChecked = (checked: Array<T>) => {
    dispatch({ type: ActionType.SetChecked, checked })
  }

  return {
    checkedItems,
    isChecked,
    allChecked,
    someChecked,
    isPartiallyChecked,
    itemTree,
    toggle,
    toggleAll,
    check,
    checkAll,
    uncheck,
    uncheckAll,
    isDisabled,
    disabledItems,
    setChecked,
  }
}

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
