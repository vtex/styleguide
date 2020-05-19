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

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode
  initialFocusRef?: React.RefObject<HTMLElement> | null
}

const FocusTrap: FC<Props> = ({ children, initialFocusRef, ...props }) => {
  const focusContainer = useRef<HTMLDivElement>(null)

  const handleFocusIn = (event: FocusEvent) => {
    const alreadyHasFocus =
      focusContainer.current &&
      focusContainer.current.contains(document.activeElement)
    if (
      !focusContainer.current ||
      alreadyHasFocus ||
      !(
        event.target instanceof HTMLElement &&
        focusContainer.current !== event.target &&
        !focusContainer.current.contains(event.target)
      )
    ) {
      return
    }

    focusFirstElement(focusContainer.current)
  }

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
    document.addEventListener('focusin', handleFocusIn)
    return () => {
      document.removeEventListener('keydown', handleKeyEvent)
      document.removeEventListener('focusin', handleFocusIn)
    }
  })

  useEffect(() => {
    if (!focusContainer.current) {
      return
    }
    if (initialFocusRef) {
      initialFocusRef?.current?.focus()
      return
    }
    focusFirstElement(focusContainer.current)
  }, [focusContainer, initialFocusRef])

  return (
    <div ref={focusContainer} {...props}>
      {children}
    </div>
  )
}

export default FocusTrap
