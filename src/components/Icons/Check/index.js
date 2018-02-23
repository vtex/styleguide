import React from 'react'
import PropTypes from 'prop-types'

const Check = ({ fill, width, height }) => (
  <svg
    viewBox="0 0 18 18"
    xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
  >
    <path
      d="M6.61 11.89L3.5 8.78 2.44 9.84 6.61 14l8.95-8.95L14.5 4z"
      fill={fill}
    />
  </svg>
)

Check.propTypes = {
  fill: PropTypes.string,
  width: PropTypes.number,
  height: PropTypes.number,
}

export default Check
