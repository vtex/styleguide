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
import { useButtonGroupContext } from './context'

const ButtonNewLine: FC<ButtonNewLineProps> = ({ actions, ...buttonProps }) => {
  const namespace = NAMESPACES.TOOLBAR.BUTTON_NEWLINE
  const { testId } = useButtonGroupContext()
  const newlineTestId = `${testId}__new-line`
  return actions ? (
    <ButtonGroup
      buttons={[
        <Button
          isActiveOfGroup
          id={namespace}
          testId={newlineTestId}
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
          testId={`${newlineTestId}__action-menu`}
          key="actions-button"
          buttonProps={buttonProps}
          options={actions}
        />,
      ]}
    />
  ) : (
    <Button
      id={NAMESPACES.TOOLBAR.BUTTON_NEWLINE}
      testId={newlineTestId}
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
