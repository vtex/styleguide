import React, { Component } from 'react'
import PropTypes from 'prop-types'

class Alert extends Component {
  componentDidMount() {
    if (this.props.autoClose) {
      this.timeout = setTimeout(this.props.onClose, this.props.autoClose)
    }
  }

  componentWillUnmount() {
    clearTimeout(this.timeout)
  }

  render() {
    const { type, onClose } = this.props
    let classes = 'pa5 br2 '
    let closeClass = ''
    let showIcon = false

    switch (type) {
      case 'success': {
        showIcon = true
        classes += 'bg-washed-green '
        break
      }
      case 'error': {
        showIcon = true
        classes += 'bg-washed-red '
        break
      }
      case 'warning': {
        showIcon = true
        classes += 'bg-washed-yellow '
        break
      }
      case 'info-dark': {
        classes += 'bg-serious-black light-silver '
        break
      }
      default: {
        classes += 'bg-near-white '
        closeClass += 'blue '
        break
      }
    }

    return (
      <div className={`flex justify-between ${classes}`}>
        <div className="flex">
          {showIcon && <div className="">O</div>}

          <div className={`${showIcon ? 'ph5' : 'pr5'}`}>
            {this.props.children}
          </div>
        </div>

        <div className={`pointer ${closeClass}`} onClick={onClose}>
          X
        </div>
      </div>
    )
  }
}

Alert.propTypes = {
  type: PropTypes.oneOf(['success', 'error', 'warning', 'info', 'info-dark']),
  children: PropTypes.node.isRequired,
  onClose: PropTypes.func.isRequired,
  autoClose: PropTypes.number,
}

Alert.defaultProps = {
  type: 'info',
}

export default Alert
