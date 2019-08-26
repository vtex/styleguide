import React, { FC } from 'react'

import ActionMenu from '../../ActionMenu/index.js'
import ButtonGroup from '../../ButtonGroup/index.js'
import IconPlus from '../../icon/Plus/index.js'

import Button, { ButtonProps } from './Button'
import { ICON_SIZE } from '../constants'

const ButtonNewLine: FC<ButtonNewLineProps> = ({ actions, ...buttonProps }) => {
  return actions ? (
    <ButtonGroup
      buttons={[
        <Button
          isActiveOfGroup
          key="new-line-button"
          variation="primary"
          icon={<IconPlus solid size={ICON_SIZE.LIGHT} />}
          {...buttonProps}
        />,
        <ActionMenu
          isActiveOfGroup
          key="actions-button"
          buttonProps={buttonProps}
          options={actions}
        />,
      ]}
    />
  ) : (
    <Button
      icon={<IconPlus solid size={ICON_SIZE.LIGHT} />}
      variation="primary"
      {...buttonProps}
    />
  )
}

ButtonNewLine.defaultProps = {
  size: 'small',
}

type Action = {
  label: string
  onClick: Function
  toggle: {
    checked: boolean
    semantic: boolean
  }
}

export type ButtonNewLineProps = ButtonProps & {
  actions: Array<Action>
}

export default ButtonNewLine
