import React from 'react'
import PropTypes from 'prop-types'

import { baseClassname } from '../icon/utils'

const radius = 40
const circ = 2 * radius * Math.PI

class Spinner extends React.Component {
  render() {
    const { color, size, block } = this.props

    return (
      <>
        <style>
          {`
            @keyframes vtex-spinner-rotate {
              from {
                transform: translate3d(0,0,0) rotate(0deg);
              }
              to {
                transform: translate3d(0,0,0) rotate(360deg);
              }
            }

            .${baseClassname('spinner')} {
              transform-origin: 50% 50%;
              animation: vtex-spinner-rotate 0.625s infinite linear;
            }
          `}
        </style>
        <svg
          className={`${baseClassname('spinner')} ${
            !color ? 'c-action-primary' : ''
          } ${block ? 'db' : 'dib'}`}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 100 100"
          preserveAspectRatio="xMidYMid"
          height={size}
          width={size}>
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
      </>
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
