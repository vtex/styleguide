import React from 'react'
import PropTypes from 'prop-types'
import config from 'vtex-tachyons/config.json'

const radius = 40
const circ = 2 * radius * Math.PI

const Spinner = ({ secondary, size }) => (
  <svg
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
      strokeLinecap="round"
      strokeDasharray="188.49555921538757 64.83185307179586"
      strokeDashoffset="1"
      transform="rotate(96 50 50)"
    >
      <animate
        attributeName="stroke-dasharray"
        id="anim2"
        dur="3s"
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
}

Spinner.defaultProps = {
  secondary: false,
  size: 40,
}

export default Spinner
