import React from 'react'

import ActionMenu from '../ActionMenu'
import ButtonGroup from '../ButtonGroup'
import IconPlus from '../icon/Plus'
import { MenuAction } from './PopoverMenu'
import Button, { IconSize, ButtonVariation, ButtonProps } from './Button'

interface Props extends ButtonProps {
  actions?: Array<MenuAction>
}

function ButtonNewLine({ actions, testId, ...buttonProps }: Props) {
  return actions ? (
    <ButtonGroup
      buttons={[
        <Button
          isActiveOfGroup
          testId={testId}
          key="main-button"
          isGrouped
          isFirstOfGroup
          variation={ButtonVariation.Primary}
          icon={<IconPlus solid size={IconSize.Light} />}
          {...buttonProps}
        />,
        <ActionMenu
          isActiveOfGroup
          testId={`${testId}__action-menu`}
          key="actions-button"
          buttonProps={{ size: 'small', ...buttonProps }}
          options={actions}
        />,
      ]}
    />
  ) : (
    <Button
      testId={testId}
      icon={<IconPlus solid size={IconSize.Light} />}
      variation={ButtonVariation.Primary}
      {...buttonProps}
    />
  )
}

export default ButtonNewLine
