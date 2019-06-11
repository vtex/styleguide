import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ReactDatePicker, { registerLocale } from 'react-datepicker'
import * as locales from 'date-fns/locale/index.js'
import Input from '../Input'
import IconCalendar from '../icon/Calendar'

import './react-datepicker.global.css'
import { withForwardedRef, refShape } from '../../modules/withForwardedRef'

class DatePicker extends Component {
  constructor(props) {
    super(props)

    this.state = {
      active: false,
    }

    this.handleLocaleChange(props.locale)
  }

  get popperModifiers() {
    const { align, direction, size, useTime } = this.props

    const BASE_MODIFIERS = {
      hide: { enabled: false },
      preventOverflow: {
        enabled: false,
      },
    }

    const isRightAligned = align === 'right'
    const isUpwards = direction === 'up'

    if (!isRightAligned && !isUpwards) {
      return BASE_MODIFIERS
    }

    const offsetX = isRightAligned
      ? (size === 'large' ? -91 : -136) - (useTime ? 130 : 0)
      : 0

    const offsetYBySize = {
      large: -448,
      regular: -440,
      small: -432,
    }

    const offsetY = isUpwards ? offsetYBySize[size] - (useTime ? 18 : 0) : 0

    return {
      ...BASE_MODIFIERS,
      flip: {
        enabled: !isUpwards,
      },
      keepTogether: {
        enabled: false,
      },
      offset: {
        offset: `${offsetX}, ${offsetY}`,
      },
    }
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
    // registerLocale is a function from react-datepicker component that loads
    // an imported locale object from date-fns.
    //
    // For more information visit the link below:
    // https://github.com/Hacker0x01/react-datepicker#localization
    //
    registerLocale(locale, locales[locale.replace('-', '')])
  }

  componentDidUpdate(prevProps) {
    if (this.props.locale !== prevProps.locale) {
      this.handleLocaleChange(this.props.locale)
    }
  }

  render() {
    const { positionFixed } = this.props

    const popperProps = {
      ...(positionFixed && {
        positionFixed: true,
      }),
    }

    return (
      <ReactDatePicker
        autoFocus={this.props.autoFocus}
        customInput={
          <Input
            ref={this.props.forwardedRef}
            error={this.props.error}
            errorMessage={this.props.errorMessage || this.state.errorMessage}
            helpText={this.props.helpText}
            label={this.props.label}
            prefix={<IconCalendar />}
            size={this.props.size}
          />
        }
        // 'legacyRef' customInputRef is a workaround for this https://bit.ly/2W2Fm3U
        // until this PR  https://github.com/Hacker0x01/react-datepicker/pull/1602
        // is merged
        customInputRef={'legacyRef'}
        dateFormat={this.props.useTime ? 'Pp' : 'P'}
        disabled={this.props.disabled}
        endDate={this.props.dateRangeEnd}
        excludeDates={this.props.excludeDates}
        excludeTimes={this.props.excludeTimes}
        fixedHeight={this.props.direction === 'up'}
        id={this.props.id}
        includeDates={this.props.includeDates}
        includeTimes={this.props.includeTimes}
        locale={this.props.locale}
        maxDate={this.props.maxDate}
        maxTime={this.props.maxTime}
        minDate={this.props.minDate}
        minTime={this.props.minTime}
        name={this.props.name}
        placeholderText={this.props.placeholder}
        popperModifiers={this.popperModifiers}
        popperProps={popperProps}
        readOnly={this.props.readOnly}
        required={this.props.required}
        selected={this.props.value}
        selectsEnd={this.props.isRangeEnd}
        selectsStart={this.props.isRangeStart}
        showDisabledMonthNavigation={this.props.limitMonthNavigation}
        showTimeSelect={this.props.useTime}
        startDate={this.props.dateRangeStart}
        tabIndex={this.props.tabIndex}
        timeFormat="p"
        timeIntervals={this.props.timeIntervals}
        onBlur={this.props.onBlur}
        onFocus={this.props.onFocus}
        onChange={this.props.onChange}
        onChangeRaw={event => {
          event.preventDefault()
        }}
      />
    )
  }
}

DatePicker.defaultProps = {
  align: 'left',
  autoFocus: false,
  direction: 'down',
  disabled: false,
  error: false,
  label: '',
  limitMonthNavigation: false,
  readOnly: false,
  required: false,
  size: 'regular',
}

DatePicker.propTypes = {
  /** @ignore Forwarded Ref */
  forwardedRef: refShape,
  /** Popper alignment in relation to the input */
  align: PropTypes.oneOf(['left', 'right']),
  /** Spec attribute  */
  autoFocus: PropTypes.bool,
  /** @ignore Date range end date */
  dateRangeEnd: PropTypes.instanceOf(Date),
  /** @ignore Date range start date */
  dateRangeStart: PropTypes.instanceOf(Date),
  /** Popper position in relation to the input */
  direction: PropTypes.oneOf(['down', 'up']),
  /** Spec attribute  */
  disabled: PropTypes.bool,
  /** Error highlight  */
  error: PropTypes.bool,
  /** Error message  */
  errorMessage: PropTypes.string,
  /** Dates to be excluded  */
  excludeDates: PropTypes.arrayOf(PropTypes.instanceOf(Date)),
  /** Times to be excluded  */
  excludeTimes: PropTypes.arrayOf(PropTypes.instanceOf(Date)),
  /** Help text  */
  helpText: PropTypes.node,
  /** Spec attribute  */
  id: PropTypes.string,
  /** Dates to be included  */
  includeDates: PropTypes.arrayOf(PropTypes.instanceOf(Date)),
  /** Dates to be included  */
  includeTimes: PropTypes.arrayOf(PropTypes.instanceOf(Date)),
  /** @ignore Indicates that the input represents the end date of a date range */
  isRangeEnd: PropTypes.bool,
  /** @ignore Indicates that the input represents the start date of a date range */
  isRangeStart: PropTypes.bool,
  /** Label  */
  label: PropTypes.string,
  /** Disables out-of-bounds month navigation */
  limitMonthNavigation: PropTypes.bool,
  /** Locale string ('en-US', 'pt-BR', ...)  */
  locale: PropTypes.string.isRequired,
  /** Max possible date  */
  maxDate: PropTypes.instanceOf(Date),
  /** Upper time limit */
  maxTime: PropTypes.instanceOf(Date),
  /** Minimum possible date  */
  minDate: PropTypes.instanceOf(Date),
  /** Lower time limit */
  minTime: PropTypes.instanceOf(Date),
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
  /** Flag used for indicating whether to use time or not  */
  useTime: PropTypes.bool,
  /** Value of the selected date  */
  value: PropTypes.instanceOf(Date).isRequired,
  /** Sets the popper to position fixed. Fixes issues with overflow: hidden. */
  positionFixed: PropTypes.boolean,
}

export default withForwardedRef(DatePicker)
