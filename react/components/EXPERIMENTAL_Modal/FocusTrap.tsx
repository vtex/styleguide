import React, {
  FC,
  useEffect,
  useRef,
  Children,
  ReactElement,
  useCallback,
} from 'react'

import { canUseDOM, Key } from './utils'
import useMergeRefs from '../../utilities/useMergeRefs'

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
  const child = Children.only(children)

  const focusContainer = useRef<HTMLDivElement>(null)

  const handleTab = useCallback((event: KeyboardEvent) => {
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
  }, [])

  const handleKeyEvent = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === Key.TAB) {
        handleTab(event)
      }
    },
    [handleTab]
  )

  useEffect(() => {
    if (canUseDOM) document.addEventListener('keydown', handleKeyEvent)
    return () => {
      if (canUseDOM) document.removeEventListener('keydown', handleKeyEvent)
    }
  }, [handleKeyEvent])

  useEffect(() => {
    if (!focusContainer.current) {
      return
    }
    const alreadyHasFocus =
      canUseDOM &&
      focusContainer.current &&
      focusContainer.current.contains(document.activeElement)
    if (!alreadyHasFocus) focusFirstElement(focusContainer.current)
  }, [focusContainer])

  const mergedRefs = useMergeRefs(
    typeof child === 'object'
      ? // The ref property doesn't exist on ReactElement types, but
        // it exist in practice and is the only way to get the child
        // element's ref
        ((child as any).ref as React.Ref<HTMLElement>)
      : () => {},
    focusContainer
  )

  return React.cloneElement(child as ReactElement, {
    ref: mergedRefs,
  })
}

export default FocusTrap
