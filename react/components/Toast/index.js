import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ToastManager from './ToastManager'

const ToastContext = React.createContext({
  showToast: () => {},
  hideToast: () => {},
})

class ToastProvider extends Component {
  constructor(props) {
    super(props)

    this.toastManager = React.createRef()
  }

  showToast = message => {
    this.toastManager &&
      this.toastManager.current &&
      this.toastManager.current.showToast &&
      this.toastManager.current.showToast(message)
  }

  hideToast = () => {
    this.toastManager &&
      this.toastManager.current &&
      this.toastManager.current.hideToast &&
      this.toastManager.current.hideToast()
  }

  render() {
    const { children, positioning } = this.props
    return (
      <ToastContext.Provider
        value={{
          showToast: this.showToast,
          hideToast: this.hideToast,
        }}>
        {children}
        <ToastManager positioning={positioning} ref={this.toastManager} />
      </ToastContext.Provider>
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
    const { children } = this.props
    return (
      <ToastContext.Consumer>
        {value =>
          children({
            showToast: value.showToast,
            hideToast: value.hideToast,
          })
        }
      </ToastContext.Consumer>
    )
  }
}

ToastConsumer.propTypes = {
  children: PropTypes.func.isRequired,
}

// eslint-disable-next-line react/display-name
const withToast = WrappedComponent => props => (
  <ToastConsumer>
    {({ showToast, hideToast }) => (
      <WrappedComponent
        showToast={showToast}
        hideToast={hideToast}
        {...props}
      />
    )}
  </ToastConsumer>
)

export { ToastProvider, ToastConsumer, withToast }
