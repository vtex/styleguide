import React from 'react'
import PropTypes from 'prop-types'
import { components } from 'react-select'

function heightClassFromSize(size) {
  return {
    [size]: 'min-h-regular',
    large: 'min-h-large',
    small: 'min-h-small',
  }[size]
}

const Control = ({ size, ...props }) => {
  return (
    <div className={`pa0 ${heightClassFromSize(size)}`}>
      <components.Control {...props} />
    </div>
  )
}

Control.propTypes = {
  errorMessage: PropTypes.string,
  size: PropTypes.oneOf(['large', 'regular', 'small']),
}

export default Control
