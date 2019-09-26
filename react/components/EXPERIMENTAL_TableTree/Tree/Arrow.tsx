import React, { FC } from 'react'

import CaretUp from '../../icon/CaretUp/index.js'
import CaretDown from '../../icon/CaretDown/index.js'
import ButtonWithIcon from '../../ButtonWithIcon/index.js'

const Arrow: FC<ArrowProps> = ({ active, onClick }) => {
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

export type ArrowProps = {
  active: boolean
  onClick: Function
}

export default Arrow
