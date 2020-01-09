import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Button from '../Button'
import styles from './Input.css'
import { withForwardedRef, refShape } from '../../modules/withForwardedRef'

class Input extends Component {
  constructor(props) {
    super(props)

    this.state = {
      active: false,
    }
  }

  handleChange = event => {
    this.props.onChange && this.props.onChange(event)
  }

  handleKeyPress = event => {
    this.props.onKeyPress && this.props.onKeyPress(event)
  }

  handleKeyDown = event => {
    this.props.onKeyDown && this.props.onKeyDown(event)
  }

  handleKeyUp = event => {
    this.props.onKeyUp && this.props.onKeyUp(event)
  }

  handleFocus = event => {
    if (!this.props.readOnly) {
      this.setState({ active: true })
      this.props.onFocus && this.props.onFocus(event)
    }
  }

  handleBlur = event => {
    if (!this.props.readOnly) {
      this.setState({ active: false })
      this.props.onBlur && this.props.onBlur(event)
    }
  }

  handleMouseEnter = event => {
    this.props.onMouseEnter && this.props.onMouseEnter(event)
  }

  handleMouseLeave = event => {
    this.props.onMouseLeave && this.props.onMouseLeave(event)
  }

  componentDidMount() {
    if (this.props.size === 'x-large') {
      console.warn(
        'Input: The value "x-large" for the prop "size" is deprecated. In the next major version, it will be equivalent to "large", and removed altogether in future versions'
      )
    }

    if (this.props.suffixIcon) {
      console.warn(
        'The prop suffixIcon is deprecated and will be removed in the next major. Please use the prop suffix instead.'
      )
    }

    if (this.props.prefix && this.props.suffix) {
      console.warn(
        'You should not use both prefix and suffix props in the same input. '
      )
    }
  }

  render() {
    const {
      errorMessage,
      error,
      label,
      size,
      token,
      helpText,
      dataAttributes,
      prefix,
      suffix: suffixProp,
      suffixIcon,
      button,
      isLoadingButton,
      groupBottom,
      disabled,
      readOnly,
      testId,
    } = this.props
    const { active } = this.state

    const suffix = suffixProp || suffixIcon

    const dataAttrs = {}
    for (const key of Object.keys(dataAttributes)) {
      dataAttrs[`data-${key}`] = dataAttributes[key]
    }

    const widthClass = 'w-100'
    const box = 'ma0 border-box'
    const borderRadiusBase = 'br2'
    const borderBase = `bw1 b--solid`

    const borderRadius = `${borderRadiusBase} ${
      prefix ? 'bl-0 br--right ' : ''
    } ${suffix ? 'br-0 br--left ' : ''}`
    let prefixClasses = `${borderRadiusBase} br-0 br--left `
    let suffixClasses = `${borderRadiusBase} bl-0 br--right `

    let classes = `${widthClass} ${box} ${styles.hideDecorators} ${styles.noAppearance} ${borderRadius} bn outline-0 `
    let labelClasses = 'vtex-input__label db mb3 w-100 c-on-base '
    let prefixAndSuffixClasses =
      'vtex-input__prefix c-muted-2 fw5 flex items-center c-muted-2 t-body '
    let prefixSuffixGroupClasses =
      'vtex-input-prefix__group flex flex-row items-stretch '
    prefixSuffixGroupClasses += `${borderRadiusBase} ${borderBase} ${
      groupBottom ? 'br--top ' : ''
    }`

    if (token) {
      classes += 'code '
    }

    if (disabled || readOnly || isLoadingButton) {
      classes += `bg-transparent b--disabled ${
        disabled || isLoadingButton ? 'c-disabled' : ''
      } `
      prefixSuffixGroupClasses += `bg-disabled b--disabled ${
        disabled ? 'c-disabled' : ''
      } `
    } else {
      classes += 'bg-base c-on-base '
      prefixAndSuffixClasses += 'bg-base '

      if (error || errorMessage) {
        classes += 'b--danger hover-b--danger '
        prefixSuffixGroupClasses += 'b--danger hover-b--danger '
      } else if (active) {
        classes += 'b--muted-2 '
        prefixSuffixGroupClasses += 'b--muted-2 '
      } else {
        classes += 'b--muted-4 '
        prefixSuffixGroupClasses += 'b--muted-4 '
        if (!readOnly) {
          classes += 'hover-b--muted-3 '
          prefixSuffixGroupClasses += 'hover-b--muted-3 '
        }
      }
    }

    switch (size) {
      case 'small':
        prefixSuffixGroupClasses += 'h-small '
        classes += `${!token ? 't-small' : ''} `
        classes += `${
          prefix && suffix ? '' : prefix ? 'pr5 ' : suffix ? 'pl5 ' : 'ph5 '
        }`
        labelClasses += 't-small '
        prefixClasses += 'pl5 pr3 '
        suffixClasses += 'pr5 pl3 '
        break
      case 'large':
        prefixSuffixGroupClasses += 'h-large '
        classes += `${!token ? 't-body' : ''} `
        classes += `${
          prefix && suffix ? '' : prefix ? 'pr5 ' : suffix ? 'pl5 ' : 'ph5 '
        }`
        labelClasses += 't-body '
        prefixClasses += 'pl5 pr4 '
        suffixClasses += 'pr5 pl4 '
        break
      case 'x-large':
        // DEPRECATED
        classes += `${!token ? 't-body' : ''} pv5 `
        classes += `${
          prefix && suffix ? '' : prefix ? 'pr7 ' : suffix ? 'pl7 ' : 'ph7 '
        }`
        labelClasses += 't-body '
        prefixClasses += 'pl5 pr3 '
        suffixClasses += 'pr5 pl3 '
        break
      default:
        prefixSuffixGroupClasses += 'h-regular '
        classes += `${!token ? 't-body' : ''} `
        classes += `${
          prefix && suffix ? '' : prefix ? 'pr5 ' : suffix ? 'pl5 ' : 'ph5 '
        }`
        labelClasses += 't-small '
        prefixClasses += 'pl5 pr3 '
        suffixClasses += 'pr5 pl3 '
        break
    }

    return (
      <label className="vtex-input w-100" data-testid={testId}>
        {label && <span className={labelClasses}>{label}</span>}
        <div className={prefixSuffixGroupClasses}>
          {prefix && (
            <span className={`${prefixAndSuffixClasses} ${prefixClasses}`}>
              {prefix}
            </span>
          )}
          <input
            {...dataAttrs}
            ref={this.props.forwardedRef}
            onBlur={this.handleBlur}
            onFocus={this.handleFocus}
            onChange={this.handleChange}
            onKeyPress={this.handleKeyPress}
            onKeyDown={this.handleKeyDown}
            onKeyUp={this.handleKeyUp}
            onMouseEnter={this.handleMouseEnter}
            onMouseLeave={this.handleMouseLeave}
            className={classes}
            disabled={disabled || isLoadingButton}
            accept={this.props.accept}
            autoComplete={this.props.autoComplete}
            autoCorrect={this.props.autoCorrect}
            autoFocus={this.props.autoFocus}
            autoSave={this.props.autoSave}
            defaultValue={this.props.defaultValue}
            inputMode={this.props.inputMode}
            list={this.props.list}
            max={this.props.max}
            maxLength={this.props.maxLength}
            min={this.props.min}
            minLength={this.props.minLength}
            multiple={this.props.multiple}
            name={this.props.name}
            pattern={this.props.pattern}
            placeholder={this.props.placeholder}
            readOnly={readOnly}
            required={this.props.required}
            spellCheck={this.props.spellCheck}
            src={this.props.src}
            step={this.props.step}
            tabIndex={this.props.tabIndex}
            type={this.props.type}
            value={this.props.value}
            id={this.props.id}
          />
          {suffix && (
            <span className={`${prefixAndSuffixClasses} ${suffixClasses}`}>
              {suffix}
            </span>
          )}
          {button && size !== 'small' && (
            <span className="flex items-center mr1">
              <Button
                disabled={disabled || isLoadingButton}
                isLoading={isLoadingButton}
                size={size === 'large' ? 'regular' : 'small'}
                type="submit"
                variation="secondary">
                {button}
              </Button>
            </span>
          )}
        </div>
        {errorMessage && (
          <div className="c-danger t-small mt3 lh-title">{errorMessage}</div>
        )}
        {helpText && (
          <div className="c-muted-1 t-small mt3 lh-title">{helpText}</div>
        )}
      </label>
    )
  }
}

Input.defaultProps = {
  autoFocus: false,
  token: false,
  dataAttributes: {},
  disabled: false,
  label: '',
  multiple: false,
  readOnly: false,
  error: false,
  size: 'regular',
  prefix: '',
  type: 'text',
  isLoadingButton: false,
}

Input.propTypes = {
  /** Error highlight */
  error: PropTypes.bool,
  /** Error message */
  errorMessage: PropTypes.string,
  /** @ignore Forwarded Ref */
  forwardedRef: refShape,
  /** If the input is an API Key, App Key or App Token */
  token: PropTypes.bool,
  /** Help text */
  helpText: PropTypes.node,
  /** Input size */
  size: PropTypes.oneOf(['small', 'regular', 'large']),
  /** Label */
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  /** Prefix */
  prefix: PropTypes.node,
  /** Spec attribute */
  accept: PropTypes.string,
  /** Spec attribute */
  disabled: PropTypes.bool,
  /** Spec attribute */
  autoComplete: PropTypes.string,
  /** Spec attribute */
  autoCorrect: PropTypes.string,
  /** Spec attribute */
  autoFocus: PropTypes.bool,
  /** Spec attribute */
  autoSave: PropTypes.string,
  /** @ignore
   * Spec attribute */
  button: PropTypes.string,
  /** List of data attributes as a object like `{'locale': 'en-US'}` */
  dataAttributes: PropTypes.object,
  /** Spec attribute */
  defaultValue: PropTypes.string,
  /** Whether the border should join with an element below */
  groupBottom: PropTypes.bool,
  /** Spec attribute */
  id: PropTypes.string,
  /** Data attribute */
  testId: PropTypes.string,
  /** Spec attribute */
  inputMode: PropTypes.string,
  /** @ignore
   * Loading state */
  isLoadingButton: PropTypes.bool,
  /** Spec attribute */
  list: PropTypes.string,
  /** Spec attribute */
  max: PropTypes.string,
  /** Spec attribute */
  maxLength: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  /** Spec attribute */
  min: PropTypes.string,
  /** Spec attribute */
  minLength: PropTypes.string,
  /** Spec attribute */
  multiple: PropTypes.bool,
  /** Spec attribute */
  name: PropTypes.string,
  /** Spec attribute */
  pattern: PropTypes.string,
  /** Spec attribute */
  placeholder: PropTypes.string,
  /** Spec attribute */
  readOnly: PropTypes.bool,
  /** Spec attribute */
  required: PropTypes.bool,
  /** Spec attribute */
  spellCheck: PropTypes.string,
  /** Spec attribute */
  src: PropTypes.string,
  /** Spec attribute */
  step: PropTypes.string,
  /** Suffix attribute */
  suffix: PropTypes.node,
  /** DEPRECATED: Suffix icon attribute */
  suffixIcon: PropTypes.element,
  /** Spec attribute */
  tabIndex: PropTypes.string,
  /** Spec attribute */
  type: PropTypes.string,
  /** Spec attribute */
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  /** onChange event */
  onChange: PropTypes.func,
  /** onKeyDown event */
  onKeyDown: PropTypes.func,
  /** onKeyPress event */
  onKeyPress: PropTypes.func,
  /** onKeyUp event */
  onKeyUp: PropTypes.func,
  /** onFocus event */
  onFocus: PropTypes.func,
  /** onBlur event */
  onBlur: PropTypes.func,
  /** onMouseEnter event */
  onMouseEnter: PropTypes.func,
  /** onMouseLeave event */
  onMouseLeave: PropTypes.func,
}

export default withForwardedRef(Input)
