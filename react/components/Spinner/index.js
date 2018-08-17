import React from 'react'
import PropTypes from 'prop-types'
import { baseClassname } from '../icon/utils'

const radius = 40
const circ = 2 * radius * Math.PI

const Spinner = ({ color, size, block }) => (
  <svg
    className={`${baseClassname('spinner')} ${block ? 'db' : ''}`}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 100 100"
    preserveAspectRatio="xMidYMid"
    height={size}
    width={size}
  >
    <circle
      cx="50"
      cy="50"
      fill="none"
      r={radius}
      stroke={color}
      strokeWidth="10"
      strokeDasharray={`0 0 2 ${circ}`}
      strokeLinecap="round"
      strokeDashoffset="1"
      transform="rotate(96 50 50)"
    >
      <animate
        attributeName="stroke-dasharray"
        dur="1.5s"
        repeatCount="indefinite"
        values={
          `0 0 2 ${circ};
          0 0 ${circ * 0.75} ${circ};
          0 ${circ - 2} ${circ * 0.75} ${circ}`
        }
      />
      <animateTransform
        attributeName="transform"
        type="rotate"
        calcMode="linear"
        values="0 50 50;360 50 50"
        keyTimes="0;1"
        dur="0.75s"
        begin="0s"
        repeatCount="indefinite"
      />
    </circle>
  </svg>
)

Spinner.propTypes = {
  block: PropTypes.bool,
  color: PropTypes.string,
  size: PropTypes.number,
}

Spinner.defaultProps = {
  block: false,
  color: 'currentColor',
  size: 40,
}

export default Spinner
