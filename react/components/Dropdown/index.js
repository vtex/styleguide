import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ArrowDownIcon from './ArrowDownIcon'

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
    return `Dropdown with the options ${options
      .map(option => option.label)
      .join(', ')}`
  }

  getPlaceholder = () => {
    const { placeholder, label, helpText } = this.props
    const placeholderValue = placeholder || label || helpText || ''

    if (placeholderValue === '' && !this.sentPlaceholderWarning) {
      const identificationText = this.getDropdownIdentification()
      console.warn(
        `The following dropdown has a placeholder option, but no placeholder text. Please use at least one of these props: placeholder, label, or helpText. ${identificationText}`
      )

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

  componentDidMount() {
    if (this.props.size === 'x-large') {
      console.warn(
        'Dropdown: The value "x-large" for the prop "size" is deprecated. In the next major version, it will be equivalent to "large", and removed altogether in future versions'
      )
    }
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
      variation,
    } = this.props

    const hasValidInitialValue =
      this.getOptionFromValue(this.initialValue) !== null

    const isPlaceholder = this.getSelectedOption() === null
    const isInline = variation.toLowerCase() === 'inline'
    let width
    let iconSize

    let classes = 'bg-transparent bn w-100 h-100 '
    let containerClasses = `${isInline ? '' : 'bw1'} br2 relative `
    let selectClasses = 'o-0 absolute top-0 left-0 h-100 w-100 bottom-00 '

    let labelClasses = 'vtex-dropdown__label db mb3 w-100 c-on-base '

    const valueLabel = this.getValueLabel()
    const showCaption = !valueLabel

    const color = isInline ? 'c-link ' : 'c-on-base '

    classes += disabled ? '' : 'pointer '
    selectClasses += disabled ? '' : 'pointer '
    classes +=
      !disabled && valueLabel
        ? !isPlaceholder
          ? color
          : 'c-muted-2 '
        : 'c-disabled '

    switch (size) {
      case 'small':
        classes += isInline ? 'ph2 ' : 'pl5 pr3 '
        selectClasses += 't-small '
        labelClasses += 't-small '
        containerClasses += `${isInline ? 'h-auto' : 'h-small'} t-small `
        iconSize = 18
        break
      case 'large':
        classes += isInline ? 'ph2 ' : 'ph5 '
        selectClasses += 't-body '
        labelClasses += 't-body '
        containerClasses += `${isInline ? 'h-auto' : 'h-large'} t-body `
        iconSize = 18
        break
      case 'x-large':
        // DEPRECATED
        classes += 't-body pv5 ph5 '
        selectClasses += 't-body '
        labelClasses += 't-body '
        iconSize = 22
        break
      default:
        classes += isInline ? 'ph2 ' : 'pl5 pr4 '
        selectClasses += 't-small '
        labelClasses += 't-small '
        containerClasses += `${isInline ? 'h-auto' : 'h-regular'} t-body `
        iconSize = 18
        break
    }

    const containerStyle = { width }

    if (disabled) {
      containerClasses += 'ba b--disabled bw1 bg-disabled '
    } else if (error || errorMessage) {
      containerClasses += 'ba b--danger hover-b--danger '
    } else if (isInline) {
      containerClasses += 'fw5 '
    } else {
      containerClasses += 'bg-base hover-b--muted-3 ba b--muted-4 '
    }

    return (
      <div
        className={`vtex-dropdown ${
          isInline ? 'vtex-dropdown--inline dib' : ''
        }`}>
        <label>
          {label && <span className={labelClasses}>{label}</span>}
          <div className={containerClasses} style={containerStyle}>
            <div id={id} className={`vtex-dropdown__button ${classes}`}>
              <div className={`flex ${isInline ? '' : 'h-100'}`}>
                <div
                  className={`vtex-dropdown__caption flex-auto tl truncate ${
                    isInline ? '' : 'h-100'
                  }`}>
                  <div
                    className={`${isInline ? '' : 'h-100'} flex items-center`}>
                    {showCaption ? placeholder : valueLabel}
                  </div>
                </div>
                <div
                  className={`vtex-dropdown__arrow flex-none flex items-center pl2 ${
                    disabled ? 'c-on-disabled' : 'c-action-primary'
                  }`}>
                  <ArrowDownIcon size={iconSize} />
                </div>
              </div>
            </div>

            <select
              disabled={disabled}
              className={selectClasses}
              onChange={this.handleChange}
              ref={this.props.forwardedRef}
              // Check the comment on the constructor regarding nil values
              value={value == null ? '' : value}
              autoFocus={autoFocus}
              form={form}
              name={name}
              required={required}
              style={{
                // safari select height fix
                WebkitAppearance: 'menulist-button',
              }}>
              {/* iOS hack to optionally prevent truncating options */}
              {preventTruncate && <optgroup label={label || helpText || ''} />}

              {/* Creates a disabled first option in case the first value is invalid or empty */}
              {(!hasValidInitialValue || placeholder) && (
                <option
                  disabled
                  value={!hasValidInitialValue ? this.initialValue : null}>
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
          <div className="c-danger t-small mt3 lh-title">{errorMessage}</div>
        )}
        {helpText && (
          <div className="c-muted-1 t-small mt3 lh-title">{helpText}</div>
        )}
      </div>
    )
  }
}

const DropdownWithRef = React.forwardRef((props, ref) => (
  <Dropdown {...props} forwardedRef={ref} />
))

DropdownWithRef.displayName = 'Dropdown'

DropdownWithRef.defaultProps = {
  size: 'regular',
  options: [],
  variation: 'default',
}

DropdownWithRef.propTypes = {
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
  size: PropTypes.oneOf(['small', 'regular', 'large']),
  /** Dropdown options list */
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
        .isRequired,
      label: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
        .isRequired,
    })
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
  /** Dropdown variation */
  variation: PropTypes.oneOf(['default', 'inline']),
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
  /** Internal prop used for ref forwarding */
  forwardedRef: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
}

Dropdown.propTypes = DropdownWithRef.propTypes
Dropdown.defaultProps = DropdownWithRef.defaultProps

export default DropdownWithRef
