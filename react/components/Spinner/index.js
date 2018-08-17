import React from 'react'
import PropTypes from 'prop-types'
import config from 'vtex-tachyons/config.json'
import { baseClassname } from '../utils'

const radius = 40
const circ = 2 * radius * Math.PI

const Spinner = ({ secondary, size, block }) => (
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
      stroke={secondary ? config.colors.white : config.colors.blue}
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
        values={`0 0 2 ${circ};
          0 0 ${circ * 0.75} ${circ};
          0 ${circ - 2} ${circ * 0.75} ${circ}`}
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
  secondary: PropTypes.bool,
  size: PropTypes.number,
  block: false,
}

Spinner.defaultProps = {
  secondary: false,
  size: 40,
  block: PropTypes.bool,
}

export default Spinner
