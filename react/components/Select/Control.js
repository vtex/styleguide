import React from 'react'
import PropTypes from 'prop-types'
import { components } from 'react-select'

function heightClassFromSize(size) {
  return {
    [size]: 'h-regular',
    large: 'h-large',
    small: 'h-small',
  }[size]
}

const Control = ({ errorMessage, size, ...props }) => {
  return (
    <div
      className={`pa0 bw1 ${
        errorMessage ? 'b--danger' : ''
      } ${heightClassFromSize(size)}`}>
      <components.Control {...props} />
    </div>
  )
}

Control.propTypes = {
  errorMessage: PropTypes.string,
  size: PropTypes.oneOf(['large', 'regular', 'small']),
}

export default Control
