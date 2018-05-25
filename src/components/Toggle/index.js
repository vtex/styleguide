import React, { Component } from 'react'
import PropTypes from 'prop-types'

import DenyIcon from '../icon/Deny'
import CheckIcon from '../icon/Check'

import config from 'vtex-tachyons/config.json'

class Toggle extends Component {
  render() {
    const { semantic, disabled, id, checked, label, size } = this.props

    let classes = 'flex items-center relative br4 bg-animate '
    let circleClasses = 'absolute br-100 '
    let iconDenyClasses = 'absolute mh2 dn '
    let iconCheckClasses = 'absolute mh3 dn '

    let circleStyle = {
      boxShadow: disabled ? 'none' : '0 0 10px rgba(0,0,0,0.2)',
      transform: 'scale(0.7)',
      transition: 'all .2s ease-out',
    }

    // Background
    if (semantic) {
      if (!disabled && !checked) {
        classes += 'bg-red '
        iconDenyClasses += 'flex o-100 '
        iconCheckClasses += 'flex o-0 '
      }

      if (!disabled && checked) {
        classes += 'bg-green '
        iconDenyClasses += 'flex o-0 '
        iconCheckClasses += 'flex o-100 '
      }
    } else if (disabled) {
      classes += 'bg-light-gray '
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
        }

        circleStyle = {
          ...circleStyle,
          height: '1.25rem',
          width: '1.25rem',
        }

        checkedOffsetClass = 'left-1'

        break
      default:
        classes += 'h2 w3 '
        circleClasses += 'h2 w2 '

        checkedOffsetClass = 'left-2'
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
          <div
            className={iconDenyClasses}
            style={{
              marginLeft: '.5rem',
              transition: 'left .2s ease-out',
            }}
          >
            <DenyIcon color={config.colors.red} />
          </div>
          <div
            className={iconCheckClasses}
            style={{
              transition: 'left .2s ease-out',
            }}
          >
            <CheckIcon color={config.colors.green} />
          </div>
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
        {label && <span className="ml5">{label}</span>}
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
  /* Element size */
  size: PropTypes.oneOf(['small', 'regular']),
}

export default Toggle
