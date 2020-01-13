import { useState, useEffect } from 'react'

export const useClickOutside = (
  ref: React.RefObject<HTMLElement> | null,
  onClickOutside: (e: Event) => void
) => {
  const handleClickOutside = (e: Event) => {
    if (
      ref &&
      ref.current &&
      e.target instanceof Node &&
      !ref.current.contains(e.target)
    ) {
      onClickOutside(e)
    }
  }

  useEffect(() => {
    // Bind the event listener
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener('mousedown', handleClickOutside)
    }
  })
}

export const useArrowNavigation = (
  ref: React.RefObject<HTMLElement> | null,
  optionsLength: number,
  initialSelectedOptionIndex: number
): [number, (index: number) => void] => {
  const [selectedOptionIndex, setSelectedOptionIndex] = useState(
    initialSelectedOptionIndex
  )

  const handleKeyDown = (e: KeyboardEvent) => {
    if (
      ref &&
      ref.current &&
      e.target instanceof Node &&
      ref.current.contains(e.target)
    ) {
      let index
      switch (e.key) {
        case 'ArrowUp':
          e.preventDefault()
          index = Math.max(selectedOptionIndex - 1, initialSelectedOptionIndex)
          return setSelectedOptionIndex(index)
        case 'ArrowDown':
          e.preventDefault()
          index = Math.min(selectedOptionIndex + 1, optionsLength - 1)
          return setSelectedOptionIndex(index)
        default:
          return
      }
    }
  }

  useEffect(() => {
    // Bind the event listener
    document.addEventListener('keydown', handleKeyDown)
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener('keydown', handleKeyDown)
    }
  })

  return [selectedOptionIndex, setSelectedOptionIndex]
}
