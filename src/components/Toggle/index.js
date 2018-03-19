import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Deny from '../Icon/Deny'
import Check from '../Icon/Check'

import config from 'vtex-tachyons/config.json'

class Toggle extends Component {
  render() {
    const { semantic, disabled, id, checked } = this.props

    let classes = 'flex items-center relative h2 w3 ph1 br4 bg-animate '
    let circleClasses = 'absolute br-100 pa3 mh2 '
    let iconDenyClasses = 'absolute mh2 dn '
    let iconCheckClasses = 'absolute mh3 dn '

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
      classes += 'bg-near-white '
    } else {
      if (!checked) {
        classes += 'bg-gray '
      }

      if (checked) {
        classes += 'bg-blue '
      }
    }

    // Circle
    if (checked) {
      circleClasses += 'left-2 '
      iconDenyClasses += 'left-2 '
      iconCheckClasses += 'left-2 '
    } else {
      circleClasses += 'left-0 '
      iconDenyClasses += 'left-0 '
      iconCheckClasses += 'left-0 '
    }

    if (disabled) {
      circleClasses += 'bg-light-gray '
    } else {
      circleClasses += 'bg-white '
    }

    return (
      <label
        htmlFor={`${id}`}
        className={`flex flex-row items-center ${!disabled && 'pointer'}`}
      >
        {this.props.children ? this.props.children : ''}
        <div className={`${classes}`}>
          <div
            style={{
              height: '1.5rem',
              width: '1.5rem',
              transition: 'all .2s ease-out',
              boxShadow: disabled ? 'none' : '0 0 10px rgba(0,0,0,0.2)',
            }}
            className={`${circleClasses}`}
          />
          <div
            className={iconDenyClasses}
            style={{
              marginLeft: '.4rem',
              transition: 'left .2s ease-out',
            }}
          >
            <Deny fill={config.colors.red} />
          </div>
          <div
            className={iconCheckClasses}
            style={{
              transition: 'left .2s ease-out',
            }}
          >
            <Check fill={config.colors.green} />
          </div>
        </div>
        <input
          id={`${id}`}
          type="checkbox"
          className="dn"
          disabled={disabled}
          checked={checked}
          onClick={this.props.onClick}
          onChange={this.props.onChange}
        />
      </label>
    )
  }
}

Toggle.defaultProps = {
  checked: false,
  disabled: false,
  semantic: false,
}

Toggle.propTypes = {
  checked: PropTypes.bool,
  semantic: PropTypes.bool,
  disabled: PropTypes.bool,
  id: PropTypes.string,
  children: PropTypes.node,
  onChange: PropTypes.func,
  onClick: PropTypes.func,
}

export default Toggle
