import React, { FC } from 'react'

import { NAMESPACES } from '../constants'

const Cell: FC<CellProps> = ({ id, children, isHeader, width }) => (
  <div
    id={`${NAMESPACES.CELL}-${id}`}
    style={{ minWidth: width }}
    className={`dtc truncate v-mid pa2 tl bb b--muted-4  ${
      isHeader ? 'bt' : ''
    }`}>
    {children}
  </div>
)

Cell.defaultProps = {
  isHeader: false,
}

interface CellProps {
  id: string
  isHeader?: boolean
  width?: number
}

export default Cell
