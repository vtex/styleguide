import React, { FC } from 'react'

import ActionMenu from '../../ActionMenu/index'
import IconOptionsDots from '../../icon/OptionsDots/index'
import { NAMESPACES, ORDER_CLASSNAMES } from '../constants'
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
    <div
      title={label}
      className={
        ORDER_CLASSNAMES.TOOLBAR_CHILD.BUTTON_GROUP_CHILD.EXTRA_ACTIONS
      }>
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
  actions: Array<MenuAction>
  label?: string
  alignMenu?: Alignment
  isLoading?: boolean
  size?: ButtonSize
}

export default ButtonExtraActions
