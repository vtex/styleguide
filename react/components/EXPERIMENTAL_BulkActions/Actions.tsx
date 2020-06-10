import React from 'react'
import classNames from 'classnames'

import Button from '../../Button'
import ActionMenu from '../../ActionMenu'

const ACTION_MARGIN = 'mr4'

interface MenuAction {
  label: string
  onClick: Function
  toggle?: {
    checked: boolean
    semantic: boolean
  }
  id?: number | string
}

export default function Actions({ children }) {
  return <div className="flex flex-row order-0">{children}</div>
}

interface PrimaryProps {
  label: string
  onClick: () => void
}

function Primary({ label, onClick }: PrimaryProps) {
  const className = classNames(ACTION_MARGIN, 'order-1')
  return (
    <div className={className}>
      <Button variation="secondary" size="small" onClick={onClick}>
        {label}
      </Button>
    </div>
  )
}

interface SecondaryProps {
  label: string
  actions: Array<MenuAction>
  onActionClick: (el: MenuAction) => void
}

function Secondary({ label, actions, onActionClick }: SecondaryProps) {
  const className = classNames(ACTION_MARGIN, 'order-2')
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

Actions.Primary = Primary
Actions.Secondary = Secondary
