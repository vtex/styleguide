import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ReactDatePicker, { registerLocale } from 'react-datepicker'
import * as locales from 'date-fns/locale/index.js'
import Input from '../Input'
import IconCalendar from '../icon/Calendar'

import './react-datepicker.global.css'

class DatePicker extends Component {
  constructor(props) {
    super(props)

    this.state = {
      active: false,
    }

    this.handleLocaleChange(props.locale)
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
    this.setState({ active: true })
    this.props.onFocus && this.props.onFocus(event)
  }

  handleBlur = event => {
    this.setState({ active: false })
    this.props.onBlur && this.props.onBlur(event)
  }

  handleLocaleChange = locale => {
    registerLocale(locale, locales[locale.replace('-', '')])
  }

  componentDidMount() {
    if (this.props.size === 'x-large') {
      console.warn(
        `Input: The value "x-large" for the prop "size" is deprecated. 
         In the next major version, it will be equivalent to "large", and 
         removed altogether in future versions`
      )
    }

    if (this.props.suffixIcon) {
      console.warn(
        `The prop suffixIcon is deprecated and will be removed in the next 
         major. Please use the prop suffix instead.`
      )
    }

    if (this.props.prefix && this.props.suffix) {
      console.warn(
        `You should not use both prefix and suffix props in the same input.`
      )
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.locale !== prevProps.locale) {
      this.handleLocaleChange(this.props.locale)
    }
  }

  render() {
    return (
      <div className="flex vtex-input-prefix__group relative">
        <ReactDatePicker
          customInput={
            <Input
              errorMessage={this.props.errorMessage}
              helpText={this.props.helpText}
              label={this.props.label}
              prefix={<IconCalendar />}
              size={this.props.size}
            />
          }
          dateFormat={this.props.useTime ? 'Pp' : 'P'}
          disabled={this.props.disabled}
          id={this.props.id}
          isClearable={this.props.clearable}
          locale={this.props.locale}
          name={this.props.name}
          readOnly={this.props.readOnly}
          required={this.props.required}
          selected={this.props.value}
          showTimeSelect={this.props.useTime}
          timeFormat="pp"
          timeIntervals={this.props.timeIntervals}
          onChange={this.props.onChange}
          // {...dataAttrs}
          // onFocus={this.handleFocus}
          // onKeyPress={this.handleKeyPress}
          // onKeyDown={this.handleKeyDown}
          // onKeyUp={this.handleKeyUp}
          // accept={this.props.accept}
          // autoComplete={this.props.autoComplete}
          // autoCorrect={this.props.autoCorrect}
          // autoFocus={this.props.autoFocus}
          // autoSave={this.props.autoSave}
          // defaultValue={this.props.defaultValue}
          // inputMode={this.props.inputMode}
          // list={this.props.list}
          // max={this.props.max}
          // maxLength={this.props.maxLength}
          // min={this.props.min}
          // minLength={this.props.minLength}
          // multiple={this.props.multiple}
          // onBlur={this.handleBlur}
          // pattern={this.props.pattern}
          // placeholder={this.props.placeholder}
          // spellCheck={this.props.spellCheck}
          // src={this.props.src}
          // step={this.props.step}
          // tabIndex={this.props.tabIndex}
          // type={this.props.type}
          // style={{
          //   WebkitAppearance: 'none',
          // }}
        />
      </div>
    )
  }
}

DatePicker.defaultProps = {
  autoFocus: false,
  dataAttributes: {},
  disabled: false,
  error: false,
  label: '',
  locale: 'en-US',
  multiple: false,
  prefix: '',
  readOnly: false,
  size: 'regular',
  token: false,
  type: 'text',
}

DatePicker.propTypes = {
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
  /** Spec attribute */
  clearable: PropTypes.bool,
  /** List of data attributes as a object like `{'locale': 'en-US'}` */
  dataAttributes: PropTypes.object,
  /** Spec attribute */
  defaultValue: PropTypes.string,
  /** Spec attribute */
  format: PropTypes.string,
  /** Whether the border should join with an element below */
  groupBottom: PropTypes.bool,
  /** Spec attribute */
  id: PropTypes.string,
  /** Spec attribute */
  inputMode: PropTypes.string,
  /** Spec attribute */
  list: PropTypes.string,
  /** Spec attribute */
  locale: PropTypes.string,
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
  timeIntervals: PropTypes.number,
  /** Spec attribute */
  type: PropTypes.string,
  /** Spec attribute */
  useTime: PropTypes.bool,
  /** Spec attribute */
  value: PropTypes.instanceOf(Date),
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

export default DatePicker
