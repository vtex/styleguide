import React, { Component } from 'react'
import PropTypes from 'prop-types'
import CloseIcon from '../icon/Close'

const nextFrame = callback => {
  const FRAME_DURATION = 16
  setTimeout(callback, FRAME_DURATION)
}

const DURATION_BASE = 3000
const DURATION_INCREMENT = 30
const TRANSITION_DURATION = 160

export default class Toast extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isOpen: false,
    }
  }

  componentDidMount() {
    if (this.props.visible) {
      // sets the open state on the next frame
      // so the opening transition will run
      nextFrame(() => this.open())

      this.startAutoClose()
    }
  }

  // Duration increases along with the length of the message
  getDefaultDuration = () => DURATION_BASE + this.props.message.length * DURATION_INCREMENT

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

  handleActionClick = () => {
    const { isOpen } = this.state
    if (!isOpen) return

    const { action } = this.props
    const actionHandler = action && action.onClick

    if (actionHandler) {
      actionHandler()
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
  }

  render() {
    const { isOpen } = this.state
    const { onClose, message, action } = this.props
    const hasAction = !!(action && action.onClick && action.label)

    return (
      <div
        className="absolute bottom-0 left-0 z-5 ma7-ns mb0-s w-100 w-auto-ns mw6-m mw-40-l"
        onMouseOver={this.handleMouseOver}
        onMouseOut={this.handleMouseOut}
        style={{
          pointerEvents: 'all',
          transition: `transform ${TRANSITION_DURATION}ms ${isOpen ? 'ease-out' : 'ease-in'}`,
          transform: `translate3d(0, ${isOpen ? 0 : '170%'}, 0)`,
          minWidth: '18rem',
        }}
      >
        <div
          className="vtex-toast flex justify-between items-start items-center-ns f5 bg-base--inverted c-on-base--inverted pa5 br2-ns shadow-5"
        >
          <div className="flex-ns flex-grow-1">
            <div className="flex items-center flex-grow-1">
              <div className="pr5 mw6-ns lh-copy">
                {message}
              </div>
            </div>

            {hasAction && (
              <div className="flex flex-grow-1 justify-end items-center">
                <div className="nt4-ns nb4">
                  <button className="ttu bg-transparent b--transparent c-on-base--inverted bw1 ba fw5 ttu br2 fw4 v-mid relative pv4 pl5 pr4 pointer" onClick={this.handleActionClick}>
                    {action.label}
                  </button>
                </div>
              </div>
            )}
          </div>
          {onClose && (
            <div className="pt2 pt0-ns">
              <div
                className="vtex-alert__close-icon pointer flex items-center pa3 white nr3 nv3"
                onClick={this.handleCloseClick}
              >
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
  action: PropTypes.shape({
    label: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
  }),
  visible: PropTypes.bool,
  duration: PropTypes.number,
}

