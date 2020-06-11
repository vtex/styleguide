import React from 'react'

import ActionMenu from '../ActionMenu'
import IconOptionsDots from '../icon/OptionsDots'
import { MenuAction, Alignment } from './PopoverMenu'

interface Props {
  label?: string
  actions: Array<MenuAction>
  alignMenu?: Alignment
  isLoading?: boolean
  testId?: string
}

function ButtonExtraActions({ label, actions, testId }: Props) {
  return (
    <div title={label} className="mh1">
      <ActionMenu
        hideCaretIcon
        buttonProps={{
          variation: 'tertiary',
          testId: `${testId}__extra-actions`,
          size: 'small',
          icon: (
            <span className="c-on-base">
              <IconOptionsDots />
            </span>
          ),
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

export default ButtonExtraActions
