import React, {
  PropsWithoutRef,
  RefAttributes,
  ForwardRefExoticComponent,
  ComponentType,
} from 'react'
import PropTypes from 'prop-types'

// For more info see: https://stackoverflow.com/a/51127130/10725088
export const refShape = PropTypes.oneOfType([
  PropTypes.func,
  PropTypes.shape({
    current: PropTypes.instanceOf(Element),
  }),
])

export function withForwardedRef<P>(
  Component: ComponentType<P>
): ForwardRefExoticComponent<PropsWithoutRef<P> & RefAttributes<any>> {
  const ComponentWithRef = React.forwardRef((props: P, ref) => {
    return <Component {...props} forwardedRef={ref} />
  })

  ComponentWithRef.displayName = Component.displayName || Component.name

  return ComponentWithRef
}
