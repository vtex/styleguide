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

  componentDidUpdate(prevProps) {
    if (this.props.locale !== prevProps.locale) {
      this.handleLocaleChange(this.props.locale)
    }
  }

  render() {
    return (
      <ReactDatePicker
        autoFocus={this.props.autoFocus}
        customInput={
          <Input
            error={this.props.error}
            errorMessage={this.props.errorMessage || this.state.errorMessage}
            helpText={this.props.helpText}
            label={this.props.label}
            prefix={<IconCalendar />}
            size={this.props.size}
          />
        }
        dateFormat={this.props.useTime ? 'Pp' : 'P'}
        disabled={this.props.disabled}
        excludeDates={this.props.excludeDates}
        excludeTimes={this.props.excludeTimes}
        id={this.props.id}
        includeDates={this.props.includeDates}
        includeTimes={this.props.includeTimes}
        locale={this.props.locale}
        maxDate={this.props.maxDate}
        minDate={this.props.minDate}
        name={this.props.name}
        placeholderText={this.props.placeholder}
        readOnly={this.props.readOnly}
        required={this.props.required}
        selected={this.props.value}
        showTimeSelect={this.props.useTime}
        tabIndex={this.props.tabIndex}
        timeFormat="p"
        timeIntervals={this.props.timeIntervals}
        onBlur={this.props.onBlur}
        onFocus={this.props.onFocus}
        onChange={this.props.onChange}
      />
    )
  }
}

DatePicker.defaultProps = {
  autoFocus: false,
  disabled: false,
  error: false,
  label: '',
  readOnly: false,
  required: false,
  size: 'regular',
}

DatePicker.propTypes = {
  /** Spec attribute  */
  autoFocus: PropTypes.bool,
  /** Spec attribute  */
  disabled: PropTypes.bool,
  /** Error highlight  */
  error: PropTypes.bool,
  /** Error message  */
  errorMessage: PropTypes.string,
  /** Dates to be excluded  */
  excludeDates: PropTypes.arrayOf(Date),
  /** Times to be excluded  */
  excludeTimes: PropTypes.arrayOf(Date),
  /** Help text  */
  helpText: PropTypes.node,
  /** Spec attribute  */
  id: PropTypes.string,
  /** Dates to be included  */
  includeDates: PropTypes.arrayOf(Date),
  /** Dates to be included  */
  includeTimes: PropTypes.arrayOf(Date),
  /** Label  */
  label: PropTypes.string,
  /** Locale string ('en-US', 'pt-BR', ...)  */
  locale: PropTypes.string.isRequired,
  /** Max possible date  */
  maxDate: PropTypes.instanceOf(Date),
  /** Minimum possible date  */
  minDate: PropTypes.instanceOf(Date),
  /** Spec attribute  */
  name: PropTypes.string,
  /** onChange event  */
  onChange: PropTypes.func.isRequired,
  /** onFocus event  */
  onFocus: PropTypes.func,
  /** onBlur event  */
  onBlur: PropTypes.func,
  /** Placeholder text  */
  placeholder: PropTypes.string,
  /** Spec attribute  */
  readOnly: PropTypes.bool,
  /** Spec attribute  */
  required: PropTypes.bool,
  /** DatePicker size  */
  size: PropTypes.oneOf(['small', 'regular', 'large']),
  /** Spec attribute  */
  tabIndex: PropTypes.string,
  /** Interval between times (in min)  */
  timeIntervals: PropTypes.number,
  /** Flag used fo indicating whether to use time or not  */
  useTime: PropTypes.bool,
  /** Value of the selected date  */
  value: PropTypes.instanceOf(Date).isRequired,
}

export default DatePicker
