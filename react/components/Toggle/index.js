import React, { Component } from 'react'
import PropTypes from 'prop-types'

import DenyIcon from '../icon/Deny'
import CheckIcon from '../icon/Check'

import config from 'vtex-tachyons/config.json'

class Toggle extends Component {
  render() {
    const { semantic, disabled, id, checked, label, size } = this.props

    let labelClass = 'near-black '
    let classes = 'flex items-center relative br4 bg-animate '
    let circleClasses = 'absolute br-100 '
    let iconDenyClasses = 'absolute flex justify-center '
    let iconCheckClasses = 'absolute flex justify-center '

    let circleStyle = {
      boxShadow: disabled ? 'none' : '0 0 10px rgba(0,0,0,0.2)',
      transform: 'scale(0.7)',
      transition: 'all .2s ease-out',
    }
    let iconStyle = {
      transition: 'left .2s ease-out',
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

    let checkedOffsetClass, style

    switch (size) {
      case 'small':
        style = {
          height: '1.25rem',
          width: '2.25rem',
          'min-width': '2.25rem',
        }
        circleStyle = {
          ...circleStyle,
          height: '1.25rem',
          width: '1.25rem',
          'min-width': '1.25rem',
        }
        iconStyle = {
          ...iconStyle,
          transform: 'scale(0.7)',
          width: '1.25rem',
        }

        labelClass += 'ml3 '

        checkedOffsetClass = 'left-1'

        break
      default:
        classes += 'h2 w3 '
        circleClasses += 'h2 w2 '
        iconDenyClasses += 'w2 '
        iconCheckClasses += 'w2 '

        labelClass += 'ml5 '

        checkedOffsetClass = 'left-2'
        style = {
          'min-width': '4rem',
        }
        circleStyle = {
          ...circleStyle,
          'min-width': '2rem',
        }
    }

    if (checked) {
      circleClasses += `${checkedOffsetClass} `
      iconDenyClasses += `${checkedOffsetClass} `
      iconCheckClasses += `${checkedOffsetClass} `
    } else {
      circleClasses += 'left-0 '
      iconDenyClasses += 'left-0 '
      iconCheckClasses += 'left-0 '
    }

    return (
      <label
        htmlFor={id || undefined}
        className={`flex flex-row items-center ${!disabled && 'pointer'}`}
      >
        <div className={`vtex-toggle ${classes}`} style={style}>
          <div className={circleClasses} style={circleStyle} />
          {semantic && (
            <div className={iconDenyClasses} style={iconStyle}>
              <DenyIcon color={config.colors.red} />
            </div>
          )}
          {semantic && (
            <div className={iconCheckClasses} style={iconStyle}>
              <CheckIcon color={config.colors.green} />
            </div>
          )}
        </div>
        <input
          id={id || undefined}
          type="checkbox"
          className="dn"
          disabled={disabled}
          checked={checked}
          onClick={this.props.onClick}
          onChange={this.props.onChange}
        />
        {label && <span className={labelClass}>{label}</span>}
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
}

export default Toggle
