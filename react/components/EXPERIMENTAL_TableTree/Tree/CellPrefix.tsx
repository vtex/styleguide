import React, { FC, Children } from 'react'

import CollapseToggle, { CollapseToggleProps } from './CollapseToggle'
import Checkbox, { CheckboxProps } from '../../EXPERIMENTAL_Table/Checkbox'

const PREFIX_WIDTH = 48
const CHECKBOXES_WIDTH = 16

const CellPrefix: FC<CellPrefixProps> & CellPrefixComposites = ({
  children,
  hasCheckbox,
  depth,
}) => {
  const width = (PREFIX_WIDTH + (hasCheckbox ? CHECKBOXES_WIDTH : 0)) * depth
  return (
    <span className="dib pr2" style={{ width }}>
      <span className="flex w-100 justify-end items-center">{children}</span>
    </span>
  )
}

CellPrefix.defaultProps = {
  depth: 1,
  hasCheckbox: false,
}

CellPrefix.CollapseToggle = CollapseToggle
CellPrefix.Checkbox = Checkbox

export type CellPrefixComposites = {
  CollapseToggle?: FC<CollapseToggleProps>
  Checkbox?: FC<CheckboxProps>
}

export type CellPrefixProps = {
  depth?: number
  hasCheckbox?: boolean
}

export default CellPrefix
