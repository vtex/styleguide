import React, { FC } from 'react'
import uuid from 'uuid'

import useTableContext from './hooks/useTableContext'
import { NAMESPACES } from './constants'

export const TableContainer: FC = ({ children }) => {
  const { containerHeight, tableHeight } = useTableContext()
  return (
    <div
      style={{ minHeight: containerHeight || tableHeight }}
      id={NAMESPACES.CONTAINER}
      className="flex flex-column">
      {children}
    </div>
  )
}

export const Thead: FC = ({ children }) => (
  <thead
    id={NAMESPACES.HEADER}
    className="w-100 ph4 truncate overflow-x-hidden c-muted-2 f6">
    {children}
  </thead>
)

export const Row: FC<RowProps> & RowComposites = ({
  as: Tag = 'tr',
  children,
  height,
}) => {
  const { rowHeight } = useTableContext()

  return (
    <Tag
      key={`${NAMESPACES.ROW}-${uuid()}`}
      style={{ height: height || rowHeight }}
      className="w-100 ph4 truncate overflow-x-hidden">
      {children}
    </Tag>
  )
}

export const Cell: FC<CellProps> = ({
  id,
  children,
  width,
  as: Tag = 'td',
  className = '',
}) => {
  return (
    <Tag
      id={`${NAMESPACES.CELL}-${id}`}
      style={{ minWidth: width }}
      className={`truncate v-mid pa2 tl bb b--muted-4 ${className}`}>
      {children}
    </Tag>
  )
}

export type RowComposites = {
  Cell: FC<CellProps>
}

export type CellProps = {
  id?: string
  width?: number
  as?: 'th' | 'td' | 'div' | 'li'
  className?: string
}

export type RowProps = {
  as?: 'tr' | 'div' | 'ul'
  height?: number
}

Row.Cell = Cell
