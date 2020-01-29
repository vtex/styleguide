import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import isString from 'lodash/isString'

import Toast from './Toast'

export default class ToastManager extends Component {
  constructor(props) {
    super(props)

    this.container = React.createRef()
  }

  state = {
    currentToast: null,
    nextToast: null,
    isToastVisible: false,
  }

  showToast = args => {
    if (isString(args)) {
      args = { message: args }
    }
    const {
      message = '',
      action,
      dismissable,
      duration,
      horizontalPosition = 'left',
      keepAfterUpdate = false,
    } = args

    if (this.state.currentToast && !keepAfterUpdate) {
      // If there is a toast present already, queue up the next toast
      // It will be displayed when the current toast is closed, on handleToastClose
      this.setState({
        nextToast: {
          message,
          action,
          dismissable,
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
          dismissable,
          duration,
          horizontalPosition,
          keepAfterUpdate,
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
    const { children } = this.props
    const { currentToast } = this.state

    return (
      <Fragment>
        {children({
          showToast: this.showToast,
          hideToast: this.hideToast,
          state: this.state,
        })}
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
              dismissable={currentToast.dismissable}
              horizontalPosition={currentToast.horizontalPosition}
              keepAfterUpdate={currentToast.keepAfterUpdate}
              visible={this.state.isToastVisible}
              onClose={this.handleToastClose}
            />
          )}
        </div>
      </Fragment>
    )
  }
}

ToastManager.propTypes = {
  positioning: PropTypes.oneOf(['parent', 'window']),
  children: PropTypes.func.isRequired,
}
