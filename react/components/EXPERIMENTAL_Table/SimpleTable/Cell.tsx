import React, { FC } from 'react'

import Arrow, { ArrowProps } from './Arrow'

const Cell: FC<CellProps> & Composites = ({ children, isHeader }) => (
  <div className={`dtc v-mid pa2 tl bb b--muted-4 ${isHeader ? 'bt' : ''}`}>
    {children}
  </div>
)

Cell.Arrow = Arrow

Cell.defaultProps = {
  isHeader: false,
}

interface Composites {
  Arrow?: FC<ArrowProps>
}

interface CellProps {
  isHeader?: boolean
}

export default Cell
