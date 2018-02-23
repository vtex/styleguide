import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Icon from '../Icon'
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
    let closeClass = ''
    let showIcon = false
    let icon = ''
    let width
    let height
    let color = config.colors['serious-black']

    switch (type) {
      case 'success': {
        showIcon = true
        classes += 'bg-washed-green '
        icon = 'success'
        color = config.colors['green']
        width = 14
        height = 14
        break
      }
      case 'error': {
        showIcon = true
        classes += 'bg-washed-red '
        icon = 'failure'
        color = config.colors['red']
        width = 14
        height = 14
        break
      }
      case 'warning': {
        showIcon = true
        classes += 'bg-washed-yellow '
        icon = 'warning'
        color = config.colors['yellow']
        width = 14
        height = 14
        break
      }
      case 'info-dark': {
        classes += 'bg-serious-black light-silver '
        color = config.colors['white']
        width = 8
        height = 8
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
            <Icon type={icon} fill={color} height={height} width={width} />
          )}

          <div className={`${showIcon ? 'ph5 flex' : 'pr5'}`}>
            {this.props.children}
          </div>
        </div>

        {onClose && (
          <div className={`pointer ${closeClass}`} onClick={onClose}>
            <Icon type="close" height={height} width={width} fill={color} />
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
