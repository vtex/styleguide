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
  isDisabled = (_: T | Tree<T>) => false,
}: useCheckboxesInput<T>) {
  const [checkedItems, dispatch] = useReducer(reducer, checked)
  const [lastToggledItem, setLastToggledItem] = useState(null)

  const itemTree = useMemo(() => {
    return { [ROOT_KEY]: ROOT_VALUE, [nodesKey]: items }
  }, [items, nodesKey])

  const disabledItems = useMemo(() => {
    return getFlat(itemTree).filter(isDisabled)
  }, [isDisabled, itemTree])

  const toggle = useCallback(
    (item: T | Tree<T>): void => {
      if (!isDisabled(item)) {
        dispatch({
          type: ActionType.Toggle,
          itemToToggle: { item, nodesKey, comparator },
          isDisabled,
        })
        setLastToggledItem(item)
      }
    },
    [comparator, isDisabled, nodesKey]
  )

  useEffect(() => {
    onToggle && onToggle({ checkedItems, disabledItems, item: lastToggledItem })
  }, [checkedItems, disabledItems, lastToggledItem, onToggle, toggle])

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
  }, [checkedItems, toggle, itemTree, nodesKey, comparator, isDisabled])

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
    [checkedItems, comparator, isDisabled, nodesKey]
  )

  const isPartiallyChecked = useCallback(
    (item: T | Tree<T>) => {
      return (
        !isDisabled(item) &&
        item[nodesKey] &&
        getFlat(item, [], nodesKey)
          .slice(1)
          .some(child => checkedItems.some(comparator(child)))
      )
    },
    [checkedItems, comparator, isDisabled, nodesKey]
  )

  const allChecked = useMemo(() => {
    return isChecked(itemTree)
  }, [isChecked, itemTree])

  const someChecked = useMemo(() => {
    return checkedItems.length > 0
  }, [checkedItems])

  const allDisabled = useMemo(() => {
    return isDisabled(itemTree)
  }, [isDisabled, itemTree])

  const check = (item: T | Tree<T>) => {
    if (!isDisabled(item))
      dispatch({
        type: ActionType.BulkCheck,
        itemToToggle: { item, comparator, nodesKey },
        isDisabled,
      })
  }

  const checkAll = () => check(itemTree)

  const uncheck = useCallback(
    (item: T | Tree<T>) => {
      if (!isDisabled(item))
        dispatch({
          type: ActionType.BulkUncheck,
          itemToToggle: { item, comparator, nodesKey },
        })
    },
    [comparator, isDisabled, nodesKey]
  )

  const uncheckAll = useCallback(() => {
    uncheck(itemTree)
  }, [itemTree, uncheck])

  const setChecked = (checked: Array<T>) => {
    dispatch({ type: ActionType.SetChecked, checked })
  }

  return {
    checkedItems,
    isChecked,
    allChecked,
    allDisabled,
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
    lastToggledItem,
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
