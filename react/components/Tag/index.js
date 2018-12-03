import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

import config from 'vtex-tachyons/config.json'
import Close from '../icon/Close'

class Tag extends PureComponent {
  constructor() {
    super()

    this.state = {
      hover: false,
    }
  }

  handleMouseEnter = () => {
    this.setState({ hover: true })
  }

  handleMouseLeave = () => {
    this.setState({ hover: false })
  }

  render() {
    const { children, onClick, disabled, color, bgColor } = this.props

    const baseClasses = 'br-pill t-small pv2 ph4 dib fw5'

    let theme = ''
    switch (this.props.type) {
      case 'success':
        theme = 'bg-success c-on-success'
        break
      case 'error':
        theme = 'bg-danger c-on-danger'
        break
      case 'warning':
        theme = 'bg-warning c-on-warning'
        break
      default:
        theme = 'bg-muted-4 c-on-base'
    }

    const btnClasses = disabled ? 'c-muted-2' : 'pointer'

    let hoverClass = ''
    if (!disabled) {
      hoverClass = this.state.hover && 'o-60'
    }

    return onClick ? (
      <button
        className={`${baseClasses} bn ${btnClasses} ${theme} ${hoverClass}`}
        style={{
          backgroundColor: bgColor,
          color: disabled ? config.semanticColors.text.disabled : color,
        }}
        disabled={disabled}
        onClick={onClick}
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}>
        <div className="flex items-stretch">
          <span>{children}</span>
          <div className="ml2 flex items-center">
            <Close color={color} size={12} />
          </div>
        </div>
      </button>
    ) : (
      <div
        className={`${baseClasses} ${theme}`}
        style={{
          backgroundColor: bgColor,
          color: color,
        }}>
        {children}
      </div>
    )
  }
}

Tag.defaultProps = {
  disabled: false,
}

Tag.propTypes = {
  type: PropTypes.oneOf(['success', 'error', 'warning']),
  children: PropTypes.node.isRequired,
  color: PropTypes.string,
  bgColor: PropTypes.string,
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
}

export default Tag
