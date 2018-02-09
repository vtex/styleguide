import React from 'react'
import PropTypes from 'prop-types'
import './index.css'

const Spinner = ({ secondary }) => (
  <svg
    className="spinner"
    viewBox="0 0 66 66"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle
      className="path"
      stroke={secondary ? 'white' : '#3791e6'}
      fill="none"
      strokeWidth="6"
      strokeLinecap="round"
      cx="33"
      cy="33"
      r="30"
    />
  </svg>
)

Spinner.defaultProps = {
  secondary: false,
}

Spinner.propTypes = {
  secondary: PropTypes.bool,
}

export default Spinner
