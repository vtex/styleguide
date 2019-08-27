import React, { FC } from 'react'

import ActionMenu from '../../ActionMenu/index.js'
import ButtonGroup from '../../ButtonGroup/index.js'
import IconPlus from '../../icon/Plus/index.js'

import Button, { ButtonProps } from './Button'
import { ICON_SIZE, NAMESPACES } from '../constants'

const ButtonNewLine: FC<ButtonNewLineProps> = ({ actions, ...buttonProps }) => {
  const namespace = NAMESPACES.TOOLBAR.BUTTON_NEWLINE
  return actions ? (
    <ButtonGroup
      buttons={[
        <Button
          isActiveOfGroup
          id={namespace}
          key={namespace}
          variation="primary"
          icon={<IconPlus solid size={ICON_SIZE.LIGHT} />}
          {...buttonProps}
        />,
        <ActionMenu
          isActiveOfGroup
          id={`${namespace}__action-menu`}
          key="actions-button"
          buttonProps={buttonProps}
          options={actions}
        />,
      ]}
    />
  ) : (
    <Button
      id={NAMESPACES.TOOLBAR.BUTTON_NEWLINE}
      icon={<IconPlus solid size={ICON_SIZE.LIGHT} />}
      variation="primary"
      {...buttonProps}
    />
  )
}

ButtonNewLine.defaultProps = {
  size: 'small',
}

export type ButtonNewLineProps = ButtonProps & {
  actions: Array<MenuAction>
}

export default ButtonNewLine
