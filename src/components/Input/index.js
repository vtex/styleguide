import React, { Component } from 'react'
import PropTypes from 'prop-types'
import config from 'vtex-tachyons/config.json'

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

  handleFocus = event => {
    this.setState({ active: true })
    this.props.onFocus && this.props.onFocus(event)
  }

  handleBlur = event => {
    this.setState({ active: false })
    this.props.onBlur && this.props.onBlur(event)
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
    } = this.props
    const { active } = this.state

    const dataAttrs = {}
    for (const key of Object.keys(dataAttributes)) {
      dataAttrs[`data-${key}`] = dataAttributes[key]
    }

    const widthClass = 'w-100'
    const box = 'ma0 border-box'
    const border = 'bw1 br2 b--solid outline-0'
    // On bw1 change, update config.borderRadius[1] below accordingly

    const topBottomHeight = config.borderRadius[1] * 2 // 2 is top AND BOTTOM
    const prefixPosition = `${config.borderRadius[1]}rem`
    const calcPrefixHeight = `calc(100% - ${topBottomHeight}rem)`
    const typography = 'near-black'
    let classes = `${widthClass} ${box} ${border} ${typography} `

    let prefixClasses =
      'vtex-input__prefix absolute gray fw5 flex items-center bg-light-gray '

    if (token) {
      classes += 'code '
    }

    if (active) {
      classes += 'b--gray '
    } else {
      classes += 'b--light-gray '
      if (!this.props.disabled) {
        classes += 'hover-b--silver '
      }
    }

    if (error || errorMessage) {
      classes += 'b--red hover-b--red '
    }

    if (this.props.disabled) {
      classes += 'bg-light-gray bg-light-silver b--light-silver silver '
    } else {
      classes += 'bg-white '
    }

    switch (size) {
      case 'large':
        classes += `f5 pv4 ${prefix ? 'pl9 pr6' : 'ph6'}`
        prefixClasses += 'ph4 f5'
        // iconSize = 18
        break
      case 'x-large':
        classes += `f4 pv5 ${prefix ? 'pl9 pr7' : 'ph7'}`
        prefixClasses += 'ph5 f4 '
        // iconSize = 22
        break
      default:
        classes += `f6 pv3 ${prefix ? 'pl8 pr5' : 'ph5'}`
        prefixClasses += 'ph3 fw5 f6 '
        // iconSize = 16
        break
    }

    return (
      <label className="vtex-input w-100">
        {label && (
          <span className="vtex-input__label db mb3 w-100">{label}</span>
        )}
        <div className="flex vtex-input-prefix__group relative">
          {prefix && (
            <span
              style={{
                height: calcPrefixHeight,
                top: prefixPosition,
                left: prefixPosition,
              }}
              className={prefixClasses}
            >
              {prefix}
            </span>
          )}
          <input
            {...dataAttrs}
            onBlur={this.handleBlur}
            onFocus={this.handleFocus}
            onChange={this.handleChange}
            onKeyPress={this.handleKeyPress}
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
          />
        </div>
        {errorMessage && (
          <div className="red f6 mt3 lh-title">{errorMessage}</div>
        )}
        {helpText && <div className="mid-gray f6 mt3 lh-title">{helpText}</div>}
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
}

Input.propTypes = {
  /** Error highlight */
  error: PropTypes.bool,
  /** Error message */
  errorMessage: PropTypes.string,
  /** If the input is an API Key, App Key or App Token */
  token: PropTypes.bool,
  /** Help text */
  helpText: PropTypes.node,
  /** Input size */
  size: PropTypes.oneOf(['regular', 'large', 'x-large']),
  /** Label */
  label: PropTypes.string,
  /** Prefix */
  prefix: PropTypes.string,
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
  /** Spec attribute */
  id: PropTypes.string,
  /** Spec attribute */
  inputMode: PropTypes.string,
  /** Spec attribute */
  list: PropTypes.string,
  /** Spec attribute */
  max: PropTypes.string,
  /** Spec attribute */
  maxLength: PropTypes.string,
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
  /** Spec attribute */
  tabIndex: PropTypes.string,
  /** Spec attribute */
  type: PropTypes.string,
  /** Spec attribute */
  value: PropTypes.string,
  /** onChange event */
  onChange: PropTypes.func,
  /** onKeyPress event */
  onKeyPress: PropTypes.func,
  /** onFocus event */
  onFocus: PropTypes.func,
  /** onBlur event */
  onBlur: PropTypes.func,
}

export default Input
