import React, { FC } from 'react'

import Arrow, { ArrowProps } from './Arrow'
import Checkbox, { CheckboxProps } from '../../EXPERIMENTAL_Table/Checkbox'

const PREFIX_WIDTH = 64

const CellPrefix: FC<CellPrefixProps> & CellPrefixComposites = ({
  children,
  depth,
}) => {
  return (
    <span className="dib pr2" style={{ width: PREFIX_WIDTH * depth }}>
      <span className="flex w-100 justify-end items-center">{children}</span>
    </span>
  )
}

CellPrefix.defaultProps = {
  depth: 1,
}

CellPrefix.Arrow = Arrow
CellPrefix.Checkbox = Checkbox

export type CellPrefixComposites = {
  Arrow?: FC<ArrowProps>
  Checkbox?: FC<CheckboxProps>
}

export type CellPrefixProps = {
  depth?: number
}

export default CellPrefix
