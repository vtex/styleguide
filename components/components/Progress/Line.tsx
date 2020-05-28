import cn from 'classnames'
import PropTypes from 'prop-types'
import React from 'react'

import styles from './styles.css'

export const ProgressLineTypes = {
  percent: PropTypes.number.isRequired,
}

export const ProgressLine: React.FC<PropTypes.InferProps<
  typeof ProgressLineTypes
>> = props => {
  const barClasses = cn(
    styles.progressHeight,
    'w-100 br4 overflow-hidden bg-light-silver'
  )
  const stepClasses = cn(styles.progressHeight, 'br4', {
    'bg-action-primary': props.percent !== 100,
    'bg-success': props.percent === 100,
  })
  return (
    <div className={barClasses}>
      <div className={stepClasses} style={{ width: `${props.percent}%` }} />
    </div>
  )
}

ProgressLine.propTypes = ProgressLineTypes
