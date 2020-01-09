import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

import Step from './Step'

export const ProgressStepsTypes = {
  /** Array of steps, it should be composed of instances of the following strings:'completed', 'inProgress' and 'toDo' */
  steps: PropTypes.arrayOf(
    PropTypes.oneOf(['completed', 'inProgress', 'toDo'])
  ),
  /** Boolean representing a dangerous state of the progress (e.g. a late or critical progress), if true this changes the color of the steps */
  danger: PropTypes.bool,
  /** Boolean representing if the progress bar should be slim or not, if true this decreases the height of the bar */
  slim: PropTypes.bool,
}

export class ProgressSteps extends PureComponent {
  isFirstElement(index) {
    return index === 0
  }

  isLastElement(index, array) {
    return index === array.length - 1
  }

  render() {
    const { steps, danger, slim } = this.props

    const stepsElements = steps.map((type, index) => {
      const isFirstElement = this.isFirstElement(index)
      const isLastElement = this.isLastElement(index, steps)

      const marginRightCSS = isLastElement ? '' : 'mr2'
      return (
        <div className={`w-100 ${marginRightCSS}`} key={index}>
          <Step
            type={type}
            roundLeft={isFirstElement}
            roundRight={isLastElement}
            danger={danger}
            slim={slim}
          />
        </div>
      )
    })
    return <div className="w-100 mb3 inline-flex flex-row">{stepsElements}</div>
  }
}

ProgressSteps.propTypes = ProgressStepsTypes
