import React, { Component } from 'react'
import PropTypes from 'prop-types'

import DenyIcon from '../icon/Deny'
import CheckIcon from '../icon/Check'

import config from 'vtex-tachyons/config.json'

class Toggle extends Component {
  render() {
    const {
      semantic,
      disabled,
      id,
      checked,
      label,
      size,
      helpText,
    } = this.props

    let labelClass = 'near-black '
    let classes = 'flex items-center relative br4 '
    let circleClasses = 'absolute br-100 '
    let iconDenyClasses = 'absolute flex justify-center '
    let iconCheckClasses = 'absolute flex justify-center '

    let circleStyle = {
      boxShadow: disabled ? 'none' : '0 0 10px rgba(0,0,0,0.2)',
      transform: 'scale(0.8)',
      transition: 'all .1s ease-out',
    }
    let iconStyle = {
      transition: 'left .1s ease-out, opacity .1s ease-in-out',
    }

    // Background
    if (semantic) {
      if (!disabled && !checked) {
        classes += 'bg-red '
        iconDenyClasses += 'o-100 '
        iconCheckClasses += 'o-0 '
      }

      if (!disabled && checked) {
        classes += 'bg-green '
        iconDenyClasses += 'o-0 '
        iconCheckClasses += 'o-100 '
      }
    } else if (disabled) {
      classes += 'bg-light-gray '
      labelClass += 'gray '
    } else {
      if (!checked) {
        classes += 'bg-gray '
      }

      if (checked) {
        classes += 'bg-blue '
      }
    }

    // Circle
    if (disabled) {
      circleClasses += 'bg-silver '
    } else {
      circleClasses += 'bg-white '
    }

    let style = {
      transition: 'background 100ms ease-out',
    }

    let checkedOffset

    switch (size) {
      case 'small':
        style = {
          ...style,
          height: '1.25rem',
          width: '2.25rem',
          minWidth: '2.25rem',
        }
        circleStyle = {
          ...circleStyle,
          height: '1.25rem',
          width: '1.25rem',
          minWidth: '1.25rem',
        }

        iconStyle = {
          ...iconStyle,
          transform: 'scale(0.7)',
          width: '1.25rem',
        }

        labelClass += 'ml3 '

        checkedOffset = '1rem'

        break
      default:
        classes += 'h2 '
        circleClasses += 'h2 w2 '
        iconDenyClasses += 'w2 '
        iconCheckClasses += 'w2 '

        labelClass += 'ml5 '

        style = {
          ...style,
          minWidth: '3.5rem',
        }
        circleStyle = {
          ...circleStyle,
          minWidth: '2rem',
        }

        checkedOffset = '1.5rem'
    }

    const checkedStyle = {
      left: checked ? checkedOffset : 0,
    }

    circleStyle = { ...circleStyle, ...checkedStyle }
    iconStyle = { ...iconStyle, ...checkedStyle }

    return (
      <label htmlFor={id || undefined}>
        <div className={`flex flex-row items-center ${!disabled && 'pointer'}`}>
          <div className={`vtex-toggle ${classes}`} style={style}>
            <div className={circleClasses} style={circleStyle} />
            {semantic && (
              <div className={iconDenyClasses} style={iconStyle}>
                <DenyIcon
                  size={size === 'regular' ? 14 : 12}
                  color={config.colors.red}
                />
              </div>
            )}
            {semantic && (
              <div className={iconCheckClasses} style={iconStyle}>
                <CheckIcon
                  size={size === 'regular' ? 15 : 13}
                  color={config.colors.green}
                />
              </div>
            )}
          </div>
          <input
            id={id || undefined}
            type="checkbox"
            className="h1 w1 absolute o-0"
            disabled={disabled}
            checked={checked}
            onClick={this.props.onClick}
            onChange={this.props.onChange}
            tabIndex={0}
          />
          {label && <span className={labelClass}>{label}</span>}
        </div>
        {helpText && <div className="mid-gray f6 mt3 lh-title">{helpText}</div>}
      </label>
    )
  }
}

Toggle.defaultProps = {
  checked: false,
  disabled: false,
  semantic: false,
  label: '',
  size: 'regular',
}

Toggle.propTypes = {
  checked: PropTypes.bool,
  semantic: PropTypes.bool,
  disabled: PropTypes.bool,
  id: PropTypes.string,
  label: PropTypes.string,
  onChange: PropTypes.func,
  onClick: PropTypes.func,
  size: PropTypes.oneOf(['small', 'regular']),
  helpText: PropTypes.node,
}

export default Toggle
