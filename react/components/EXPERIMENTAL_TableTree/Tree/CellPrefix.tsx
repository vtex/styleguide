import React, { FC } from 'react'

import CollapseToggle, { CollapseToggleProps } from './CollapseToggle'
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

CellPrefix.CollapseToggle = CollapseToggle
CellPrefix.Checkbox = Checkbox

export type CellPrefixComposites = {
  CollapseToggle?: FC<CollapseToggleProps>
  Checkbox?: FC<CheckboxProps>
}

export type CellPrefixProps = {
  depth?: number
}

export default CellPrefix
