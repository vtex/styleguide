import cn from 'classnames'
import PropTypes from 'prop-types'
import React from 'react'
import styles from './styles.css'

const propTypes = {
  value: PropTypes.number.isRequired,
  max: PropTypes.number.isRequired,
  showInfo: PropTypes.bool,
}

const Progress: React.FC<PropTypes.InferProps<typeof propTypes>> = props => {
  const percent = `${(props.value / props.max) * 100}%`
  const barClasses = cn(
    styles.progressHeight,
    'br4 overflow-hidden bg-light-silver'
  )
  const stepClasses = cn(styles.progressHeight, 'br4', {
    'bg-action-primary': props.value !== props.max,
    'bg-success': props.value === props.max,
  })
  return (
    <div className="flex flex-column">
      {props.showInfo && (
        <div className="flex justify-between mb3 f6 near-black">
          <div>{percent}</div>
          <div>{`${props.value} / ${props.max}`}</div>
        </div>
      )}
      <div className={barClasses}>
        <div className={stepClasses} style={{ width: percent }} />
      </div>
    </div>
  )
}

Progress.propTypes = propTypes

Progress.defaultProps = {
  showInfo: true,
}

export default Progress
