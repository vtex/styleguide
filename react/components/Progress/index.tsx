import cn from 'classnames'
import PropTypes from 'prop-types'
import React from 'react'
import styles from './styles.css'

const propTypes = {
  percent: PropTypes.number.isRequired,
}

const Progress: React.FC<PropTypes.InferProps<typeof propTypes>> = props => {
  const barClasses = cn(
    styles.progressHeight,
    'br4 overflow-hidden bg-light-silver'
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

Progress.propTypes = propTypes

export default Progress
