import React, { forwardRef, ComponentType } from 'react'
import PropTypes from 'prop-types'

export class Noop {}

// For more info see: https://stackoverflow.com/a/51127130/10725088
const Element =
  typeof window === 'undefined' || typeof window.Element === 'undefined'
    ? Noop
    : window.Element

export const refShape = PropTypes.oneOfType([
  PropTypes.func,
  PropTypes.shape({
    current: PropTypes.instanceOf(Element),
  }),
])

export function withForwardedRef<T, P>(Component: React.ComponentType<P>) {
  const ComponentWithRef = React.forwardRef<T, P>((props, ref) => {
    return <Component {...props} forwardedRef={ref} />
  })

  ComponentWithRef.displayName = Component.displayName ?? Component.name

  return ComponentWithRef
}
