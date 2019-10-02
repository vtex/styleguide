import React, { FC } from 'react'

import CaretUp from '../../icon/CaretUp/index.js'
import CaretDown from '../../icon/CaretDown/index.js'
import ButtonWithIcon from '../../ButtonWithIcon/index.js'

const CollapseToggle: FC<CollapseToggleProps> = ({ active, onClick }) => {
  const icon = active ? <CaretUp /> : <CaretDown />
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
  active: boolean
  onClick: Function
}

export default CollapseToggle
