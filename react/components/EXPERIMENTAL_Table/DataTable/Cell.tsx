import React, { FC } from 'react'

import { NAMESPACES } from '../constants'

const Cell: FC<CellProps> = ({ id, children, width, as: Tag, className }) => {
  return (
    <Tag
      id={`${NAMESPACES.CELL}-${id}`}
      style={{ minWidth: width }}
      className={`truncate v-mid pa2 tl bb b--muted-4 ${className}`}>
      {children}
    </Tag>
  )
}

Cell.defaultProps = {
  as: 'td',
  className: '',
}

export type CellProps = {
  id?: string
  width?: number
  as?: 'th' | 'td' | 'div' | 'li'
  className?: string
}

export default Cell
