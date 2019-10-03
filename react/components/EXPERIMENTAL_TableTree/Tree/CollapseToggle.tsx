import React, { FC } from 'react'

import CaretUp from '../../icon/CaretUp/index.js'
import CaretDown from '../../icon/CaretDown/index.js'
import ButtonWithIcon from '../../ButtonWithIcon/index.js'

const CollapseToggle: FC<CollapseToggleProps> = ({ collapsed, onClick }) => {
  const icon = collapsed ? <CaretUp /> : <CaretDown />
  return (
    <span className="ph2">
      <ButtonWithIcon
        size="small"
        onClick={onClick}
        icon={icon}
        variation="tertiary"
      />
    </span>
  )
}

export type CollapseToggleProps = {
  collapsed: boolean
  onClick: Function
}

export default CollapseToggle
