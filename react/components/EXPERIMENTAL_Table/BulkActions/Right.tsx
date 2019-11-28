import React, { FC } from 'react'

import Info from './Info'
import Toggle, { ToggleProps, ToggleComposites } from './Toggle'
import DismissButton, { DismissButtonProps } from './DismissButton'

const Right: FC & Composites = ({ children }) => {
  return <div className="tr flex flex-row items-center">{children}</div>
}

type Composites = {
  Toggle: FC<ToggleProps> & ToggleComposites
  Dismiss: FC<DismissButtonProps>
  Info: FC
}

Right.Info = Info
Right.Toggle = Toggle
Right.Dismiss = DismissButton

export default Right
