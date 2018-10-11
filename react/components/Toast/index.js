import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Toast from './Toast'
import isString from 'lodash/isString'

const ToastContext = React.createContext({
  showToast: () => {},
  hideToast: () => {},
})

class ToastProvider extends Component {
  constructor(props) {
    super(props)

    this.container = React.createRef()
  }

  state = {
    currentToast: null,
    nextToast: null,
    isToastVisible: true,
  }

  showToast = (args) => {
    if (isString(args)) {
      args = { message: args }
    }
    const { message = '', action } = args

    if (this.state.currentToast) {
      // If there is a toast present already, queue up the next toast
      // It will be displayed when the current toast is closed, on handleToastClose
      this.setState({
        nextToast: {
          message,
          action,
        },
      })
      this.hideToast()
    } else {
      this.setState({
        currentToast: {
          message,
          action,
        },
        isToastVisible: true,
      })
    }
  }

  hideToast = () => {
    this.setState({
      isToastVisible: false,
    })
  }

  handleToastClose = () => {
    this.setState(state => {
      return ({
        // If there is a toast queued up, shows it.
        // Otherwise, nextToast will be null, and state.toast will be cleared up
        currentToast: state.nextToast,
        isToastVisible: !!state.nextToast,
        nextToast: null,
      })
    })
  }

  getParentBounds = () => {
    const parentContainer = this.container.current && this.container.current.parentNode
    return parentContainer &&
      parentContainer.getBoundingClientRect &&
      parentContainer.getBoundingClientRect()
  }

  updateContainerBounds = () => {
    const defaultBounds = {
      left: 0,
      right: window.innerWidth,
      top: 0,
      bottom: window.innerHeight,
    }

    const bounds = (!this.props.breakOutOfParent && this.getParentBounds()) || defaultBounds

    if (this.container.current) {
      this.container.current.style.left = `${bounds.left}px`
      this.container.current.style.right = `${window.innerWidth - bounds.right}px`
      this.container.current.style.top = `${bounds.top}px`
      this.container.current.style.bottom = `${Math.max(0, window.innerHeight - bounds.bottom)}px`
    }
  }

  componentDidUpdate() {
    this.updateContainerBounds()
  }

  render() {
    const { currentToast } = this.state
    const { children } = this.props
    return (
      <ToastContext.Provider value={{
        showToast: this.showToast,
        hideToast: this.hideToast,
      }}>
        {children}
        <div
          className="fixed z-5 overflow-hidden"
          ref={this.container}
          style={{
            pointerEvents: 'none',
          }}
        >
          {currentToast && (
            <Toast
              message={currentToast.message}
              action={currentToast.action}
              visible={this.state.isToastVisible}
              onClose={this.handleToastClose}
            />
          )}
        </div>
      </ToastContext.Provider>
    )
  }
}

ToastProvider.propTypes = {
  children: PropTypes.node,
  breakOutOfParent: PropTypes.bool,
}

ToastProvider.defaultProps = {
  breakOutOfParent: false,
}

class ToastConsumer extends Component {
  render() {
    const { children } = this.props
    return (
      <ToastContext.Consumer>
        { value => (
          children({
            showToast: value.showToast,
            hideToast: value.hideToast,
          })
        )}
      </ToastContext.Consumer>
    )
  }
}

ToastConsumer.propTypes = {
  children: PropTypes.func.isRequired,
}

export { ToastProvider, ToastConsumer }
