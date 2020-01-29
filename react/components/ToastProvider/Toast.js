import React, { Component } from 'react'
import PropTypes from 'prop-types'

import CloseIcon from '../icon/Close'
import Button from '../Button'

const nextFrame = callback => {
  const FRAME_DURATION = 16
  setTimeout(callback, FRAME_DURATION)
}

const DURATION_BASE = 3000
const DURATION_INCREMENT = 30
const DURATION_ACTION_INCREMENT = 2000
const TRANSITION_DURATION = 160

export default class Toast extends Component {
  static defaultProps = {
    dismissable: true,
  }

  constructor(props) {
    super(props)
    this.state = {
      isOpen: false,
      isSingleLine: false,
    }
    this.messageElement = React.createRef()
    this.buttonElement = React.createRef()
  }

  componentDidMount() {
    if (this.props.visible) {
      // sets the open state on the next frame
      // so the opening transition will run
      nextFrame(() => this.open())

      this.startAutoClose()
    }
    this.updateButtonWrap()
  }

  // Duration increases along with the length of the message
  getDefaultDuration = () =>
    DURATION_BASE +
    this.props.message.length * DURATION_INCREMENT +
    (this.props.action ? DURATION_ACTION_INCREMENT : 0)

  startAutoClose = () => {
    this.stopAutoClose()
    const { duration } = this.props

    if (duration <= 0 || duration === Infinity) {
      return
    }

    this.autoCloseTimeout = setTimeout(
      this.close,
      this.props.duration || this.getDefaultDuration()
    )
  }

  stopAutoClose = () => {
    if (this.autoCloseTimeout == null) return

    clearTimeout(this.autoCloseTimeout)
    this.autoCloseTimeout = null
  }

  handleMouseOver = () => {
    this.stopAutoClose()
  }

  handleMouseOut = () => {
    this.startAutoClose()
  }

  handleCloseClick = () => {
    this.close()
  }

  open = () => {
    this.setState({
      isOpen: true,
    })
  }

  close = () => {
    if (!this.state.isOpen) {
      return
    }
    this.stopAutoClose()

    setTimeout(() => {
      this.props.onClose()
    }, TRANSITION_DURATION)

    this.setState({
      isOpen: false,
    })
  }

  handleActionClick = e => {
    const { isOpen } = this.state
    if (!isOpen) return

    const { action } = this.props
    const actionHandler = action && action.onClick

    if (actionHandler) {
      actionHandler(e)
    }

    this.close()
  }

  componentDidUpdate(prevProps) {
    if (!this.props.visible && prevProps.visible) {
      this.close()
    } else if (this.props.visible && !prevProps.visible) {
      this.open()
      this.startAutoClose()
    }
    if (
      this.props.message !== prevProps.message ||
      (this.props.visible && !prevProps.visible)
    ) {
      this.updateButtonWrap()
    }

    if (this.props.keepAfterUpdate) {
      this.startAutoClose()
    }
  }

  // Lets the toast to be single line on mobile
  // if the message is short enough
  updateButtonWrap() {
    this.setState(
      {
        isSingleLine: false,
      },
      () => {
        const messageWidth = this.getElementWidth(this.messageElement)
        const buttonWidth = this.getElementWidth(this.buttonElement)
        const windowWidth = window.innerWidth || 0
        const threshold = 75

        if (messageWidth != null && buttonWidth != null) {
          if (messageWidth + buttonWidth <= windowWidth - threshold) {
            this.setState({
              isSingleLine: true,
            })
          }
        }
      }
    )
  }

  getElementWidth(ref) {
    const element = ref && ref.current
    const bounds =
      element &&
      element.getBoundingClientRect &&
      element.getBoundingClientRect()
    return bounds && bounds.width
  }

  render() {
    const { isOpen, isSingleLine } = this.state
    const { action, dismissable, horizontalPosition, message } = this.props
    const hasAction = !!(
      action &&
      action.label &&
      (action.onClick || action.href)
    )

    return (
      <div
        className={`vtex-toast-container absolute bottom-0 ${horizontalPosition}-0 z-5 ma7-ns mb0-s w-100 w-auto-ns mw6-m mw-40-l`}
        onMouseOver={this.handleMouseOver}
        onMouseOut={this.handleMouseOut}
        style={{
          pointerEvents: 'all',
          transition: `transform ${TRANSITION_DURATION}ms ${
            isOpen ? 'ease-out' : 'ease-in'
          }`,
          transform: `translate3d(0, ${isOpen ? 0 : '170%'}, 0)`,
          minWidth: '18rem',
        }}>
        <div className="vtex-toast flex justify-between items-start items-center-ns t-body bg-base--inverted c-on-base--inverted pa5 br2-ns shadow-5">
          <div className={`${isSingleLine ? 'flex' : 'flex-ns'} flex-grow-1`}>
            <div className="flex items-center flex-grow-1">
              <div className="pr5 mw6-ns lh-copy" ref={this.messageElement}>
                {message}
              </div>
            </div>

            {hasAction && (
              <div className="flex flex-grow-1 justify-end items-center">
                <div className={`${isSingleLine ? 'nt4' : 'nt4-ns'} nb4`}>
                  <Button
                    ref={this.buttonElement}
                    variation="inverted-tertiary"
                    href={action.href}
                    target={action.target}
                    rel={action.rel}
                    download={action.download}
                    onClick={this.handleActionClick}>
                    {action.label}
                  </Button>
                </div>
              </div>
            )}
          </div>
          {dismissable && (
            <div className="pt2 pt0-ns">
              <div
                className="vtex-alert__close-icon pointer flex items-center pa3 white nr3 nv3"
                onClick={this.handleCloseClick}>
                <CloseIcon color="currentColor" size={16} />
              </div>
            </div>
          )}
        </div>
      </div>
    )
  }
}

Toast.propTypes = {
  onClose: PropTypes.func.isRequired,
  message: PropTypes.string.isRequired,
  horizontalPosition: PropTypes.oneOf(['left', 'right']),
  action: PropTypes.shape({
    label: PropTypes.string.isRequired,
    onClick: PropTypes.func,
    href: PropTypes.string,
    target: PropTypes.string,
    rel: PropTypes.string,
    download: PropTypes.string,
  }),
  keepAfterUpdate: PropTypes.string,
  visible: PropTypes.bool,
  duration: PropTypes.number,
  dismissable: PropTypes.bool,
}
