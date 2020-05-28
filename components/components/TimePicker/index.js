import React from 'react'
import PropTypes from 'prop-types'

import DatePicker from '../DatePicker'
import IconClock from '../icon/Clock'
import { withForwardedRef, refShape } from '../../modules/withForwardedRef'

function TimePicker(props) {
  return (
    <DatePicker
      {...props}
      ref={props.forwardedRef}
      timeIntervals={props.interval}
      prefix={<IconClock />}
      useTimeOnly
    />
  )
}

TimePicker.propTypes = {
  /** @ignore Forwarded Ref */
  forwardedRef: refShape,
  /** Popper alignment in relation to the input */
  align: PropTypes.oneOf(['left', 'right']),
  /** Spec attribute  */
  autoFocus: PropTypes.bool,
  /** Popper position in relation to the input */
  direction: PropTypes.oneOf(['down', 'up']),
  /** Spec attribute  */
  disabled: PropTypes.bool,
  /** Error highlight  */
  error: PropTypes.bool,
  /** Error message  */
  errorMessage: PropTypes.string,
  /** Times to be excluded  */
  excludeTimes: PropTypes.arrayOf(PropTypes.instanceOf(Date)),
  /** Help text  */
  helpText: PropTypes.node,
  /** Spec attribute  */
  id: PropTypes.string,
  /** Times to be included  */
  includeTimes: PropTypes.arrayOf(PropTypes.instanceOf(Date)),
  /** Interval between times */
  interval: PropTypes.oneOf([5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60]),
  /** Label  */
  label: PropTypes.string,
  /** Locale string ('en-US', 'pt-BR', ...)  */
  locale: PropTypes.string.isRequired,
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
  /** TimePicker size  */
  size: PropTypes.oneOf(['small', 'regular', 'large']),
  /** Spec attribute  */
  tabIndex: PropTypes.string,
  /** Interval between times (in min)  */
  intervals: PropTypes.number,
  /** Value of the selected time  */
  value: PropTypes.instanceOf(Date).isRequired,
}

export default withForwardedRef(TimePicker)
