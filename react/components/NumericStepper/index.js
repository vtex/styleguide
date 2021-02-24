import React, { Component } from 'react'
import PropTypes from 'prop-types'

import styles from '../Input/Input.css'

const normalizeMin = (min) => (min == null ? -Infinity : min)
const normalizeMax = (max) => (max == null ? Infinity : max)

const validateValue = (
  value,
  min,
  max,
  defaultValue,
  unitMultiplier,
  isTyping
) => {
  // This function always return a valid numeric value from the current input.
  // Compare with the function validateDisplayValue
  min = normalizeMin(min)
  max = normalizeMax(max)

  if (isNaN(value) || value == null) {
    if (defaultValue < min) return min
    if (defaultValue > max) return max
    return defaultValue
  }

  const parsedValue = parseFloat(value, 10)

  let normalizedValue

  if (isTyping) {
    normalizedValue = Math.round(parsedValue / unitMultiplier)
  } else {
    normalizedValue = parsedValue
  }

  if (normalizedValue < min) {
    return min
  } else if (normalizedValue > max) {
    return max
  }

  return normalizedValue
}

const formattedDisplayValue = (value, unitMultiplier, suffix, isTyping) => {
  const parsedSuffix = suffix ? ` ${suffix}` : suffix

  if (!isTyping) {
    const multipliedValue = Math.round(value * unitMultiplier * 100) / 100
    return `${multipliedValue}${parsedSuffix}`
  }

  return `${value}${parsedSuffix}`
}

const validateDisplayValue = (
  value,
  min,
  max,
  suffix,
  unitMultiplier,
  isTyping
) => {
  // This function validates the input as the user types
  // It allows for temporarily invalid values (namely, empty string and minus sign without a number following it)
  // However, it prevents values out of boundaries, and invalid characters, e.g. letters

  min = normalizeMin(min) * unitMultiplier
  max = normalizeMax(max) * unitMultiplier

  const parsedValue = parseFloat(value)

  if (value === '') {
    return formattedDisplayValue(value, unitMultiplier, suffix, isTyping)
  }
  // Only allows typing the negative sign if negative values are allowed
  if (typeof value === 'string' && value.startsWith('-') && min < 0) {
    return formattedDisplayValue(value, unitMultiplier, suffix, isTyping)
  }
  if (isNaN(parsedValue)) {
    return ''
  }
  // Only limit by lower bounds if the min value is 1
  // Otherwise, it could prevent typing, for example, 10 if the min value is 2
  if (parsedValue < min && min === 1) {
    return formattedDisplayValue(min, unitMultiplier, suffix, isTyping)
  }
  if (parsedValue > max) {
    return formattedDisplayValue(max, unitMultiplier, suffix, isTyping)
  }
  return formattedDisplayValue(parsedValue, unitMultiplier, suffix, isTyping)
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
    const {
      value,
      minValue,
      maxValue,
      defaultValue,
      suffix,
      unitMultiplier,
    } = props

    const validatedValue = validateValue(
      value,
      minValue,
      maxValue,
      defaultValue,
      unitMultiplier,
      false
    )

    return {
      value: validatedValue,
      ...(!state.inputFocused && {
        displayValue: validateDisplayValue(
          validatedValue,
          minValue,
          maxValue,
          suffix,
          unitMultiplier,
          false
        ),
      }),
    }
  }

  changeValue = (value, event, isTyping) => {
    const parsedValue = parseFloat(value, 10)

    const {
      minValue,
      maxValue,
      defaultValue,
      onChange,
      suffix,
      unitMultiplier,
    } = this.props

    const validatedValue = validateValue(
      parsedValue,
      minValue,
      maxValue,
      defaultValue,
      unitMultiplier,
      isTyping
    )

    const displayValue = validateDisplayValue(
      isTyping ? value : validatedValue,
      minValue,
      maxValue,
      suffix,
      unitMultiplier,
      isTyping
    )

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

  handleTypeQuantity = (event) => {
    this.changeValue(event.target.value, event, true)
  }

  handleIncreaseValue = (event) => {
    this.changeValue(this.state.value + 1, event, false)
  }

  handleDecreaseValue = (event) => {
    this.changeValue(this.state.value - 1, event, false)
  }

  handleFocusInput = (e) => {
    e.target.select()
    this.setState({ inputFocused: true })
  }

  handleBlurInput = () => {
    const { minValue, maxValue, unitMultiplier, suffix } = this.props

    const displayValue = validateDisplayValue(
      this.state.value,
      minValue,
      maxValue,
      suffix,
      unitMultiplier,
      false
    )

    this.setState({
      displayValue,
      inputFocused: false,
    })
  }

  render() {
    const { value, displayValue } = this.state
    const {
      maxValue,
      minValue,
      unitMultiplier,
      size,
      block,
      label,
      lean,
      readOnly,
    } = this.props

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
        inputClasses += `h-regular t-body ${
          block ? 'flex-grow-1' : inputWidth
        } `
        labelClasses += 't-small '
        break
      }
    }

    if (lean) inputClasses += 'br2 hover-b--muted-4 ba outline-transparent'

    const borderClasses = lean ? 'b--transparent ' : 'ba b--muted-4 bw1 '

    const buttonDisabledClasses = lean
      ? 'c-disabled bg-transparent '
      : 'bg-muted-5 c-disabled o-100 '

    const buttonEnabledClasses = `pointer bg-base c-action-primary ${
      lean ? 'outline-0' : ''
    } `

    const content = (
      <React.Fragment>
        {label && (
          <span
            className={`vtex-numeric-stepper__label numeric-stepper__label db mb3 w-100 c-on-base ${labelClasses}`}>
            {label}
          </span>
        )}
        <div className="vtex-numeric-stepper-container numeric-stepper-container flex self-start">
          <input
            type="tel"
            readOnly={readOnly}
            className={`vtex-numeric-stepper__input numeric-stepper__input z-1 order-1 tc bw1 ${borderClasses} br0 ${inputClasses} ${styles.hideDecorators}`}
            style={{
              ...(block && {
                width: 0,
              }),
              WebkitAppearance: 'none',
            }}
            value={displayValue}
            step={unitMultiplier}
            onChange={this.handleTypeQuantity}
            onFocus={this.handleFocusInput}
            onBlur={this.handleBlurInput}
          />
          <div className="vtex-numeric-stepper__plus-button-container numeric-stepper__plus-button-container z-2 order-2 flex-none">
            <button
              type="button"
              className={`vtex-numeric-stepper__plus-button numeric-stepper__plus-button br2 pa0 bl-0 flex items-center justify-center ${borderClasses} ${buttonClasses} ${
                readOnly || isMax ? buttonDisabledClasses : buttonEnabledClasses
              }`}
              style={{
                borderTopLeftRadius: 0,
                borderBottomLeftRadius: 0,
                width: lean ? '2em' : '3em',
                transition: 'opacity 150ms',
              }}
              disabled={readOnly || isMax}
              aria-label="+"
              tabIndex={0}
              onClick={this.handleIncreaseValue}>
              <div className="vtex-numeric-stepper__plus-button__text numeric-stepper__plus-button__text b">
                {/* fullwidth plus sign (U+FF0B) http://graphemica.com/%EF%BC%8B */}
                ＋
              </div>
            </button>
          </div>
          <div className="vtex-numeric-stepper__minus-button-container numeric-stepper__minus-button-container z-2 order-0 flex-none">
            <button
              type="button"
              className={`vtex-numeric-stepper__minus-button numeric-stepper__minus-button br2 pa0 br-0 flex items-center justify-center ${borderClasses} ${buttonClasses} ${
                readOnly || isMin ? buttonDisabledClasses : buttonEnabledClasses
              }`}
              style={{
                borderTopRightRadius: 0,
                borderBottomRightRadius: 0,
                width: lean ? '2em' : '3em',
                transition: 'opacity 150ms',
              }}
              disabled={readOnly || isMin}
              aria-label="−"
              // This is a minus sign (U+2212), not a regular hyphen (-, U+002D),
              // which is the default keyboard character.
              // Used for screen readers.
              tabIndex={0}
              onClick={this.handleDecreaseValue}>
              <span className="vtex-numeric-stepper__minus-button__text numeric-stepper__minus-button__text b">
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
      return (
        <label className="vtex-numeric-stepper-wrapper numeric-stepper-wrapper">
          {content}
        </label>
      )
    }
    return (
      <div className="vtex-numeric-stepper-wrapper numeric-stepper-wrapper">
        {content}
      </div>
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
  /** Multiplier value (e.g 1, 0.3) */
  unitMultiplier: PropTypes.number,
  /** Suffix (e.g Kg, un) */
  suffix: PropTypes.string,
  /** Makes input readonly and disables buttons */
  readOnly: PropTypes.bool,
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
  unitMultiplier: 1,
  suffix: '',
  readOnly: false,
  size: 'regular',
  block: false,
}

export default NumericStepper
