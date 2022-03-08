import classNames from 'classnames'
import React, { Component } from 'react'
import PropTypes from 'prop-types'

import withDevice from '../utils/withDeviceHoc'
import ArrowDownIcon from './ArrowDownIcon'
import { withForwardedRef, refShape } from '../../modules/withForwardedRef'
import styles from './Dropdown.css'

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
    this.initialValue = ''

    this.state = {
      active: false,
    }
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

  handleFocus = () => {
    this.setState({ active: true })
    this.props.onFocus && this.props.onFocus(event)
  }

  handleBlur = () => {
    this.setState({ active: false })
    this.props.onBlur && this.props.onBlur(event)
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
    const { active } = this.state
    const {
      label,
      id,
      testId,
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
      selectTestId,
      isMobile,
    } = this.props

    const hasValidInitialValue =
      this.getOptionFromValue(this.initialValue) !== null

    const valueLabel = this.getValueLabel()
    const showCaption = !valueLabel
    const isPlaceholder = this.getSelectedOption() === null
    const isInline = variation.toLowerCase() === 'inline'
    const iconSize = size === 'x-large' ? 22 : 18

    const color = isInline ? 'c-link' : 'c-on-base'

    const buttonClasses = classNames(
      'vtex-dropdown__button bg-transparent bn w-100 h-100',
      {
        pointer: !disabled,
        'c-disabled': disabled || !valueLabel,
        [color]: !disabled && valueLabel && !isPlaceholder,
        'c-muted-2': !disabled && valueLabel && isPlaceholder,
        ph2: isInline && size !== 'x-large',
        'pl5 pr3': !isInline && size !== 'x-large',
        't-body pv5 ph5': size === 'x-large',
      }
    )

    const rootClasses = classNames(styles.dropdown, 'vtex-dropdown', {
      'vtex-dropdown--inline dib': isInline,
    })

    const containerClasses = classNames(
      styles.container,
      'vtex-dropdown__container br2 relative',
      {
        'bg-base': !isInline,
        ba: !isInline,
        bw1: !isInline || disabled,
        'b--disabled bg-disabled': disabled,
        'b--danger hover-b--danger': (error || errorMessage) && !disabled,
        fw5: isInline && !error && !errorMessage && !disabled,
        'b--muted-2':
          active && !isInline && !error && !errorMessage && !disabled,
        'hover-b--muted-3 b--muted-4':
          !active && !isInline && !error && !errorMessage && !disabled,
        't-body': size !== 'small' && size !== 'x-large',
        'h-auto': isInline && size !== 'x-large',
        'h-small': !isInline && size === 'small',
        'h-large': !isInline && size === 'large',
        'h-regular':
          !isInline &&
          size !== 'small' &&
          size !== 'large' &&
          size !== 'x-large',
      }
    )

    const selectClasses = classNames(
      'o-0 absolute top-0 left-0 h-100 w-100 bottom-0 t-body',
      {
        pointer: !disabled,
      }
    )

    const labelClasses = classNames(
      'vtex-dropdown__label db mb3 w-100 c-on-base',
      {
        't-small': size !== 'large' && size !== 'x-large',
        't-body': size === 'large' || size === 'x-large',
      }
    )

    return (
      <div className={rootClasses} data-testid={testId}>
        <label className="h-100">
          {label && <span className={labelClasses}>{label}</span>}
          <div className={containerClasses}>
            <div id={id} className={buttonClasses}>
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
              data-testid={selectTestId}
              disabled={disabled}
              className={selectClasses}
              onChange={this.handleChange}
              onFocus={this.handleFocus}
              onBlur={this.handleBlur}
              onMouseEnter={this.props.onMouseEnter}
              onMouseLeave={this.props.onMouseLeave}
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
              {preventTruncate && isMobile && (
                <optgroup label={label || helpText || ''} />
              )}

              {/* Creates a disabled first option in case the first value is invalid or empty */}
              {(!hasValidInitialValue || placeholder) && (
                <option
                  disabled
                  value={!hasValidInitialValue ? this.initialValue : null}>
                  {this.getPlaceholder()}
                </option>
              )}
              {options.map(option => (
                <option
                  disabled={option.disabled}
                  key={option.value}
                  value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </label>
        {errorMessage && (
          <div className="vtex-dropdown__error c-danger t-small mt3 lh-title">
            {errorMessage}
          </div>
        )}
        {helpText && (
          <div className="vtex-dropdown__help-text c-muted-1 t-small mt3 lh-title">
            {helpText}
          </div>
        )}
      </div>
    )
  }
}

Dropdown.defaultProps = {
  size: 'regular',
  options: [],
  variation: 'default',
}

Dropdown.propTypes = {
  /** Error highlight */
  error: PropTypes.bool,
  /** Error message */
  errorMessage: PropTypes.node,
  /** @ignore Forwarded Ref */
  forwardedRef: refShape,
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
      disabled: PropTypes.bool,
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
  /** Data attribute */
  testId: PropTypes.string,
  /**  Data attribute for select*/
  selectTestId: PropTypes.string,
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
  /** onFocus event */
  onFocus: PropTypes.func,
  /** onBlur event */
  onBlur: PropTypes.func,
  /** onMouseEnter event */
  onMouseEnter: PropTypes.func,
  /** onMouseLeave event */
  onMouseLeave: PropTypes.func,
  /** onClose event */
  onClose: PropTypes.func,
  /** onOpen event */
  onOpen: PropTypes.func,
  /** @ignore */
  isMobile: PropTypes.bool,
}

export default withForwardedRef(withDevice(Dropdown))
