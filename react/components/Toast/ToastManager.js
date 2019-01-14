import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Toast from './Toast'
import isString from 'lodash/isString'

export default class ToastManager extends Component {
  constructor(props) {
    super(props)

    this.container = React.createRef()
  }

  state = {
    currentToast: null,
    nextToast: null,
    isToastVisible: true,
  }

  showToast = args => {
    if (isString(args)) {
      args = { message: args }
    }
    const {
      message = '',
      action,
      duration,
      horizontalPosition = 'right',
    } = args

    if (this.state.currentToast) {
      // If there is a toast present already, queue up the next toast
      // It will be displayed when the current toast is closed, on handleToastClose
      this.setState({
        nextToast: {
          message,
          action,
          duration,
          horizontalPosition,
        },
      })
      this.hideToast()
    } else {
      this.setState({
        currentToast: {
          message,
          action,
          duration,
          horizontalPosition,
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
      return {
        // If there is a toast queued up, shows it.
        // Otherwise, nextToast will be null, and state.toast will be cleared up
        currentToast: state.nextToast,
        isToastVisible: !!state.nextToast,
        nextToast: null,
        state: state.horizontalPosition,
      }
    })
  }

  getParentBounds = () => {
    const parentContainer =
      this.container.current && this.container.current.parentNode
    return (
      parentContainer &&
      parentContainer.getBoundingClientRect &&
      parentContainer.getBoundingClientRect()
    )
  }

  updateContainerBounds = () => {
    const windowBounds = {
      left: 0,
      right: window.innerWidth,
      top: 0,
      bottom: window.innerHeight,
    }

    const bounds =
      (this.props.positioning === 'parent' && this.getParentBounds()) ||
      windowBounds

    if (this.container.current) {
      this.container.current.style.left = `${bounds.left}px`
      this.container.current.style.right = `${window.innerWidth -
        bounds.right}px`
      this.container.current.style.top = `${bounds.top}px`
      this.container.current.style.bottom = `${Math.max(
        0,
        window.innerHeight - bounds.bottom
      )}px`
    }
  }

  componentDidUpdate() {
    this.updateContainerBounds()
  }

  render() {
    const { currentToast } = this.state

    return (
      <div
        className="fixed z-max overflow-hidden"
        ref={this.container}
        style={{
          pointerEvents: 'none',
        }}>
        {currentToast && (
          <Toast
            message={currentToast.message}
            action={currentToast.action}
            duration={currentToast.duration}
            visible={this.state.isToastVisible}
            onClose={this.handleToastClose}
            horizontalPosition={currentToast.horizontalPosition}
          />
        )}
      </div>
    )
  }
}

ToastManager.propTypes = {
  positioning: PropTypes.oneOf(['parent', 'window']),
}
