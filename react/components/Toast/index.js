import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Alert from '../Alert'

class Toast extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isClosing: false,
    }
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({ isClosing: true }, () => {
        setTimeout(() => {
          this.props.onClose
        }, 3000)
      })
    }, this.props.autoClose)
  }

  render() {
    const { isClosing } = this.state
    const { onClose, message } = this.props
    return (
      <div
        style={{ animationDuration: '200ms' }}
        className={`animated ${
          isClosing ? 'fadeOutDown' : 'fadeInUp'
        } bottom-0 fixed z-5 ma7-ns mb5-s left-2-ns w-100-s w-30-ns`}
      >
        <Alert type="success" onClose={onClose}>
          {message}
        </Alert>
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
}

export default Toast
