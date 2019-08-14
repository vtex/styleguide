import React from 'react'
import PropTypes from 'prop-types'

import ButtonDensity from './ButtonDensity'

const BUTTON_TYPES = {
  DENSITY: 1,
}

const getButton = (type, props) => {
  switch (type) {
    case BUTTON_TYPES.DENSITY: {
      return (
        <span className="order-1">
          <ButtonDensity {...props} />
        </span>
      )
    }
    default: {
      return null
    }
  }
}

const getComponent = type => {
  return props => getButton(type, props)
}

const ButtonGroup = ({ children }) => (
  <div className="flex flex-row items-center">{children}</div>
)

ButtonGroup.Density = getComponent(BUTTON_TYPES.DENSITY)

ButtonGroup.propTyes = {
  children: PropTypes.any,
}

export default ButtonGroup
