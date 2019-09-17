import React, { FC } from 'react'

import { NAMESPACES } from '../constants'

const Cell: FC<CellProps> = ({ id, children, isHeader, width }) => {
  const Tag: CellTag = isHeader ? 'th' : 'td'
  return (
    <Tag
      id={`${NAMESPACES.CELL}-${id}`}
      style={{ minWidth: width }}
      className={`truncate v-mid pa2 tl bb b--muted-4  ${
        isHeader ? 'bt' : ''
      }`}>
      {children}
    </Tag>
  )
}

Cell.defaultProps = {
  isHeader: false,
}

type CellProps = {
  id: string
  isHeader?: boolean
  width?: number
}

type CellTag = 'th' | 'td'

export default Cell
