import get from 'lodash/get'
import { RefObject, useState, useRef, useLayoutEffect } from 'react'

import observeRect from './utils/dom'
import { setRef } from '../utils/react'

export type Trigger = 'click' | 'hover' | 'focus'

export function useRect(nodeRef, observe = true) {
  const [rect, setRect] = useState(null)
  const observerRef = useRef(null)
  useLayoutEffect(() => {
    if (!observerRef.current && nodeRef.current) {
      observerRef.current = observeRect(nodeRef.current, setRect)
    }
    if (observerRef.current && observe) {
      observerRef.current.observe()
    }
    return () => observerRef.current && observerRef.current.unobserve()
  }, [observe, nodeRef])
  return rect
}

export function useTooltip({
  trigger,
}: {
  trigger?: Trigger
} = {}): [
  (c: React.ReactElement) => object,
  { childRef: RefObject<HTMLElement>; visible: boolean }
] {
  const childRef = useRef<HTMLElement>()
  const [visible, setVisible] = useState(false)
  const handleTooltip = (
    child: React.ReactElement & { ref?: RefObject<HTMLElement> }
  ) => {
    return {
      ref: node => {
        // Keep your own reference
        if (node) {
          setRef(childRef, node)
        }
        // Call the original ref, if any
        setRef(child.ref, node)
      },
      ...(trigger === 'hover'
        ? {
            onMouseEnter: (...args) => {
              setVisible(true)
              const onMouseEnter = get(child, 'props.onMouseEnter')
              if (onMouseEnter) {
                return onMouseEnter.call(child.props, ...args)
              }
            },
            onMouseLeave: (...args) => {
              setVisible(false)
              const onMouseLeave = get(child, 'props.onMouseLeave')
              if (onMouseLeave) {
                return onMouseLeave.call(child.props, ...args)
              }
            },
          }
        : {}),
      ...(trigger === 'click' || trigger === 'focus'
        ? {
            onClick: (...args) => {
              // Firefox and Safari, both on Mac OS, doesn't focus on click, like
              // Google Chrome does, so...
              if (childRef.current) {
                childRef.current.focus()
              }
              const onClick = get(child, 'props.onClick')
              if (onClick) {
                return onClick.call(child.props, ...args)
              }
            },
            onFocus: (...args) => {
              setVisible(true)
              const onFocus = get(child, 'props.onFocus')
              if (onFocus) {
                return onFocus.call(child.props, ...args)
              }
            },
            onBlur: (...args) => {
              setVisible(false)
              const onBlur = get(child, 'props.onBlur')
              if (onBlur) {
                return onBlur.call(child.props, ...args)
              }
            },
          }
        : {}),
    }
  }
  return [handleTooltip, { childRef, visible }]
}
