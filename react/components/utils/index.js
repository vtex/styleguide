import PropTypes from 'prop-types'

export const childrenOf = (...types) => {
  const fieldType = PropTypes.shape({
    type: PropTypes.oneOf(types),
  })

  return PropTypes.oneOfType([fieldType, PropTypes.arrayOf(fieldType)])
}

export const isMobileDevice = device => device.toLowerCase() === 'phone'
