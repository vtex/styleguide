import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Deny from '../Icons/Deny'
import Check from '../Icons/Check'

class Toggle extends Component {
  constructor(props) {
    super(props)

    this.state = {
      checked: props.checked,
    }
  }

  handleCheck = () =>
    !this.props.disabled && this.setState({ checked: !this.state.checked })

  render() {
    const { semantic, disabled, id } = this.props

    const { checked } = this.state

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
        {...this.props.htmlProps}
      >
        {this.props.children}
        <div className={`${classes}`}>
          <div 
            style={{
              height: '1.5rem',
              width: '1.5rem',
              transition: 'all .2s ease-out',
              boxShadow: disabled ? 'none' : '0 0 10px rgba(0,0,0,0.2)'
            }}
            className={`${circleClasses}`} 
          > 
          </div> 
          <div
            className={iconDenyClasses}
            style={{
              marginLeft: '.4rem',
              transition: 'left .2s ease-out' 
            }}>
            {/* @todo hardcoded color because Tachyons doesn't expose these as variables */}
            <Deny fill="#ff8080"/>
          </div>
          <div
            className={iconCheckClasses}
            style={{
              transition: 'left .2s ease-out'
            }}>
            {/* @todo hardcoded color because Tachyons doesn't expose these as variables */}
            <Check fill="#8bc34a"/> 
          </div>
        </div>
        <input
          id={`${id}`} 
          type="checkbox"
          className="o-0" 
          disabled={disabled}
          checked={this.state.checked}
          onClick={this.handleCheck}
        />
      </label>
    )
  }
}

Toggle.defaultProps = {
  checked: false,
  disabled: false,
  htmlProps: {},
  primary: false,
  secondary: false,
}

Toggle.propTypes = {
  checked: PropTypes.bool,
  disabled: PropTypes.bool,
  id: PropTypes.string,
  htmlProps: PropTypes.object, 
  primary: PropTypes.bool,
  secondary: PropTypes.bool,
}

export default Toggle
