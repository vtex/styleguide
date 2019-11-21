import React, { FC } from 'react'

import Checkbox, { CheckboxProps } from '../Checkbox'

const GAP = 35

const CellPrefix: FC<CellPrefixProps> & CellPrefixComposites = ({
  children,
  depth,
}) => {
  const width = GAP * depth
  return (
    <>
      <div className="dib" style={{ width }} />
      <div className="dib pr3 v-mid">
        <div className="flex w-100 items-center">{children}</div>
      </div>
    </>
  )
}

CellPrefix.defaultProps = {
  depth: 0,
}

CellPrefix.Checkbox = Checkbox

export type CellPrefixComposites = {
  Checkbox?: FC<CheckboxProps>
}

export type CellPrefixProps = {
  depth?: number
}

export default CellPrefix
