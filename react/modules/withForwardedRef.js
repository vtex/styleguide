import React from 'react'
import PropTypes from 'prop-types'

// For more info see: https://stackoverflow.com/a/51127130/10725088
const Element = typeof Element === 'undefined' ? function() {} : Element

export const refShape = PropTypes.oneOfType([
  PropTypes.func,
  PropTypes.shape({
    current: PropTypes.oneOfType([
      PropTypes.instanceOf(null),
      PropTypes.instanceOf(Element)
    ]),
  }),
])

export function withForwardedRef(Component) {
  const ComponentWithRef = React.forwardRef((props, ref) => {
    return <Component {...props} forwardedRef={ref} />
  })

  ComponentWithRef.displayName = Component.displayName || Component.name

  return ComponentWithRef
}
