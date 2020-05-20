import React, { FC, useEffect, useRef } from 'react'

enum Key {
  TAB = 9,
  SHIFT = 16,
}

const FOCUSABLE_SELECTOR =
  'a,frame,iframe,input:not([type=hidden]):not(:disabled),select:not(:disabled),textarea:not(:disabled),button:not(:disabled),*[tabindex]:not([tabindex="-1"])'

const findFirstFocusable = (element: HTMLElement): HTMLElement | null => {
  if (element.matches && element.matches(FOCUSABLE_SELECTOR)) {
    return element
  }

  return element.querySelector(FOCUSABLE_SELECTOR)
}

const findLastFocusable = (element: HTMLElement): HTMLElement | null => {
  if (element.matches && element.matches(FOCUSABLE_SELECTOR)) {
    return element
  }
  const focusableElements = element.querySelectorAll(FOCUSABLE_SELECTOR)
  return focusableElements[focusableElements.length - 1] as HTMLElement | null
}

const focusFirstElement = (element: HTMLElement) => {
  const firstElement = findFirstFocusable(element)
  firstElement?.focus()
}

interface Props {
  children?: React.ReactNode
}

const FocusTrap: FC<Props> = ({ children }) => {
  const focusContainer = useRef<HTMLDivElement>(null)

  const handleTab = (event: KeyboardEvent) => {
    if (!focusContainer.current) {
      return
    }

    const firstFocusableElement = findFirstFocusable(focusContainer.current)
    const lastFocusableElement = findLastFocusable(focusContainer.current)

    if (event.target === firstFocusableElement && event.shiftKey) {
      event.preventDefault()
      lastFocusableElement?.focus()
    } else if (event.target === lastFocusableElement && !event.shiftKey) {
      event.preventDefault()
      firstFocusableElement?.focus()
    }
  }

  const handleKeyEvent = (event: KeyboardEvent) => {
    if (event.keyCode === Key.TAB) {
      handleTab(event)
    }
  }

  useEffect(() => {
    document.addEventListener('keydown', handleKeyEvent)
    return () => {
      document.removeEventListener('keydown', handleKeyEvent)
    }
  })

  useEffect(() => {
    if (!focusContainer.current) {
      return
    }
    const alreadyHasFocus =
      focusContainer.current &&
      focusContainer.current.contains(document.activeElement)
    if (!alreadyHasFocus) focusFirstElement(focusContainer.current)
  }, [focusContainer])

  return (
    <>
      {children
        ? React.cloneElement(children as React.ReactElement, {
            ref: focusContainer,
          })
        : children}
    </>
  )
}

export default FocusTrap
