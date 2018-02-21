import React from 'react'
import PropTypes from 'prop-types'
import './index.css'

const Spinner = ({ secondary, width, heigth }) => (
  <svg
    width={width}
    heigth={heigth}
    className="spinner"
    viewBox="0 0 66 66"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle
      className="path"
      stroke={secondary ? 'white' : '#368df7'}
      fill="none"
      strokeWidth="6"
      strokeLinecap="round"
      cx="33"
      cy="33"
      r="30"
    />
  </svg>
)

Spinner.propTypes = {
  secondary: PropTypes.bool,
  width: PropTypes.number,
  heigth: PropTypes.number,
}

Spinner.defaultProps = {
  secondary: false,
  width: '',
  heigth: '',
}

export default Spinner
