import PropTypes from 'prop-types'
import React from 'react'

const validateValue = (value, min, max) => {
  if (value < min || isNaN(value) || value == null) {
    return min
  } else if (value > max) {
    return max
  }
  return value
}

const validateDisplayValue = (value, min, max) => {
  const parsedValue = parseInt(value, 10)

  if (value === '') {
    return ''
  }
  if (parsedValue < min) {
    return min
  }
  if (parsedValue > max) {
    return max
  }
  return value
}

export default class NumericStepper extends React.Component {
  state = {
    inputFocused: false,
    // used for comparison whether to trigger onChange or not
    value: 0,
    // used for temporarily invalid values during typing--specifically, when it's empty
    displayValue: 0,
  }

  static getDerivedStateFromProps(props, state) {
    const { value, minValue, maxValue } = props

    const validatedValue = validateValue(value, minValue, maxValue)

    return {
      value: validatedValue,
      ...(!state.inputFocused && {
        displayValue: validateDisplayValue(value, minValue, maxValue),
      }),
    }
  }

  changeValue(value) {
    const valueDigits = String(value).replace(/[^\d]/g, '')
    const parsedValue = parseInt(valueDigits, 10)

    const { minValue, maxValue } = this.props

    const validatedValue = validateValue(parsedValue, minValue, maxValue)

    const displayValue = validateDisplayValue(valueDigits, minValue, maxValue)

    this.setState({
      value: validatedValue,
      displayValue,
    })

    if (this.state.value !== validatedValue) {
      this.props.onChange(validatedValue)
    }
  }

  handleTypeQuantity = e => {
    this.changeValue(e.target.value)
  }

  handleIncreaseValue = () => {
    this.changeValue(this.state.value + 1)
  }

  handleDecreaseValue = () => {
    this.changeValue(this.state.value - 1)
  }

  handleFocusInput = e => {
    e.target.select()
    this.setState({ inputFocused: true })
  }

  handleBlurInput = () => {
    this.setState({
      displayValue: this.state.value,
      inputFocused: false,
    })
  }

  render() {
    const { value, displayValue } = this.state
    const { maxValue, minValue, size, block, label } = this.props

    const buttonSizeClasses = {
      'regular': 'pv3 ph5 f6',
      'large': 'pv4 ph5 f5',
      'x-large': 'pv5 ph6 f4',
    }

    const inputSizeClasses = {
      'regular': `pv3 f6 ${block ? 'flex-grow-1' : 'w3'}`,
      'large': `pv4 f5 ${block ? 'flex-grow-1' : 'w3'}`,
      'x-large': `pv5 f4 ${block ? 'flex-grow-1' : 'w4'}`,
    }

    return (
      <label>
        {label && (
          <span className="db mb3 w-100">{label}</span>
        )}
        <div className="flex self-start">
          <div className="flex-none">
            <button
              className={`br2 ba br-0 bw1 b--light-gray ${buttonSizeClasses[size]} ${
                value <= minValue
                  ? 'bg-light-silver silver'
                  : 'pointer bg-white blue'
              }`}
              style={{ borderTopRightRadius: 0, borderBottomRightRadius: 0 }}
              disabled={value <= minValue}
              onClick={this.handleDecreaseValue}>
              <span className="b">
                {/* fullwidth hyphen-minus (U+FF0D) http://graphemica.com/%EF%BC%8D */}
              &#xFF0D;
              </span>
            </button>
          </div>
          <input
            type="tel"
            className={`w3 tc bw1 ba b--light-gray br0 ${inputSizeClasses[size]}`}
            value={displayValue}
            onChange={this.handleTypeQuantity}
            onFocus={this.handleFocusInput}
            onBlur={this.handleBlurInput}
          />
          <div className="flex-none">
            <button
              className={`br2 ba bl-0 bw1 b--light-gray ${buttonSizeClasses[size]} ${
                value >= maxValue
                  ? 'bg-light-silver silver'
                  : 'pointer bg-white blue'
              }`}
              style={{ borderTopLeftRadius: 0, borderBottomLeftRadius: 0 }}
              disabled={value >= maxValue}
              onClick={this.handleIncreaseValue}>
              <span className="b">
                {/* fullwidth plus sign (U+FF0B) http://graphemica.com/%EF%BC%8B */}
              &#xFF0B;
              </span>
            </button>
          </div>
        </div>
      </label>
    )
  }
}

NumericStepper.propTypes = {
  value: PropTypes.number,
  onChange: PropTypes.func,
  minValue: PropTypes.number,
  maxValue: PropTypes.number,
  size: PropTypes.oneOf(['regular', 'large', 'x-large']),
  block: PropTypes.bool,
  label: PropTypes.string,
}

NumericStepper.defaultProps = {
  minValue: 0,
  maxValue: Infinity,
  size: 'regular',
  block: false,
}

