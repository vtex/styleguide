import React from 'react'
import PropTypes from 'prop-types'
import config from 'vtex-tachyons/config.json'

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
      stroke={secondary ? config.colors.white : config.colors.blue}
      strokeWidth="10"
      strokeLinecap="round"
      r="40"
      strokeDasharray="188.49555921538757 64.83185307179586"
      transform="rotate(96 50 50)"
    >
      <animateTransform
        attributeName="transform"
        type="rotate"
        calcMode="linear"
        values="0 50 50;360 50 50"
        keyTimes="0;1"
        dur="1s"
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
