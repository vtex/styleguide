import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ArrowDownIcon from './ArrowDownIcon'
import config from 'vtex-tachyons/config.json'

class Dropdown extends Component {
  constructor(props) {
    super(props)

    // The initial value sent to the dropdown is kept in order to know
    // whether or not to create and keep a first disabled option.
    // If the initial value is invalid/empty, an empty option is kept
    // so the select will have an empty state. Otherwise, the first
    // value would automatically be chosen.
    // However, you can't select a null/undefined option, so nil values
    // are transformed to empty string.
    this.initialValue = props.value == null ? '' : props.value
  }

  handleChange = e => {
    const { disabled, onChange } = this.props
    const {
      target: { value },
    } = e

    !disabled && onChange && onChange(e, value)
  }

  getOptionFromValue = value => {
    const { options } = this.props
    const option = options.filter(option => option.value === value)[0]
    if (!option) return null
    return option
  }

  getDropdownIdentification = () => {
    const { label, id, options } = this.props
    if (label) {
      return `Dropdown with the label "${label}"`
    } else if (id) {
      return `Dropdown #${id}`
    }
    return `Dropdown with the options ${options.map(option => option.label).join(', ')}`
  }

  getPlaceholder = () => {
    const { placeholder, label, helpText } = this.props
    const placeholderValue = placeholder || label || helpText || ''

    if (placeholderValue === '' && !this.sentPlaceholderWarning) {
      console.warn(`The following dropdown has a placeholder option, but no placeholder text. Please use at least one of these props: placeholder, label, or helpText.

${this.getDropdownIdentification()}`)

      this.sentPlaceholderWarning = true
    }

    return placeholderValue
  }

  getSelectedOption = () => {
    return this.getOptionFromValue(this.props.value)
  }

  getValueLabel() {
    const selectedOption = this.getSelectedOption()
    return selectedOption ? selectedOption.label : this.getPlaceholder()
  }

  render() {
    const {
      label,
      id,
      value,
      size,
      disabled,
      options,
      error,
      errorMessage,
      helpText,
      placeholder,
      preventTruncate,
      autoFocus,
      form,
      name,
      required,
    } = this.props

    const hasValidInitialValue =
      this.getOptionFromValue(this.initialValue) !== null

    const isPlaceholder = this.getSelectedOption() === null
    let width
    let iconSize

    let classes = 'bg-transparent bn w-100 '
    let containerClasses = 'br2 bw1 relative '
    let selectClasses = 'o-0 absolute top-0 left-0 w-100 bottom-0 '

    const valueLabel = this.getValueLabel()
    const showCaption = !valueLabel

    classes += disabled ? 'bg-light-gray ' : 'pointer '
    selectClasses += disabled ? '' : 'pointer '
    classes += !disabled && valueLabel ? 'near-black ' : 'gray '
    classes += isPlaceholder ? 'gray ' : ''

    switch (size) {
      case 'large':
        classes += 'f5 pv4 pl6 pr5 '
        selectClasses += 'f5 '
        iconSize = 18
        break
      case 'x-large':
        classes += 'f4 pv5 pl7 pr6 '
        selectClasses += 'f4 '
        iconSize = 22
        break
      default:
        classes += 'f6 pv3 pl5 pr4 '
        selectClasses += 'f6 '
        iconSize = 16
        break
    }

    const containerStyle = { width }

    if (disabled) {
      containerClasses += 'bg-light-gray '
    } else {
      containerClasses += 'bg-white '
    }

    if (error || errorMessage) {
      containerClasses += 'ba b--red hover-b--red '
    } else {
      containerClasses += 'ba b--light-gray '
    }

    if (!disabled) {
      containerClasses += 'hover-b--silver '
    }

    return (
      <div className="vtex-dropdown">
        <label>
          {label && (
            <span className="vtex-dropdown__label dib mb3 w-100">{label}</span>
          )}
          <div className={containerClasses} style={containerStyle}>
            <div id={id} className={`vtex-dropdown__button ${classes}`}>
              <div className="flex">
                <div className="vtex-dropdown__caption flex-auto tl truncate">
                  {showCaption ? placeholder : valueLabel}
                </div>
                <div className="vtex-dropdown__arrow flex-none flex items-center pl2">
                  <ArrowDownIcon
                    size={iconSize}
                    color={
                      disabled ? config.colors['gray'] : config.colors.blue
                    }
                  />
                </div>
              </div>
            </div>

            <select
              disabled={disabled}
              className={selectClasses}
              onChange={this.handleChange}
              {...{/* Check the comment on the constructor regarding nil values */}}
              value={value == null ? '' : value}
              autoFocus={autoFocus}
              form={form}
              name={name}
              required={required}
              style={{
                // safari select height fix
                WebkitAppearance: 'menulist-button',
              }}
            >
              {preventTruncate && <optgroup label={label || helpText || ''} />}
              {(!hasValidInitialValue || placeholder) && (
                <option
                  disabled
                  value={!hasValidInitialValue ? this.initialValue : null}
                >
                  {this.getPlaceholder()}
                </option>
              )}
              {options.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </label>
        {errorMessage && (
          <div className="red f6 mt3 lh-title">{errorMessage}</div>
        )}
        {helpText && <div className="mid-gray f6 mt3 lh-title">{helpText}</div>}
      </div>
    )
  }
}

Dropdown.defaultProps = {
  size: 'regular',
  options: [],
}

Dropdown.propTypes = {
  /** Error highlight */
  error: PropTypes.bool,
  /** Error message */
  errorMessage: PropTypes.node,
  /** Help text */
  helpText: PropTypes.node,
  /** Dropdown label */
  label: PropTypes.node,
  /** Dropdown placeholder value */
  placeholder: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  /** Dropdown size */
  size: PropTypes.oneOf(['regular', 'large', 'x-large']),
  /** Dropdown options list */
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
        .isRequired,
      label: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
        .isRequired,
    }),
  ),
  /** Prevent truncating large options texts on some devices/browsers, such as iOS */
  preventTruncate: PropTypes.bool,
  /** Spec attribute */
  id: PropTypes.string,
  /** Spec attribute */
  autoFocus: PropTypes.bool,
  /** Spec attribute */
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  /** Spec attribute */
  disabled: PropTypes.bool,
  /** Spec attribute */
  form: PropTypes.string,
  /** Spec attribute */
  name: PropTypes.string,
  /** Spec attribute */
  required: PropTypes.bool,
  /** onChange event */
  onChange: PropTypes.func,
  /** onClose event */
  onClose: PropTypes.func,
  /** onOpen event */
  onOpen: PropTypes.func,
}

export default Dropdown
