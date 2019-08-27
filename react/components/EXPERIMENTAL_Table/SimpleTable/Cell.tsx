import React, { FC } from 'react'

import CellPrefix, { CellPrefixProps, CellPrefixComposites } from './CellPrefix'
import { NAMESPACES } from '../constants'

const Cell: FC<CellProps> & Composites = ({
  id,
  children,
  isHeader,
  width,
}) => (
  <div
    id={`${NAMESPACES.CELL}-${id}`}
    style={{ minWidth: width }}
    className={`dtc truncate v-mid pa2 tl bb b--muted-4  ${
      isHeader ? 'bt' : ''
    }`}>
    {children}
  </div>
)

Cell.Prefix = CellPrefix

Cell.defaultProps = {
  isHeader: false,
}

interface Composites {
  Prefix?: FC<CellPrefixProps> & CellPrefixComposites
}

interface CellProps {
  id: string
  isHeader?: boolean
  width?: number
}

export default Cell
