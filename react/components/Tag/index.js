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
    const {
      children,
      onClick,
      disabled,
      color,
      bgColor,
      type,
      variation,
    } = this.props

    const baseClasses = 'br-pill t-small pv2 ph4 dib fw5'

    let theme = ''
    const variationIsLow = variation === 'low'

    switch (type) {
      case 'success':
        theme = variationIsLow
          ? 'bg-transparent ba c-success '
          : 'bg-success c-on-success '
        break
      case 'error':
        theme = variationIsLow
          ? 'bg-transparent ba c-danger '
          : 'bg-danger c-on-danger '
        break
      case 'warning':
        theme = variationIsLow
          ? 'bg-transparent ba c-warning '
          : 'bg-warning c-on-warning '
        break
      default:
        theme = variationIsLow
          ? 'bg-transparent ba c-muted-2 '
          : 'bg-muted-2 c-on-muted-2 '
        break
    }

    const btnClasses = disabled ? 'bg-muted-4 c-muted-2 ' : 'pointer '

    let hoverClass = ''
    if (!disabled) {
      hoverClass = this.state.hover && 'o-80'
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
  variation: PropTypes.oneOf(['default', 'low']),
}

export default Tag
