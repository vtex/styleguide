import PropTypes from 'prop-types'
import React from 'react'

const normalizeMin = min => min == null ? -Infinity : min
const normalizeMax = max => max == null ? Infinity : max

const validateValue = (value, min, max, defaultValue) => {
  min = normalizeMin(min)
  max = normalizeMax(max)

  if (isNaN(value) || value == null) {
    if (defaultValue < min) return min
    if (defaultValue > max) return max
    return defaultValue
  } else if (value < min) {
    return min
  } else if (value > max) {
    return max
  }
  return parseInt(value, 10)
}

const validateDisplayValue = (value, min, max) => {
  min = normalizeMin(min)
  max = normalizeMax(max)

  const parsedValue = parseInt(value, 10)

  if (value === '') {
    return value
  }
  if (value === '-' && min < 0) {
    return value
  }
  if (isNaN(parsedValue)) {
    return ''
  }
  if (parsedValue < min) {
    return min
  }
  if (parsedValue > max) {
    return max
  }
  return parsedValue
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
    const { value, minValue, maxValue, defaultValue } = props

    const validatedValue = validateValue(value, minValue, maxValue, defaultValue)

    return {
      value: validatedValue,
      ...(!state.inputFocused && {
        displayValue: validateDisplayValue(value, minValue, maxValue),
      }),
    }
  }

  changeValue = value => {
    const parsedValue = parseInt(value, 10)

    const { minValue, maxValue, defaultValue, onChange } = this.props

    const validatedValue = validateValue(parsedValue, minValue, maxValue, defaultValue)

    const displayValue = validateDisplayValue(value, minValue, maxValue)

    this.setState({
      value: validatedValue,
      displayValue,
    })

    if (this.state.value !== validatedValue) {
      onChange && onChange(validatedValue)
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

    const isMin = value <= normalizeMin(minValue)
    const isMax = value >= normalizeMax(maxValue)

    const buttonSizeClasses = {
      'regular': 'pv3 f6',
      'large': 'pv4 f5',
      'x-large': 'pv5 f4',
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
          <input
            type="tel"
            className={`z-1 order-1 w3 tc bw1 ba b--light-gray br0 ${inputSizeClasses[size]}`}
            value={displayValue}
            onChange={this.handleTypeQuantity}
            onFocus={this.handleFocusInput}
            onBlur={this.handleBlurInput}
          />
          <div className="z-2 order-2 flex-none">
            <button
              className={`br2 ph0 tc ba bl-0 bw1 b--light-gray ${buttonSizeClasses[size]} ${
                isMax
                  ? 'bg-light-silver silver'
                  : 'pointer bg-white blue'
              }`}
              style={{
                borderTopLeftRadius: 0,
                borderBottomLeftRadius: 0,
                width: '3em',
              }}
              disabled={isMax}
              aria-label="+"
              onClick={this.handleIncreaseValue}>
              <span className="b">
                {/* fullwidth plus sign (U+FF0B) http://graphemica.com/%EF%BC%8B */}
                &#xFF0B;
              </span>
            </button>
          </div>
          <div className="z-2 order-0 flex-none">
            <button
              className={`br2 ph0 ba br-0 bw1 b--light-gray ${buttonSizeClasses[size]} ${
                isMin
                  ? 'bg-light-silver silver'
                  : 'pointer bg-white blue'
              }`}
              style={{
                borderTopRightRadius: 0,
                borderBottomRightRadius: 0,
                width: '3em',
              }}
              disabled={isMin}
              aria-label="−"
              {...{/* This is a minus sign (U+2212), not a regular hyphen (-, U+002D), which is the default keyboard character.
                Used for screen readers. */}}
              onClick={this.handleDecreaseValue}>
              <span className="b">
                {/* fullwidth hyphen-minus (U+FF0D) http://graphemica.com/%EF%BC%8D */}
                &#xFF0D;
              </span>
            </button>
          </div>
        </div>
      </label>
    )
  }
}

NumericStepper.propTypes = {
  /** Value of the input */
  value: PropTypes.number,
  /** onChange event handler */
  onChange: PropTypes.func.isRequired,
  /** Minimum value (will be the default value in case of invalid input, e.g. letters).
    Set to null or -Infinity in case there is no miminum. Default is 0.
  */
  minValue: PropTypes.number,
  /** Maximum value (null or Infinity in case there is no maximum. Default is Infinity) */
  maxValue: PropTypes.number,
  /** Default value in case of invalid input (e.g. letters) and there is no minimum value */
  defaultValue: PropTypes.number,
  /** Input size */
  size: PropTypes.oneOf(['regular', 'large', 'x-large']),
  /** Block or default size. */
  block: PropTypes.bool,
  /** Input label */
  label: PropTypes.string,
}

NumericStepper.defaultProps = {
  minValue: 0,
  maxValue: Infinity,
  defaultValue: 0,
  size: 'regular',
  block: false,
}

