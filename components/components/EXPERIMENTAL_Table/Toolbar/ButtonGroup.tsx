import React, { FC } from 'react'
import classNames from 'classnames'

import { ButtonProps } from './Button'
import ButtonColumns, { ButtonColumnsProps } from './ButtonColumns'
import ButtonDensity, { ButtonDensityProps } from './ButtonDensity'
import ButtonDownload from './ButtonDownload'
import ButtonUpload from './ButtonUpload'
import ButtonExtraActions, {
  ButtonExtraActionsProps,
} from './ButtonExtraActions'
import ButtonNewLine, { ButtonNewLineProps } from './ButtonNewLine'
import { NAMESPACES, ORDER_CLASSNAMES } from '../constants'
import { useToolbarContext, ButtonGroupProvider } from './context'

const getButton = (type: ButtonType, props: Props) => {
  switch (type) {
    case ButtonType.Columns: {
      return (
        <span
          className={ORDER_CLASSNAMES.TOOLBAR_CHILD.BUTTON_GROUP_CHILD.COLUMNS}>
          <ButtonColumns {...(props as ButtonColumnsProps)} />
        </span>
      )
    }
    case ButtonType.Density: {
      return (
        <span
          className={ORDER_CLASSNAMES.TOOLBAR_CHILD.BUTTON_GROUP_CHILD.DENSITY}>
          <ButtonDensity {...(props as ButtonDensityProps)} />
        </span>
      )
    }
    case ButtonType.Download: {
      return (
        <span
          className={
            ORDER_CLASSNAMES.TOOLBAR_CHILD.BUTTON_GROUP_CHILD.DOWNLOAD
          }>
          <ButtonDownload {...(props as ButtonProps)} />
        </span>
      )
    }
    case ButtonType.Upload: {
      return (
        <span
          className={ORDER_CLASSNAMES.TOOLBAR_CHILD.BUTTON_GROUP_CHILD.UPLOAD}>
          <ButtonUpload {...(props as ButtonProps)} />
        </span>
      )
    }
    case ButtonType.ExtraActions: {
      return (
        <span
          className={
            ORDER_CLASSNAMES.TOOLBAR_CHILD.BUTTON_GROUP_CHILD.EXTRA_ACTIONS
          }>
          <ButtonExtraActions {...(props as ButtonExtraActionsProps)} />
        </span>
      )
    }
    case ButtonType.NewLine: {
      return (
        <span
          className={ORDER_CLASSNAMES.TOOLBAR_CHILD.BUTTON_GROUP_CHILD.NEWLINE}>
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

const ButtonGroup: FC & Composites = ({ children }) => {
  const { testId } = useToolbarContext()
  const buttonGroupTestId = `${testId}__button-group`
  return (
    <div
      id={NAMESPACES.TOOLBAR.BUTTON_GROUP}
      data-testid={buttonGroupTestId}
      className={classNames(
        ORDER_CLASSNAMES.TOOLBAR_CHILD.BUTTON_GROUP,
        'flex flex-row flex-wrap items-center'
      )}>
      <ButtonGroupProvider testId={buttonGroupTestId}>
        {children}
      </ButtonGroupProvider>
    </div>
  )
}

enum ButtonType {
  Columns,
  Density,
  Download,
  Upload,
  ExtraActions,
  NewLine,
}

type Composites = {
  Columns: FC<ButtonColumnsProps>
  Density: FC<ButtonDensityProps>
  Download: FC<ButtonProps>
  Upload: FC<ButtonProps>
  ExtraActions: FC<ButtonExtraActionsProps>
  NewLine: FC<ButtonNewLineProps>
}

type Props =
  | ButtonProps
  | ButtonColumnsProps
  | ButtonDensityProps
  | ButtonExtraActionsProps
  | ButtonNewLineProps

ButtonGroup.Columns = getComponent(ButtonType.Columns)
ButtonGroup.Density = getComponent(ButtonType.Density)
ButtonGroup.Download = getComponent(ButtonType.Download)
ButtonGroup.Upload = getComponent(ButtonType.Upload)
ButtonGroup.ExtraActions = getComponent(ButtonType.ExtraActions)
ButtonGroup.NewLine = getComponent(ButtonType.NewLine)

export default ButtonGroup
