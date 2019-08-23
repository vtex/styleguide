import React, { FC } from 'react'

import CaretRight from '../../icon/CaretRight/index.js'
import CaretDown from '../../icon/CaretDown/index.js'
import ButtonWithIcon from '../../ButtonWithIcon/index.js'

const Arrow: FC<ArrowProps> = ({ active, onClick }) => {
  const icon = active ? <CaretDown /> : <CaretRight />
  return (
    <ButtonWithIcon
      size="small"
      onClick={onClick}
      icon={icon}
      variation="tertiary"
    />
  )
}

const CellPrefix: FC<CellPrefixProps> & CellPrefixComposites = ({
  children,
  width,
}) => {
  return (
    <span className="dib tr pr2" style={{ width }}>
      {children}
    </span>
  )
}

CellPrefix.Arrow = Arrow

export interface CellPrefixComposites {
  Arrow?: FC<ArrowProps>
}

export interface ArrowProps {
  active: boolean
  onClick: Function
}

export interface CellPrefixProps {
  width: number
}

export default CellPrefix
