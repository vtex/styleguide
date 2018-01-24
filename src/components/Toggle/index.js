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
    const { primary, secondary, disabled, id } = this.props

    const { checked } = this.state

    let classes = 'flex items-center relative h2 w3 ph1 br4 '
    let circleClasses = 'absolute br-100 pa3 mh2 '
    let iconDenyClasses = 'absolute mh2 left-2 dn '
    let iconCheckClasses = 'absolute mh3 dn '

    if (secondary && primary) {
      throw new Error('Toggle component cannot be primary AND secondary')
    }

    if (!secondary && !primary && !disabled && !checked) {
      classes += 'bg-red '
      iconDenyClasses += 'flex o-30 '
      iconCheckClasses += 'flex o-0 '
    }

    if (!secondary && !primary && !disabled && checked) {
      classes += 'bg-green '
      iconDenyClasses += 'flex o-0 '
      iconCheckClasses += 'flex o-30 '
    }

    if (primary && !checked) {
      classes += 'bg-red '
      iconCheckClasses += 'flex o-0 '
      iconDenyClasses += 'flex o-30 '
    }

    if (primary && checked) {
      classes += 'bg-green '
      iconCheckClasses += 'flex o-30 '
      iconDenyClasses += 'flex o-0 '
    }

    if (secondary && !checked) {
      classes += 'bg-gray '
    }

    if (secondary && checked) {
      classes += 'bg-blue '
    }

    if (checked) {
      circleClasses += 'left-2 '
    }

    if (disabled) {
      circleClasses += 'bg-mid-gray '
      classes += 'bg-silver '
    } else {
      circleClasses += 'bg-white '
    }

    return (
      <label
        htmlFor={`toggle-${id}`}
        className="flex flex-row items-center"
        {...this.props.htmlProps}
      >
        {this.props.children}
        <div className={`${classes}`}>
          <div
            style={{
              height: '1.5rem',
              width: '1.5rem',
            }}
            className={`${circleClasses}`}
          />
          <div className={iconDenyClasses}>
            <Deny />
          </div>
          <div className={iconCheckClasses}>
            <Check />
          </div>
        </div>
        <input
          id={id}
          type="checkbox"
          className="dn"
          name={`toggle-${id}`}
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
  children: PropTypes.node.isRequired,
  disabled: PropTypes.bool,
  id: PropTypes.string,
  htmlProps: PropTypes.object,
  primary: PropTypes.bool,
  secondary: PropTypes.bool,
}

export default Toggle
