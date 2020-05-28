import React, { FC } from 'react'

import ActionMenu from '../../ActionMenu/index'
import IconOptionsDots from '../../icon/OptionsDots/index'
import { NAMESPACES } from '../constants'
import { MenuAction, Alignment } from './PopoverMenu'
import { ButtonVariation, ButtonSize } from './Button'
import { useButtonGroupContext } from './context'

const ButtonExtraActions: FC<ButtonExtraActionsProps> = ({
  label,
  size,
  actions,
}) => {
  const { testId } = useButtonGroupContext()
  return (
    <div title={label} className="mh2 order-4">
      <ActionMenu
        hideCaretIcon
        buttonProps={{
          variation: ButtonVariation.Tertiary,
          id: NAMESPACES.TOOLBAR.BUTTON_EXTRA_ACTIONS,
          testId: `${testId}__extra-actions`,
          icon: (
            <span className="c-on-base">
              <IconOptionsDots />
            </span>
          ),
          size: size,
        }}
        options={actions.map(action => {
          return {
            label: action.label,
            onClick: action.onClick,
          }
        })}
      />
    </div>
  )
}

ButtonExtraActions.defaultProps = {
  size: ButtonSize.Small,
}

export type ButtonExtraActionsProps = {
  label?: string
  actions: Array<MenuAction>
  alignMenu?: Alignment
  isLoading?: boolean
  size?: ButtonSize
}

export default ButtonExtraActions
