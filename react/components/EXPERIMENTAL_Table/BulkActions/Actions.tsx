import React from 'react'
import classNames from 'classnames'

import Button from '../../Button'
import ActionMenu from '../../ActionMenu'
import { MenuAction } from '../Toolbar/PopoverMenu'
import { ORDER_CLASSNAMES } from '../constants'

const ACTION_MARGIN = 'mr4'

export default function Actions({ children }) {
  const className = classNames(
    'flex flex-row',
    ORDER_CLASSNAMES.BULK_CHILD.ACTIONS
  )
  return <div className={className}>{children}</div>
}

Actions.Primary = Primary
Actions.Secondary = Secondary

function Primary({ label, onClick }: PrimaryProps) {
  const className = classNames(
    ACTION_MARGIN,
    ORDER_CLASSNAMES.BULK_CHILD.ACTIONS_CHILD.PRIMARY
  )
  return (
    <div className={className}>
      <Button variation="secondary" size="small" onClick={onClick}>
        {label}
      </Button>
    </div>
  )
}

function Secondary({ label, actions, onActionClick }: SecondaryProps) {
  const className = classNames(
    ACTION_MARGIN,
    ORDER_CLASSNAMES.BULK_CHILD.ACTIONS_CHILD.SECONDARY
  )
  return (
    <div className={className}>
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

type PrimaryProps = {
  label: string
  onClick: () => void
}

type SecondaryProps = {
  label: string
  actions: Array<MenuAction>
  onActionClick: (el: MenuAction) => void
}
