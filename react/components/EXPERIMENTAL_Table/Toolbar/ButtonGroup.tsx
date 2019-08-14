import React, { FC } from 'react'

import ButtonDensity, { ButtonDensityProps } from './ButtonDensity'

type ButtonType = 'density'

interface Composites {
  Density: FC<ButtonDensityProps>
}

const getButton = (type: ButtonType, props: ButtonDensityProps) => {
  switch (type) {
    case 'density': {
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

const getComponent = (type: ButtonType) => {
  return (props: ButtonDensityProps) => getButton(type, props)
}

const ButtonGroup: FC & Composites = ({ children }) => (
  <div className="flex flex-row items-center">{children}</div>
)

ButtonGroup.Density = getComponent('density')

export default ButtonGroup
