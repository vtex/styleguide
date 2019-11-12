import React, { FC } from 'react'

import CollapseToggle, { CollapseToggleProps } from './CollapseToggle'
import Checkbox, { CheckboxProps } from '../../EXPERIMENTAL_Table/Checkbox'

const GAP = 35

const CellPrefix: FC<CellPrefixProps> & CellPrefixComposites = ({
  children,
  depth,
}) => {
  const width = GAP * depth
  return (
    <>
      <div className="dib" style={{ width }} />
      <div className="dib pr3">
        <div className="flex w-100 items-center">{children}</div>
      </div>
    </>
  )
}

CellPrefix.defaultProps = {
  depth: 0,
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
