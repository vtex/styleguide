import React, { FC } from 'react'
import PrimaryAction, { PrimaryActionProps } from './PrimaryAction'
import SecondaryActions, { SecondaryActionsProps } from './SecondaryActions'

const Actions: FC & Composites = ({ children }) => {
  return <div className="flex flex-row">{children}</div>
}

type Composites = {
  Primary: FC<PrimaryActionProps>
  Secondary: FC<SecondaryActionsProps>
}

Actions.Primary = PrimaryAction
Actions.Secondary = SecondaryActions

export default Actions
