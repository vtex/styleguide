import React from 'react'
import PropTypes from 'prop-types'

const Spinner = ({ style, secondary, width, height }) => (
  <svg
    width={width}
    height={height}
    className={style.spinner}
    viewBox="0 0 66 66"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle
      className={style.path}
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
  style: PropTypes.object.isRequired,
  secondary: PropTypes.bool,
  width: PropTypes.number,
  height: PropTypes.number,
}

Spinner.defaultProps = {
  secondary: false,
}

export default Spinner
