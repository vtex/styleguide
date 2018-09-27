import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Toast from './Toast'
import isString from 'lodash/isString'

const ToastContext = React.createContext({
  showToast: () => {},
  hideToast: () => {},
})

class ToastProvider extends Component {
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
          className="fixed bottom-0 left-0 right-0 top-0 z-5 overflow-hidden"
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
