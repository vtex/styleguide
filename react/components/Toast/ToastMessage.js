import { Component } from 'react'
import PropTypes from 'prop-types'

class ToastMessage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      message: '',
    }
  }

  showToast() {
    this.props.showToast({
      message: this.props.message,
      duration: this.props.duration,
      action: this.props.action,
    })
  }

  static getDerivedStateFromProps(props, state) {
    return {
      message:
        state.message && props.message !== state.message
          ? props.message
          : state.message,
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    return (
      (nextProps.action &&
        this.props.action &&
        nextProps.action.label !== this.props.action.label) ||
      nextProps.message !== this.props.message ||
      nextState.message !== this.state.message
    )
  }

  componentDidUpdate(_, prevState) {
    if (prevState.message !== this.state.message && this.state.message) {
      this.showToast()
    }
  }

  componentDidMount() {
    if (this.props.message) {
      this.setState({
        message: this.props.message,
      })
    }
  }

  render() {
    return null
  }
}

ToastMessage.defaultProps = {
  duration: Infinity,
  message: '',
}

ToastMessage.propTypes = {
  message: PropTypes.string.isRequired,
  action: PropTypes.shape({
    label: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
  }),
  duration: PropTypes.number,
  showToast: PropTypes.func.isRequired,
  hideToast: PropTypes.func.isRequired,
}

export default ToastMessage
