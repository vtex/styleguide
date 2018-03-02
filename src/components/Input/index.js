import React, { Component } from 'react'
import PropTypes from 'prop-types'

class Input extends Component {
  constructor(props) {
    super(props)

    this.state = {
      active: false,
      value: props.htmlProps.value || '',
    }
  }

  handleChange = event => {
    const value = event.target.value
    this.setState({ value })
    this.props.onChange && this.props.onChange(value)
  }

  handleFocus = event => {
    this.setState({ active: true })
    this.props.onFocus && this.props.onFocus(event)
  }

  handleBlur = event => {
    this.setState({ active: false })
    this.props.onBlur && this.props.onBlur(event)
  }

  render() {
    const { error, errorMessage, disabled, htmlProps } = this.props
    const { active, value } = this.state

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

    if (error) {
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
          value={value}
        />
        {errorMessage && (
          <div className={errorMessageClasses}>{errorMessage}</div>
        )}
      </div>
    )
  }
}

Input.defaultProps = {
  disabled: false,
  htmlProps: {},
  error: false,
  errorMessage: '',
}

Input.propTypes = {
  disabled: PropTypes.bool,
  error: PropTypes.bool,
  errorMessage: PropTypes.string,
  /** Extra attributes for the input */
  htmlProps: PropTypes.object,
  onChange: PropTypes.func,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
}

export default Input
