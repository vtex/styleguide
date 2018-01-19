import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Deny from '../Icons/deny'
import Check from '../Icons/check'

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
    let circleclasses = 'absolute br-100 pa3 mh2 '
    let icondenyclasses = 'absolute mh2 left-2 dn '
    let iconcheckclasses = 'absolute mh3 dn '

    if (secondary && primary) {
      throw new Error('Toggle component cannot be primary AND secondary')
    }

    if (!secondary && !primary && !disabled && !checked) {
      classes += 'bg-red '
      icondenyclasses += 'flex o-30 '
      iconcheckclasses += 'flex o-0 '
    }

    if (!secondary && !primary && !disabled && checked) {
      classes += 'bg-green '
      icondenyclasses += 'flex o-0 '
      iconcheckclasses += 'flex o-30 '
    }

    if (primary && !checked) {
      classes += 'bg-red '
      iconcheckclasses += 'flex o-0 '
      icondenyclasses += 'flex o-30 '
    }

    if (primary && checked) {
      classes += 'bg-green '
      iconcheckclasses += 'flex o-30 '
      icondenyclasses += 'flex o-0 '
    }

    if (secondary && !checked) {
      classes += 'bg-gray '
    }

    if (secondary && checked) {
      classes += 'bg-blue '
    }

    if (checked) {
      circleclasses += 'left-2 '
    }

    if (disabled) {
      circleclasses += 'bg-mid-gray '
      classes += 'bg-silver '
    } else {
      circleclasses += 'bg-white '
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
            className={`${circleclasses}`}
          />
          <div className={icondenyclasses}>
            <Deny />
          </div>
          <div className={iconcheckclasses}>
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
