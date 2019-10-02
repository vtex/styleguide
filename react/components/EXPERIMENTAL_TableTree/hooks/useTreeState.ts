import { useState, useCallback } from 'react'

const useTreeState = () => {
  const [collapsedItems, setCollapsedItems] = useState([])

  const toggleCollapsed = useCallback(
    (id: string) => {
      collapsedItems.includes(id)
        ? setCollapsedItems(collapsedItems.filter(cid => cid !== id))
        : setCollapsedItems([...collapsedItems, id])
    },
    [collapsedItems]
  )

  const isCollapsed = (id: string) => collapsedItems.includes(id)

  return { collapsedItems, toggleCollapsed, isCollapsed }
}

export default useTreeState
