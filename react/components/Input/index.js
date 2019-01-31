import React, { Component } from 'react'
import PropTypes from 'prop-types'
import config from 'vtex-tachyons/config.json'

import './edge.global.css'

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
      groupBottom,
    } = this.props
    const { active } = this.state

    const suffix = suffixProp || suffixIcon

    const dataAttrs = {}
    for (const key of Object.keys(dataAttributes)) {
      dataAttrs[`data-${key}`] = dataAttributes[key]
    }

    const widthClass = 'w-100'
    const box = 'ma0 border-box'
    const borderRadius = `br2 ${groupBottom ? 'br--top' : ''}`
    const border = `bw1 ${borderRadius} b--solid outline-0`
    // On bw1 change, update config.borderRadius[1] below accordingly

    const topBottomHeight = config.borderRadius[1] * 2 // 2 is top AND BOTTOM
    const prefixAndSuffixPosition = `${config.borderRadius[1]}rem`
    const calcPrefixAndSuffixHeight = `calc(100% - ${topBottomHeight}rem)`
    let classes = `${widthClass} ${box} ${border} hide-edge-input-decorations`

    let labelClasses = 'vtex-input__label db mb3 w-100 c-on-base '

    let prefixAndSuffixClasses =
      'vtex-input__prefix absolute c-muted-2 fw5 flex items-center '

    if (token) {
      classes += 'code '
    }

    if (this.props.disabled) {
      classes += 'bg-disabled b--disabled c-disabled '
    } else {
      classes += 'bg-base c-on-base '

      if (error || errorMessage) {
        classes += 'b--danger hover-b--danger '
      } else if (active) {
        classes += 'b--muted-2 '
      } else {
        classes += 'b--muted-4 '
        if (!this.props.readOnly) {
          classes += 'hover-b--muted-3 '
        }
      }
    }

    switch (size) {
      case 'small':
        classes += `${!token ? 't-small' : ''} h-small ${
          prefix ? 'pl7 pr5' : 'ph5'
        } ${suffix ? 'pr7' : ''}`
        labelClasses += 't-small '
        prefixAndSuffixClasses += 'ph3 t-body '
        break
      case 'large':
        classes += `${!token ? 't-body' : ''} h-large ${
          prefix ? 'pl8 pr6' : 'ph5'
        } ${suffix ? 'pr8' : ''}`
        labelClasses += 't-body '
        prefixAndSuffixClasses += 'ph4 t-body'
        break
      case 'x-large':
        // DEPRECATED
        classes += `${!token ? 't-body' : ''} pv5 ${
          prefix ? 'pl8 pr7' : 'ph7'
        } ${suffix ? 'pr8' : ''}`
        labelClasses += 't-body '
        prefixAndSuffixClasses += 'ph5 t-body '
        break
      default:
        classes += `${!token ? 't-small' : ''} h-regular ${
          prefix ? 'pl7 pr5' : 'ph5'
        } ${suffix ? 'pr7' : ''}`
        labelClasses += 't-small '
        prefixAndSuffixClasses += 'ph3 t-small '
        break
    }

    return (
      <label className="vtex-input w-100">
        {label && <span className={labelClasses}>{label}</span>}
        <div className="flex vtex-input-prefix__group relative">
          {prefix && (
            <span
              style={{
                height: calcPrefixAndSuffixHeight,
                top: prefixAndSuffixPosition,
                left: prefixAndSuffixPosition,
              }}
              className={prefixAndSuffixClasses}>
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
            className={classes}
            disabled={this.props.disabled}
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
            readOnly={this.props.readOnly}
            required={this.props.required}
            spellCheck={this.props.spellCheck}
            src={this.props.src}
            step={this.props.step}
            tabIndex={this.props.tabIndex}
            type={this.props.type}
            value={this.props.value}
            id={this.props.id}
            style={{
              WebkitAppearance: 'none',
            }}
          />
          {suffix && (
            <span
              style={{
                height: calcPrefixAndSuffixHeight,
                top: prefixAndSuffixPosition,
                right: prefixAndSuffixPosition,
              }}
              className={prefixAndSuffixClasses}>
              {suffix}
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

const InputWithRef = React.forwardRef((props, ref) => (
  <Input {...props} forwardedRef={ref} />
))

InputWithRef.displayName = 'Input'

InputWithRef.defaultProps = {
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
}

InputWithRef.propTypes = {
  /** Error highlight */
  error: PropTypes.bool,
  /** Error message */
  errorMessage: PropTypes.string,
  /** If the input is an API Key, App Key or App Token */
  token: PropTypes.bool,
  /** Help text */
  helpText: PropTypes.node,
  /** Input size */
  size: PropTypes.oneOf(['small', 'regular', 'large']),
  /** Label */
  label: PropTypes.string,
  /** Prefix */
  prefix: PropTypes.node,
  /** Internal prop used for ref forwarding */
  forwardedRef: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
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
  /** List of data attributes as a object like `{'locale': 'en-US'}` */
  dataAttributes: PropTypes.object,
  /** Spec attribute */
  defaultValue: PropTypes.string,
  /** Whether the border should join with an element below */
  groupBottom: PropTypes.bool,
  /** Spec attribute */
  id: PropTypes.string,
  /** Spec attribute */
  inputMode: PropTypes.string,
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
  value: PropTypes.string,
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
}

Input.propTypes = InputWithRef.propTypes
Input.defaultProps = InputWithRef.defaultProps

export default InputWithRef
