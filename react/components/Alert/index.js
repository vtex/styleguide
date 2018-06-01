import React, { Component } from 'react'
import PropTypes from 'prop-types'
import SuccessIcon from '../icon/Success'
import FailureIcon from '../icon/Failure'
import WarningIcon from '../icon/Warning'
import CloseIcon from '../icon/Close'
import config from 'vtex-tachyons/config.json'

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
    let showIcon = false
    let Icon = 'div'
    let color = config.colors['serious-black']

    switch (type) {
      case 'success': {
        showIcon = true
        classes += 'bg-washed-green '
        Icon = SuccessIcon
        color = config.colors['green']
        break
      }
      case 'error': {
        showIcon = true
        classes += 'bg-washed-red '
        Icon = FailureIcon
        color = config.colors['red']
        break
      }
      case 'warning': {
        showIcon = true
        classes += 'bg-washed-yellow '
        Icon = WarningIcon
        color = config.colors['yellow']
        break
      }
      default: {
        classes += 'bg-washed-blue '
        break
      }
    }

    return (
      <div className={`vtex-alert flex justify-between f5 near-black ${classes}`}>
        <div className="flex items-center">
          {showIcon && <Icon color={color} size={18} />}

          <div className={`${showIcon ? 'ph5 flex' : 'pr5'}`}>
            {this.props.children}
          </div>
        </div>

        {onClose &&
          <div className="vtex-alert__close-icon pointer flex items-center pv2" onClick={onClose}>
            <CloseIcon color={config.colors['near-black']} size={10} />
          </div>}
      </div>
    )
  }
}

Alert.propTypes = {
  /** Style of the alert */
  type: PropTypes.oneOf(['success', 'error', 'warning', 'info']),
  /** Content of the alert */
  children: PropTypes.node.isRequired,
  /** If this function is defined, a close icon will appear and this function will be called when alert is closed. */
  onClose: PropTypes.func,
  /** Time in ms to auto close the alert */
  autoClose: PropTypes.number,
}

Alert.defaultProps = {
  type: 'info',
}

export default Alert
