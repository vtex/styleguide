import React, { FC } from 'react'

import ActionMenu from '../../ActionMenu/index.js'
import ButtonGroup from '../../ButtonGroup/index.js'
import IconPlus from '../../icon/Plus/index.js'

import Button, {
  ButtonProps,
  ButtonVariation,
  ButtonSize,
  IconSize,
} from './Button'
import { NAMESPACES } from '../constants'
import { MenuAction } from './PopoverMenu'

const ButtonNewLine: FC<ButtonNewLineProps> = ({ actions, ...buttonProps }) => {
  const namespace = NAMESPACES.TOOLBAR.BUTTON_NEWLINE
  return actions ? (
    <ButtonGroup
      buttons={[
        <Button
          isActiveOfGroup
          id={namespace}
          key={namespace}
          isGrouped
          isFirstOfGroup
          variation={ButtonVariation.Primary}
          icon={<IconPlus solid size={IconSize.Light} />}
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
      icon={<IconPlus solid size={IconSize.Light} />}
      variation={ButtonVariation.Primary}
      {...buttonProps}
    />
  )
}

ButtonNewLine.defaultProps = {
  size: ButtonSize.Small,
}

export type ButtonNewLineProps = ButtonProps & {
  actions: Array<MenuAction>
}

export default ButtonNewLine
