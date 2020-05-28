import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

import { scrollStep, roundedRight, roundedLeft } from './styles.css'

const COMPLETED = 'completed'
const IN_PROGRESS = 'inProgress'
const TO_DO = 'toDo'

class Step extends PureComponent {
  render() {
    const { type, roundLeft, roundRight, danger, slim } = this.props

    const halfOpacity = 'rgba(255, 255, 255, 0.5)'
    const fullOpacity = 'rgba(255, 255, 255, 0)'
    const gradientBackgroundStyle = {
      background: `repeating-linear-gradient(-45deg,  ${fullOpacity}, ${fullOpacity} 10px, ${halfOpacity} 10px, ${halfOpacity} 20px)`,
    }

    const backgroundColorClass = danger ? 'bg-danger' : 'bg-action-primary'

    const roundLeftCSS = roundLeft ? roundedLeft : ''
    const roundRightCSS = roundRight ? roundedRight : ''
    const roundingStyle =
      roundLeft && roundRight ? 'br2' : roundRightCSS || roundLeftCSS

    const paddingClass = slim ? 'pa1' : 'pa2'

    switch (type) {
      case IN_PROGRESS:
        return (
          <div
            className={`relative ${paddingClass} ${backgroundColorClass} overflow-hidden ${roundingStyle}`}>
            <div
              style={gradientBackgroundStyle}
              className={`${scrollStep} absolute top-0 bottom-0 right-0 left--2 pr2`}
            />
          </div>
        )
      case COMPLETED:
        return (
          <div
            className={`${roundingStyle} ${paddingClass} ${backgroundColorClass} flex flex-row`}
          />
        )
      case TO_DO:
      default:
        return (
          <div
            className={`${roundingStyle} ${paddingClass} bg-muted-3 flex flex-row `}
          />
        )
    }
  }
}

Step.propTypes = {
  type: PropTypes.oneOf([COMPLETED, IN_PROGRESS, TO_DO]).isRequired,
  roundLeft: PropTypes.bool,
  roundRight: PropTypes.bool,
  danger: PropTypes.bool,
  slim: PropTypes.bool,
}

export default Step
