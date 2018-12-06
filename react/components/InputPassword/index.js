import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Input from '../Input'
import VisibilityOn from '../icon/VisibilityOn'
import VisibilityOff from '../icon/VisibilityOff'

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

  toggle = () => this.setState(state => ({ showPassword: !state.showPassword }))

  render() {
    const iconSize =
      InputPassword.iconSizes[this.props.size] ||
      InputPassword.iconSizes.default

    return (
      <Input
        {...this.props}
        type={this.state.showPassword ? 'text' : 'password'}
        suffix={
          <span className="pointer pt2" onClick={() => this.toggle()}>
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

const InputPasswordWithRef = React.forwardRef((props, ref) => (
  <InputPassword {...props} forwardedRef={ref} />
))

InputPasswordWithRef.displayName = 'InputPassword'

InputPasswordWithRef.propTypes = {
  onChange: PropTypes.func,
  size: PropTypes.string,
  value: PropTypes.string,
}

InputPassword.propTypes = InputPasswordWithRef.propTypes

export default InputPasswordWithRef
