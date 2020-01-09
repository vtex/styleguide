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

  componentDidMount() {
    if (this.props.useTime) {
      console.warn(
        'DatePicker: The prop "useTime" of the "DatePicker" component has been deprecated, and will be removed in a future version. Please use the "TimePicker" component instead'
      )
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.locale !== prevProps.locale) {
      this.handleLocaleChange(this.props.locale)
    }
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

  render() {
    const { positionFixed, useTime, useTimeOnly } = this.props

    const popperProps = {
      ...(positionFixed && {
        positionFixed: true,
      }),
    }

    const format = useTimeOnly ? 'p' : useTime ? 'Pp' : 'P'

    return (
      <ReactDatePicker
        ref={this.props.forwardedRef}
        // eslint-disable-next-line jsx-a11y/no-autofocus
        autoFocus={this.props.autoFocus}
        customInput={
          <Input
            error={this.props.error}
            errorMessage={this.props.errorMessage || this.state.errorMessage}
            helpText={this.props.helpText}
            label={this.props.label}
            prefix={this.props.prefix}
            size={this.props.size}
          />
        }
        dateFormat={format}
        disabled={this.props.disabled}
        disabledKeyboardNavigation
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
        showTimeSelect={useTime || useTimeOnly}
        startDate={this.props.dateRangeStart}
        showTimeSelectOnly={useTimeOnly}
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
  align: 'left',
  autoFocus: false,
  direction: 'down',
  disabled: false,
  error: false,
  label: '',
  limitMonthNavigation: false,
  prefix: <IconCalendar />,
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
  /** @ignore Date format */
  dateFormat: PropTypes.string,
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
  /** @ignore Prefix component to be used as the prefix of the input */
  prefix: PropTypes.node,
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
  /** @ignore Do not show calendar view */
  useTimeOnly: PropTypes.bool,
  /** Value of the selected date  */
  value: PropTypes.instanceOf(Date).isRequired,
  /** Sets the popper to position fixed. Fixes issues with overflow: hidden. */
  positionFixed: PropTypes.bool,
}

export default withForwardedRef(DatePicker)
