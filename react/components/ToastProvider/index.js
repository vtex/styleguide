import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ToastManager from './ToastManager'

const ToastContext = React.createContext({
  showToast: () => {},
  hideToast: () => {},
  toastState: null,
})

class ToastProvider extends Component {
  render() {
    const { children, positioning } = this.props
    return (
      <ToastManager positioning={positioning}>
        {({ showToast, hideToast, state: toastState }) => (
          <ToastContext.Provider
            value={{
              showToast,
              hideToast,
              toastState,
            }}>
            {children}
          </ToastContext.Provider>
        )}
      </ToastManager>
    )
  }
}

ToastProvider.propTypes = {
  children: PropTypes.node,
  /** Sets the position of the toasts based either on the dimensions of the parent element of the ToastProvider, or window dimensions */
  positioning: PropTypes.oneOf(['parent', 'window']),
}

ToastProvider.defaultProps = {
  positioning: 'parent',
}

class ToastConsumer extends Component {
  render() {
    return <ToastContext.Consumer>{this.props.children}</ToastContext.Consumer>
  }
}

ToastConsumer.propTypes = {
  children: PropTypes.func.isRequired,
}

// eslint-disable-next-line react/display-name
const withToast = WrappedComponent => props => (
  <ToastConsumer>
    {({ showToast, hideToast, toastState }) => (
      <WrappedComponent
        showToast={showToast}
        hideToast={hideToast}
        toastState={toastState}
        {...props}
      />
    )}
  </ToastConsumer>
)

export { ToastProvider, ToastConsumer, withToast }
