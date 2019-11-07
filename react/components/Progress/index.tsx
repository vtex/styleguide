import PropTypes from 'prop-types'
import React from 'react'
import ProgressBar, { ProgressBarTypes } from '../ProgressBar'
import { ProgressLine, ProgressLineTypes } from './Line'

const propTypes = {
  type: PropTypes.oneOf(['line', 'steps']),
  ...ProgressLineTypes,
  ...ProgressBarTypes,
}

const Progress: React.FC<PropTypes.InferProps<typeof propTypes>> = props => {
  if (props.type === 'line') {
    return <ProgressLine percent={props.percent} />
  }

  return (
    <ProgressBar steps={props.steps} danger={props.danger} slim={props.slim} />
  )
}

Progress.propTypes = propTypes

Progress.defaultProps = {
  type: 'steps',
}

export default Progress
