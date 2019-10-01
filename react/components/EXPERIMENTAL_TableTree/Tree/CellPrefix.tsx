import React, { FC } from 'react'

import Arrow, { ArrowProps } from './Arrow'
import Checkbox, { CheckboxProps } from '../../EXPERIMENTAL_Table/Checkbox'

const CellPrefix: FC<CellPrefixProps> & CellPrefixComposites = ({
  children,
  width,
}) => {
  return (
    <span className="dib pr2" style={{ width }}>
      <span className="flex w-100 justify-end items-center">{children}</span>
    </span>
  )
}

CellPrefix.Arrow = Arrow
CellPrefix.Checkbox = Checkbox

export type CellPrefixComposites = {
  Arrow?: FC<ArrowProps>
  Checkbox?: FC<CheckboxProps>
}

export type CellPrefixProps = {
  width: number
}

export default CellPrefix
