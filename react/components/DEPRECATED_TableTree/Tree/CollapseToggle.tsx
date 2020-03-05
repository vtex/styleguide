import React, { FC } from 'react'

import CaretUp from '../../icon/CaretUp/index.js'
import CaretDown from '../../icon/CaretDown/index.js'
import ButtonWithIcon from '../../ButtonWithIcon/index.js'

const ICON_SIZE = 14

const CollapseToggle: FC<CollapseToggleProps> = ({ collapsed, onClick }) => {
  const icon = collapsed ? (
    <CaretUp size={ICON_SIZE} />
  ) : (
    <CaretDown size={ICON_SIZE} />
  )
  return (
    <ButtonWithIcon
      size="small"
      onClick={onClick}
      icon={icon}
      variation="tertiary"
    />
  )
}

export type CollapseToggleProps = {
  collapsed: boolean
  onClick: Function
}

export default CollapseToggle
