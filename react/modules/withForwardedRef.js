import React from 'react'

function withForwardedRef(Component) {
  const ComponentWithRef = React.forwardRef((props, ref) => (
    <Component {...props} forwardedRef={ref} />
  ))

  ComponentWithRef.displayName = Component.displayName || Component.name

  return ComponentWithRef
}

export default withForwardedRef
