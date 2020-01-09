import React from 'react'
import PropTypes from 'prop-types'

import { baseClassname } from '../icon/utils'

const radius = 40
const circ = 2 * radius * Math.PI

class Spinner extends React.Component {
  render() {
    const { color, size, block } = this.props

    return (
      <svg
        className={`${baseClassname('spinner')} ${
          !color ? 'c-action-primary' : ''
        } ${block ? 'db' : ''}`}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 100 100"
        preserveAspectRatio="xMidYMid"
        height={size}
        width={size}>
        <style>
          {`
            @keyframes vtex-spinner-rotate {
              from {
                transform-origin: 50% 50%;
                transform: rotate(0deg);
              }
              to {
                transform-origin: 50% 50%;
                transform: rotate(360deg);
              }
            }

            @keyframes vtex-spinner-fill {
              0% {
                stroke-dasharray: 0 0 2 ${circ};
              }
              50% {
                stroke-dasharray: 0 0 ${circ * 0.75} ${circ};
              }
              100% {
                stroke-dasharray: 0 ${circ - 2} ${circ * 0.75} ${circ};
              }
            }

            .vtex-spinner_circle {
              animation: vtex-spinner-fill 1.25s infinite cubic-bezier(0.455, 0.030, 0.515, 0.955), vtex-spinner-rotate 0.625s infinite linear;
            }
          `}
        </style>

        <circle
          className="vtex-spinner_circle"
          cx="50"
          cy="50"
          fill="none"
          r={radius}
          stroke={color || 'currentColor'}
          strokeWidth="10"
          strokeDasharray={`0 0 ${circ * 0.75} ${circ}`}
          strokeLinecap="round"
          strokeDashoffset="1"
        />
      </svg>
    )
  }
}

Spinner.propTypes = {
  /** Color of the spinner */
  color: PropTypes.string,
  /** Size (diameter) of the spinner */
  size: PropTypes.number,
  /** Sets the display to block */
  block: PropTypes.bool,
}

Spinner.defaultProps = {
  block: false,
  size: 40,
}

export default Spinner
