import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Close from '../Icons/Close'
import Success from '../Icons/Success'
import Error from '../Icons/Error'
import Warning from '../Icons/Warning'

class Alert extends Component {
  componentDidMount() {
    if (this.props.autoClose && this.props.onClose) {
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
    let Icon = <div />

    switch (type) {
      case 'success': {
        showIcon = true
        classes += 'bg-washed-green '
        Icon = Success
        break
      }
      case 'error': {
        showIcon = true
        classes += 'bg-washed-red '
        Icon = Error
        break
      }
      case 'warning': {
        showIcon = true
        classes += 'bg-washed-yellow '
        Icon = Warning
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
        <div className="flex items-center">
          {showIcon && (
            <div className="flex">
              <Icon />
            </div>
          )}

          <div className={`${showIcon ? 'ph5 flex' : 'pr5'}`}>
            {this.props.children}
          </div>
        </div>

        {onClose && (
          <div className={`pointer ${closeClass}`} onClick={onClose}>
            <Close />
          </div>
        )}
      </div>
    )
  }
}

Alert.propTypes = {
  type: PropTypes.oneOf(['success', 'error', 'warning', 'info', 'info-dark']),
  children: PropTypes.node.isRequired,
  onClose: PropTypes.func,
  autoClose: PropTypes.number,
}

Alert.defaultProps = {
  type: 'info',
}

export default Alert
