import React, { FC } from 'react'

import ActionMenu from '../../ActionMenu'
import { MenuAction } from '../Toolbar/PopoverMenu'

const SecondaryActions: FC<SecondaryActionsProps> = ({
  label,
  actions,
  onActionClick,
}) => {
  return (
    <div className="mr4">
      <ActionMenu
        label={label}
        buttonProps={{ variation: 'secondary', size: 'small' }}
        options={actions.map(el => ({
          label: el.label,
          onClick: () => onActionClick(el),
        }))}
      />
    </div>
  )
}

export type SecondaryActionsProps = {
  label: string
  actions: Array<MenuAction>
  onActionClick: (el: MenuAction) => void
}

export default SecondaryActions
