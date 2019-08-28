import React, { FC } from 'react'

import ActionMenu from '../../ActionMenu/index'
import IconOptionsDots from '../../icon/OptionsDots/index'
import { NAMESPACES, BUTTON } from '../constants'

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
          variation: BUTTON.VARIATION.TERTIARY,
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
  size: BUTTON.SIZE.SMALL,
}

export type ButtonExtraActionsProps = {
  label?: string
  actions: Array<MenuAction>
  alignMenu?: Alignment
  isLoading?: boolean
  size?: Size
}

export default ButtonExtraActions
