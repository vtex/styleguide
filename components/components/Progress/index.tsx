import PropTypes from 'prop-types'
import React from 'react'

import { ProgressSteps, ProgressStepsTypes } from './Steps'
import { ProgressLine, ProgressLineTypes } from './Line'

const propTypes = {
  type: PropTypes.oneOf(['line', 'steps']),
  ...ProgressLineTypes,
  ...ProgressStepsTypes,
}

const Progress: React.FC<PropTypes.InferProps<typeof propTypes>> = props => {
  if (props.type === 'line') {
    return <ProgressLine percent={props.percent} />
  }

  return (
    <ProgressSteps
      steps={props.steps}
      danger={props.danger}
      slim={props.slim}
    />
  )
}

Progress.propTypes = propTypes

Progress.defaultProps = {
  type: 'steps',
}

export default Progress
