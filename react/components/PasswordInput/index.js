import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Input from '../Input'
import VisibilityOn from '../icon/VisibilityOn'
import VisibilityOff from '../icon/VisibilityOff'

class PasswordInput extends Component {
  state = {
    showPassword: false,
  }

  toggle = () => this.setState(state => ({ showPassword: !state.showPassword }))

  render() {
    const size = this.props.size
    const iconSize = size === 'large' ? 18 : size === 'x-large' ? 22 : 16

    return (
      <Input
        {...this.props}
        type={this.state.showPassword ? 'text' : 'password'}
        suffixIcon={
          <span className="pointer pt2" onClick={() => this.toggle()}>
            {this.state.showPassword ? <VisibilityOff solid size={iconSize} /> : <VisibilityOn solid size={iconSize} />}
          </span>
        }
      />
    )
  }
}

const PasswordInputWithRef = React.forwardRef((props, ref) => <PasswordInput {...props} forwardedRef={ref} />)

PasswordInputWithRef.displayName = 'PasswordInput'

PasswordInputWithRef.propTypes = {
  onChange: PropTypes.func,
  size: PropTypes.string,
  value: PropTypes.string,
}

PasswordInput.propTypes = PasswordInputWithRef.propTypes

export default PasswordInputWithRef
