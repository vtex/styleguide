import React, { Component } from 'react'
import PropTypes from 'prop-types'
import config from 'vtex-tachyons/config.json'
// import SearchIcon from '../icon/Search'
// import DenyIcon from '../icon/Deny'

class Input extends Component {
  constructor(props) {
    super(props)

    this.state = {
      active: false,
    }
  }

  handleChange = event => {
    this.props.onChange && this.props.onChange(event)
  };

  handleKeyPress = event => {
    this.props.onKeyPress && this.props.onKeyPress(event)
  };

  handleKeyDown = event => {
    this.props.onKeyDown && this.props.onKeyDown(event)
  };

  handleKeyUp = event => {
    this.props.onKeyUp && this.props.onKeyUp(event)
  };

  handleFocus = event => {
    this.setState({ active: true })
    this.props.onFocus && this.props.onFocus(event)
  };

  handleBlur = event => {
    this.setState({ active: false })
    this.props.onBlur && this.props.onBlur(event)
  };

  handleSubmit = event => {
    this.props.onSubmit && this.props.onSubmit(event, this.props.value)
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
      suffixIcon,
      groupBottom,
    } = this.props
    const { active } = this.state

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
    const typography = 'c-on-base'
    let classes = `${widthClass} ${box} ${border} ${typography} `

    let labelClasses = 'vtex-input__label db mb3 w-100 '

    let prefixAndSuffixClasses = 'vtex-input__prefix absolute c-muted-1 fw5 flex items-center '

    if (token) {
      classes += 'code '
    }

    if (this.props.disabled) {
      classes += 'bg-disabled b--disabled c-disabled '
    } else {
      classes += 'bg-on-base '

      if (error || errorMessage) {
        classes += 'b--danger hover-b--danger '
      } else if (active) {
        classes += 'b--muted-2 '
      } else {
        classes += 'b--muted-4 hover-b--muted-3 '
      }
    }

    switch (size) {
      case 'large':
        classes += `f5 pv4 ${prefix ? 'pl8 pr6' : 'ph6'} ${
          suffixIcon ? 'pr8' : ''
        }`
        labelClasses += 'f5 '
        prefixAndSuffixClasses += 'ph4 f5'
        // iconSize = 18
        break
      case 'x-large':
        classes += `f4 pv5 ${prefix ? 'pl8 pr7' : 'ph7'} ${
          suffixIcon ? 'pr8' : ''
        }`
        labelClasses += 'f5 '
        prefixAndSuffixClasses += 'ph5 f4 '
        // iconSize = 22
        break
      default:
        classes += `f6 pv3 ${prefix ? 'pl7 pr5' : 'ph5'} ${
          suffixIcon ? 'pr7' : ''
        }`
        labelClasses += 'f6 '
        prefixAndSuffixClasses += 'ph3 fw5 f6 '
        // iconSize = 16
        break
    }

    return (
      <label className="vtex-input w-100">
        {label && <span className={labelClasses}>{label}</span>}
        <div className="flex vtex-input-prefix__group relative">
          {prefix &&
            <span
              style={{
                height: calcPrefixAndSuffixHeight,
                top: prefixAndSuffixPosition,
                left: prefixAndSuffixPosition,
              }}
              className={prefixAndSuffixClasses}
            >
              {prefix}
            </span>}
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
          />
          {suffixIcon &&
            <span
              style={{
                height: calcPrefixAndSuffixHeight,
                top: prefixAndSuffixPosition,
                right: prefixAndSuffixPosition,
              }}
              className={prefixAndSuffixClasses}
            >
              {suffixIcon}
            </span>}
        </div>
        {errorMessage &&
          <div className="c-danger f6 mt3 lh-title">{errorMessage}</div>}
        {helpText &&
          <div className="c-muted-1 f6 mt3 lh-title">{helpText}</div>}
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
  suffix: '',
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
  size: PropTypes.oneOf(['regular', 'large', 'x-large']),
  /** Label */
  label: PropTypes.string,
  /** Prefix */
  prefix: PropTypes.string,
  /** Suffix */
  suffix: PropTypes.string,
  /** Internal prop used for ref forwarding */
  forwardedRef: PropTypes.func,
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
  /** SuffixIcon attribute */
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
  /** onSubmit event */
  onSubmit: PropTypes.func,
}

Input.propTypes = InputWithRef.propTypes
Input.defaultProps = InputWithRef.defaultProps

export default InputWithRef
