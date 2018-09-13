import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import Button from '../Button'
import CloseIcon from '../icon/Close'

let container = null

class Toast extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isOpen: false,
    }

    this.transitionDuration = 180
  }

  componentDidMount() {
    if (this.props.visible) {
      setTimeout(() => {
        this.open()
      }, 10)

      this.startAutoClose()
    }
  }

  startAutoClose = () => {
    this.stopAutoClose()
    this.autoCloseTimeout = setTimeout(this.close, 3000)
  }

  stopAutoClose = () => {
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

  close = () => {
    setTimeout(() => {
      this.props.onClose()
    }, this.transitionDuration)

    this.setState({
      isOpen: false,
    })
  }

  open = () => {
    this.setState({
      isOpen: true,
    })
  }

  componentDidUpdate(prevProps, prevState) {
    if (!this.props.visible && prevProps.visible) {
      this.close()
      this.stopAutoClose()
    } else if (this.props.visible && !prevProps.visible) {
      this.open()
      this.startAutoClose()
    }
  }

  render() {
    const { isOpen } = this.state
    const { onClose, message, action } = this.props
    const handleActionClick = (action && action.onClick) || undefined

    return (
      <div
        className="absolute bottom-0 left-0 z-5 ma7-ns mb0-s w-100 w-30-ns"
        onMouseOver={this.handleMouseOver}
        onMouseOut={this.handleMouseOut}
        style={{
          pointerEvents: 'all',
          transition: `transform ${this.transitionDuration}ms ${isOpen ? 'ease-out' : 'ease-in'}`,
          transform: `translate3d(0, ${isOpen ? 0 : '170%'}, 0)`,
        }}
      >
        <div
          className="vtex-alert flex justify-between f5 bg-near-black white pa5 br2-ns shadow-5"
        >
          <div className="flex-ns flex-grow-1">
            <div className="flex items-center flex-grow-1">
              <div className="pr5">
                {message}
              </div>
            </div>

            {action &&
              action.onClick &&
              action.label && (
                <div className="flex flex-grow-1 justify-end">
                  <div className="nt4-ns nb4">
                    <Button variation="tertiary" onClick={handleActionClick}>
                      {action.label}
                    </Button>
                  </div>
                </div>
              )}
          </div>
          {onClose && (
            <div
              className="vtex-alert__close-icon pointer flex items-center pa3 white nr3 nv3"
              onClick={this.handleCloseClick}
            >
              <CloseIcon color="currentColor" size={10} />
            </div>
          )}
        </div>
      </div>
    )
  }
}

Toast.defaultProps = {
  autoClose: 3000,
}

Toast.propTypes = {
  autoClose: PropTypes.number,
  onClose: PropTypes.func.isRequired,
  message: PropTypes.string.isRequired,
  action: PropTypes.shape({
    label: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
  }),
  visible: PropTypes.bool,
}

class ToastContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      toast: null,
      nextToast: null,
      toastVisible: true,
    }
  }

  componentDidMount() {
    container = this
  }

  componentWillUnmount() {
    container = null
  }

  showToast = (message, action) => {
    console.log({ action })
    if (this.state.toast) {
      this.setState({
        nextToast: {
          message,
          action,
        },
      })
      this.hideToast()
    } else {
      this.setState({
        toast: {
          message,
          action,
        },
        toastVisible: true,
      })
    }
  }

  hideToast = () => {
    this.setState({
      toastVisible: false,
    })
  }

  handleToastClose = () => {
    this.setState(state => {
      return ({
        toast: state.nextToast,
        toastVisible: !!state.nextToast,
        nextToast: null,
      })
    })
  }

  render() {
    const { toast } = this.state
    return (
      <div
        className="fixed bottom-0 left-0 right-0 top-0 z-5 pl5 pb5 pl7-ns pb7-ns overflow-hidden"
        style={{
          pointerEvents: 'none',
        }}
      >
        {this.state.toast && (
          <Toast
            message={toast.message}
            action={toast.action}
            visible={this.state.toastVisible}
            onClose={this.handleToastClose}
          />
        )}
      </div>
    )
  }
}

const showToast = (message, action) => {
  container && container.showToast(message, action)
}

export { showToast, ToastContainer }
