import React, { Component } from 'react'
import PropTypes from 'prop-types'

let warned = false

class Input extends Component {
  constructor(props) {
    super(props)

    if (!warned && props.htmlProps) {
      console.warn('Input prop `htmlProps` is deprecated.')
      warned = true
    }

    this.state = {
      active: false,
    }
  }

  handleChange = event => {
    this.props.onChange && this.props.onChange(event.target.value)
  };

  handleFocus = event => {
    this.setState({ active: true })
    this.props.onFocus && this.props.onFocus(event)
  };

  handleBlur = event => {
    this.setState({ active: false })
    this.props.onBlur && this.props.onBlur(event)
  };

  render() {
    const {
      errorMessage,
      disabled,
      value,
      type,
      step,
      placeholder,
      htmlProps,
    } = this.props
    const { active } = this.state

    const size = 'w-100'
    const box = 'pa3 ma0 border-box'
    const border = 'bw1 br2 b--solid outline-0'
    const typography = 'f6 near-black'
    const customClasses = htmlProps.class || ''
    let classes = `${size} ${box} ${border} ${typography} ${customClasses} `

    const eBox = 'pa2 '
    const eBorder = 'bw3 br2 b--solid b--washed-red '
    const eTypography = 'f7 dark-gray '
    const eBackground = 'bg-washed-red '
    const errorMessageClasses = `${eBox} ${eBorder} ${eTypography} ${eBackground}`

    if (active) {
      classes += 'b--dark-gray '
    } else {
      classes += 'b--light-gray '
    }

    if (errorMessage) {
      classes += 'b--red mb3 '
    }

    if (disabled) {
      classes += 'bg-light-gray bg-silver silver '
    } else {
      classes += 'bg-white '
    }

    return (
      <div>
        <input
          {...htmlProps}
          onBlur={this.handleBlur}
          onFocus={this.handleFocus}
          onChange={this.handleChange}
          className={classes}
          disabled={disabled}
          placeholder={htmlProps.placeholder || placeholder}
          type={htmlProps.type || type}
          step={htmlProps.step || step}
          value={htmlProps.value || value}
        />
        {errorMessage &&
          <div className={errorMessageClasses}>{errorMessage}</div>}
      </div>
    )
  }
}

Input.defaultProps = {
  disabled: false,
  htmlProps: {},
  errorMessage: '',
}

Input.propTypes = {
  id: PropTypes.string,
  value: PropTypes.string,
  placeholder: PropTypes.string,
  type: PropTypes.string,
  step: PropTypes.string,
  disabled: PropTypes.bool,
  onChange: PropTypes.func,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
  errorMessage: PropTypes.string,
  /** Deprecated */
  htmlProps: PropTypes.object,
}

export default Input
