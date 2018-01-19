import React, { Component } from 'react'
import PropTypes from 'prop-types'

class Input extends Component {
  constructor() {
    super()

    this.state = {
      active: false,
    }
  }

  handleSetActive = () => {
    this.setState({ active: true })
  }

  handleBlur = () => {
    this.setState({ active: false })
  }

  render() {
    const { disabled, id, type, placeholder, error, errorMessage } = this.props
    const { active } = this.state

    if (!id) {
      throw new Error('Input component must have an id attibute')
    }

    const size = 'w-100 '
    const box = 'pa3 ma0 '
    const border = 'bw1 br2 b--solid outline-0 '
    const typography = 'f6 '

    let classes = `${size} ${box} ${border} ${typography} `
    const errorMessageClasses = 'f6 bg-washed-red red '

    if (active) {
      classes += 'b--dark-gray '
    } else {
      classes += 'b--light-gray '
    }

    if (error) {
      classes += 'b--red '
    }

    if (disabled) {
      classes += 'bg-light-gray bg-silver silver '
    } else {
      classes += 'pointer bg-white '
    }

    return (
      <div>
        <input
          onClick={this.handleSetActive}
          onBlur={this.handleBlur}
          type={type}
          id={id}
          placeholder={placeholder}
          disabled={disabled}
          className={classes}
          {...this.props.htmlProps}
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
  placeholder: '',
  type: 'text',
  error: false,
  errorMessage: '',
}

Input.propTypes = {
  /** A unique id for the input. To be used with a label */
  id: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  type: PropTypes.oneOf([
    'text',
    'number',
    'date',
    'file',
    'month',
    'password',
    'time',
  ]),
  disabled: PropTypes.bool,
  error: PropTypes.bool,
  errorMessage: PropTypes.string,
  /** Extra attributes to be passed to the input */
  htmlProps: PropTypes.object,
}

export default Input
