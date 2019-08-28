import React, { FC } from 'react'

import IconDownload from '../../icon/Download/index.js'
import IconUpload from '../../icon/Upload/index.js'

import Button, { ButtonProps } from './Button'
import ButtonDensity, { ButtonDensityProps } from './ButtonDensity'
import ButtonExtraActions, {
  ButtonExtraActionsProps,
} from './ButtonExtraActions'
import ButtonNewLine, { ButtonNewLineProps } from './ButtonNewLine'

import { ICON_SIZE, NAMESPACES } from '../constants'

type ButtonType = 'density' | 'download' | 'upload' | 'extraActions' | 'newLine'

interface Composites {
  Density: FC<ButtonDensityProps>
  Download: FC<ButtonProps>
  Upload: FC<ButtonProps>
  ExtraActions: FC<ButtonExtraActionsProps>
  NewLine: FC<ButtonNewLineProps>
}

type Props =
  | ButtonProps
  | ButtonDensityProps
  | ButtonExtraActionsProps
  | ButtonNewLineProps

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
            id={NAMESPACES.TOOLBAR.BUTTON_DOWNLOAD}
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
            id={NAMESPACES.TOOLBAR.BUTTON_UPLOAD}
            icon={<IconUpload size={ICON_SIZE.HEAVY} />}
            {...(props as ButtonProps)}
          />
        </span>
      )
    }
    case 'extraActions': {
      return (
        <span className="order-4">
          <ButtonExtraActions {...(props as ButtonExtraActionsProps)} />
        </span>
      )
    }
    case 'newLine': {
      return (
        <span className="order-5">
          <ButtonNewLine {...(props as ButtonNewLineProps)} />
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
  <div
    id={NAMESPACES.TOOLBAR.BUTTON_GROUP}
    className="order-1 flex flex-row items-center">
    {children}
  </div>
)

ButtonGroup.Density = getComponent('density')
ButtonGroup.Download = getComponent('download')
ButtonGroup.Upload = getComponent('upload')
ButtonGroup.ExtraActions = getComponent('extraActions')
ButtonGroup.NewLine = getComponent('newLine')

export default ButtonGroup
