import React, { Component } from 'react'
import PropTypes from 'prop-types'

import './edge.global.css'

const normalizeMin = min => (min == null ? -Infinity : min)
const normalizeMax = max => (max == null ? Infinity : max)

const validateValue = (value, min, max, defaultValue) => {
  // This function always return a valid numeric value from the current input.
  // Compare with the function validateDisplayValue
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
  // This function validates the input as the user types
  // It allows for temporarily invalid values (namely, empty string and minus sign without a number following it)
  // However, it prevents values out of boundaries, and invalid characters, e.g. letters

  min = normalizeMin(min)
  max = normalizeMax(max)

  const parsedValue = parseInt(value, 10)

  if (value === '') {
    return value
  }
  // Only allows typing the negative sign if negative values are allowed
  if (value === '-' && min < 0) {
    return value
  }
  if (isNaN(parsedValue)) {
    return ''
  }
  // Only limit by lower bounds if the min value is 1
  // Otherwise, it could prevent typing, for example, 10 if the min value is 2
  if (parsedValue < min && min === 1) {
    return min
  }
  if (parsedValue > max) {
    return max
  }
  return parsedValue
}

class NumericStepper extends Component {
  state = {
    inputFocused: false,
    // used for comparison whether to trigger onChange or not
    value: 0,
    // used for temporarily invalid values during typing--specifically, when it's empty
    displayValue: 0,
  }

  componentDidMount() {
    if (this.props.size === 'x-large') {
      console.warn(
        'NumericStepper: The value "x-large" for the prop "size" is deprecated. In the next major version, it will be equivalent to "large", and removed altogether in future versions'
      )
    }
  }

  static getDerivedStateFromProps(props, state) {
    const { value, minValue, maxValue, defaultValue } = props

    const validatedValue = validateValue(
      value,
      minValue,
      maxValue,
      defaultValue
    )

    return {
      value: validatedValue,
      ...(!state.inputFocused && {
        displayValue: validateDisplayValue(value, minValue, maxValue),
      }),
    }
  }

  changeValue = (value, event) => {
    const parsedValue = parseInt(value, 10)

    const { minValue, maxValue, defaultValue, onChange } = this.props

    const validatedValue = validateValue(
      parsedValue,
      minValue,
      maxValue,
      defaultValue
    )

    const displayValue = validateDisplayValue(value, minValue, maxValue)

    this.setState({
      value: validatedValue,
      displayValue,
    })

    if (this.state.value !== validatedValue && onChange) {
      // React synthetic events are reused for performance reasons.
      // New properties added to it are never released.
      // Calling event.persist() releases the event from the pool
      // https://reactjs.org/docs/events.html#event-pooling
      event.persist()
      event.value = validatedValue
      onChange(event)
    }
  }

  handleTypeQuantity = event => {
    this.changeValue(event.target.value, event)
  }

  handleIncreaseValue = event => {
    this.changeValue(this.state.value + 1, event)
  }

  handleDecreaseValue = event => {
    this.changeValue(this.state.value - 1, event)
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
    const { maxValue, minValue, size, block, label, lean } = this.props

    const isMin = value <= normalizeMin(minValue)
    const isMax = value >= normalizeMax(maxValue)

    let labelClasses = ''
    let buttonClasses = ''
    let inputClasses = ''

    switch (size) {
      case 'small': {
        buttonClasses += `h-small ${lean ? 'f4' : 'f6'} `
        const inputWidth = lean ? 'w1' : 'w3'
        inputClasses += `h-small t-small ${block ? 'flex-grow-1' : inputWidth} `
        labelClasses += 't-small '
        break
      }
      case 'large': {
        buttonClasses += `h-large ${lean ? 'f3' : 'f5'} `
        const inputWidth = lean ? 'w2' : 'w3'
        inputClasses += `h-large t-body ${block ? 'flex-grow-1' : inputWidth} `
        labelClasses += 't-body '
        break
      }
      case 'x-large': {
        // DEPRECATED
        buttonClasses += `pv5 ${lean ? 'f2' : 'f4'} `
        const inputWidth = lean ? 'w3' : 'w4'
        inputClasses += `pv5 t-body ${block ? 'flex-grow-1' : inputWidth} `
        labelClasses += 't-body '
        break
      }
      default: {
        buttonClasses += `h-regular ${lean ? 'f4' : 'f6'} `
        const inputWidth = lean ? 'w2' : 'w3'
        inputClasses += `h-regular t-small ${
          block ? 'flex-grow-1' : inputWidth
        } `
        labelClasses += 't-small '
        break
      }
    }

    const borderClasses = lean ? 'bn ' : 'ba b--muted-4 bw1 '

    const buttonDisabledClasses = lean
      ? 'c-disabled bg-transparent '
      : 'bg-muted-5 c-disabled o-100 '

    const buttonEnabledClasses = `pointer bg-base c-action-primary ${
      lean ? 'outline-0' : ''
    } `

    const content = (
      <React.Fragment>
        {label && (
          <span className={`db mb3 w-100 c-on-base ${labelClasses}`}>
            {label}
          </span>
        )}
        <div className="flex self-start">
          {lean ? (
            <div
              className={`order-1 flex items-center justify-center ${inputClasses}`}>
              {displayValue}
            </div>
          ) : (
            <input
              type="tel"
              className={`z-1 order-1 tc bw1 ${borderClasses} br0 ${inputClasses} hide-edge-input-decorations`}
              style={{
                ...(block && {
                  width: 0,
                }),
                WebkitAppearance: 'none',
                MsClear: { display: 'none' },
              }}
              value={displayValue}
              onChange={this.handleTypeQuantity}
              onFocus={this.handleFocusInput}
              onBlur={this.handleBlurInput}
            />
          )}
          <div className="z-2 order-2 flex-none">
            <button
              className={`br2 pa0 bl-0 flex items-center justify-center ${borderClasses} ${buttonClasses} ${
                isMax ? buttonDisabledClasses : buttonEnabledClasses
              }`}
              style={{
                borderTopLeftRadius: 0,
                borderBottomLeftRadius: 0,
                width: lean ? '2em' : '3em',
                transition: 'opacity 150ms',
              }}
              disabled={isMax}
              aria-label="+"
              tabIndex={0}
              onClick={this.handleIncreaseValue}>
              <div className="b">
                {/* fullwidth plus sign (U+FF0B) http://graphemica.com/%EF%BC%8B */}
                ＋
              </div>
            </button>
          </div>
          <div className="z-2 order-0 flex-none">
            <button
              className={`br2 pa0 br-0 flex items-center justify-center ${borderClasses} ${buttonClasses} ${
                isMin ? buttonDisabledClasses : buttonEnabledClasses
              }`}
              style={{
                borderTopRightRadius: 0,
                borderBottomRightRadius: 0,
                width: lean ? '2em' : '3em',
                transition: 'opacity 150ms',
              }}
              disabled={isMin}
              aria-label="−"
              // This is a minus sign (U+2212), not a regular hyphen (-, U+002D),
              // which is the default keyboard character.
              // Used for screen readers.
              tabIndex={0}
              onClick={this.handleDecreaseValue}>
              <span className="b">
                {/* fullwidth hyphen-minus (U+FF0D) http://graphemica.com/%EF%BC%8D */}
                －
              </span>
            </button>
          </div>
        </div>
      </React.Fragment>
    )

    // Refrain from using label tag if not needed, to prevent
    // iOS from focusing on the text field and popping up the
    // keyboard when increment/decrement is pressed
    if (label && !lean) {
      return <label>{content}</label>
    }
    return <div>{content}</div>
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
  size: PropTypes.oneOf(['small', 'regular', 'large']),
  /** Block or default size. */
  block: PropTypes.bool,
  /** Input label */
  label: PropTypes.string,
  /** Lean mode, with subtler styling */
  lean: PropTypes.bool,
}

NumericStepper.defaultProps = {
  minValue: 0,
  maxValue: Infinity,
  defaultValue: 0,
  size: 'regular',
  block: false,
}

export default NumericStepper
