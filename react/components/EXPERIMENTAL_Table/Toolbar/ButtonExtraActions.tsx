import React, { FC } from 'react'

import ActionMenu from '../../ActionMenu/index'
import IconOptionsDots from '../../icon/OptionsDots/index'
import { NAMESPACES } from '../constants'
import { MenuAction, Alignment } from './PopoverMenu'
import { ButtonVariation, ButtonSize } from './Button'

const ButtonExtraActions: FC<ButtonExtraActionsProps> = ({
  label,
  size,
  actions,
}) => {
  return (
    <div
      id={NAMESPACES.TOOLBAR.BUTTON_EXTRA_ACTIONS}
      title={label}
      className="mh2 order-4">
      <ActionMenu
        hideCaretIcon
        buttonProps={{
          variation: ButtonVariation.Tertiary,
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
