import { useState, useCallback } from 'react'

const useTreeState = () => {
  const [collapsedItems, setCollapsedItems] = useState([])

  const toggleCollapsed = useCallback(
    (uniqueKey: unknown) => {
      collapsedItems.includes(uniqueKey)
        ? setCollapsedItems(collapsedItems.filter(key => key !== uniqueKey))
        : setCollapsedItems([...collapsedItems, uniqueKey])
    },
    [collapsedItems]
  )

  const isCollapsed = (uniqueKey: unknown) => collapsedItems.includes(uniqueKey)

  return { collapsedItems, toggleCollapsed, isCollapsed }
}

export default useTreeState
