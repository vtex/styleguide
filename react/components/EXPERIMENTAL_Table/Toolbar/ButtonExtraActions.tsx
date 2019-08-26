import React, { FC } from 'react'

import ActionMenu from '../../ActionMenu/index'
import IconOptionsDots from '../../icon/OptionsDots/index'

const ButtonExtraActions: FC<ButtonExtraActionsProps> = ({
  label,
  actions,
}) => {
  return (
    <div title={label} className="mh2 order-4">
      <ActionMenu
        hideCaretIcon
        buttonProps={{
          variation: 'tertiary',
          icon: (
            <span className="c-on-base">
              <IconOptionsDots />
            </span>
          ),
          size: 'small',
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

export type ButtonExtraActionsProps = {
  label?: string
  actions: Array<MenuAction>
  alignMenu?: 'right' | 'left'
  isLoading?: boolean
}

export default ButtonExtraActions
