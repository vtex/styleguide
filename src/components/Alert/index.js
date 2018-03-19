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
    let closeBtnColor = 'near-black'

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
      case 'info-dark': {
        classes += 'bg-serious-black light-silver '
        color = config.colors['white']
        closeBtnColor = config.colors['white']
        break
      }
      default: {
        classes += 'bg-washed-blue '
        break
      }
    }

    return (
      <div className={`flex justify-between f6 near-black ${classes}`}>
        <div className="flex items-center">
          {showIcon && <Icon fill={color} height={18} width={18} />}

          <div className={`${showIcon ? 'ph5 flex' : 'pr5'}`}>
            {this.props.children}
          </div>
        </div>

        {onClose &&
          <div className="pointer flex items-center pv2" onClick={onClose}>
            <CloseIcon height={10} width={10} fill={closeBtnColor} />
          </div>}
      </div>
    )
  }
}

Alert.propTypes = {
  /** Style of the alert */
  type: PropTypes.oneOf(['success', 'error', 'warning', 'info', 'info-dark']),
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
