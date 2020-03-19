import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Input from '../Input'
import VisibilityOn from '../icon/VisibilityOn'
import VisibilityOff from '../icon/VisibilityOff'
import { withForwardedRef, refShape } from '../../modules/withForwardedRef'

class InputPassword extends Component {
  static iconSizes = {
    small: 14,
    default: 16,
    large: 18,
    'x-large': 22,
  }

  state = {
    showPassword: false,
  }

  handleToggle = () =>
    this.setState(state => ({ showPassword: !state.showPassword }))

  handleKeyDown = event => {
    if (event.key === 'Enter') {
      this.handleToggle()
    }
  }

  render() {
    const iconSize =
      InputPassword.iconSizes[this.props.size] ||
      InputPassword.iconSizes.default

    return (
      <Input
        {...this.props}
        type={this.state.showPassword ? 'text' : 'password'}
        token
        spellCheck="false"
        suffix={
          <span
            className="pointer pt2"
            onClick={this.handleToggle}
            role="button"
            tabIndex={0}
            onKeyPress={this.handleKeyDown}
          >
            {this.state.showPassword ? (
              <VisibilityOff solid size={iconSize} />
            ) : (
              <VisibilityOn solid size={iconSize} />
            )}
          </span>
        }
      />
    )
  }
}

InputPassword.propTypes = {
  /** @ignore Forwarded Ref */
  forwardedRef: refShape,
  onChange: PropTypes.func,
  size: PropTypes.string,
  value: PropTypes.string,
}

export default withForwardedRef(InputPassword)
