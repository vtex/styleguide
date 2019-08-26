import React, { FC } from 'react'

import IconDownload from '../../icon/Download/index.js'
import IconUpload from '../../icon/Upload/index.js'
import ButtonDensity, { ButtonDensityProps } from './ButtonDensity'
import Button, { ButtonProps } from './Button'
import { ICON_SIZE } from '../constants'

type ButtonType = 'density' | 'download' | 'upload'

interface Composites {
  Density: FC<ButtonDensityProps>
  Download: FC<ButtonProps>
  Upload: FC<ButtonProps>
}

type Props = ButtonProps | ButtonDensityProps

const getButton = (type: ButtonType, props: Props) => {
  switch (type) {
    case 'density': {
      return (
        <span className="order-1">
          <ButtonDensity {...(props as ButtonDensityProps)} />
        </span>
      )
    }
    case 'download': {
      return (
        <span className="order-2">
          <Button
            id="download"
            icon={<IconDownload size={ICON_SIZE.HEAVY} />}
            {...(props as ButtonProps)}
          />
        </span>
      )
    }
    case 'upload': {
      return (
        <span className="order-3">
          <Button
            id="upload"
            icon={<IconUpload size={ICON_SIZE.HEAVY} />}
            {...(props as ButtonProps)}
          />
        </span>
      )
    }
    default: {
      return null
    }
  }
}

const getComponent = (type: ButtonType) => {
  return (props: Props) => getButton(type, props)
}

const ButtonGroup: FC & Composites = ({ children }) => (
  <div className="flex flex-row items-center">{children}</div>
)

ButtonGroup.Density = getComponent('density')
ButtonGroup.Download = getComponent('download')
ButtonGroup.Upload = getComponent('upload')

export default ButtonGroup
