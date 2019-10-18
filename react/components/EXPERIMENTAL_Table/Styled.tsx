import React, { FC } from 'react'
import csx from 'classnames'
import uuid from 'uuid'

import { useTableContext } from './contexts'
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
  onClick,
  isSelected,
}) => {
  const className = csx('w-100 ph4 truncate overflow-x-hidden', {
    'pointer hover-c-link hover-bg-muted-5': onClick,
    'bg-action-secondary': isSelected,
  })
  return (
    <Tag
      key={`${NAMESPACES.ROW}-${uuid()}`}
      style={{ height: height }}
      onClick={onClick}
      className={className}>
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
      className={`truncate v-mid ph2 pv0 tl bb b--muted-4 ${className}`}>
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
  isSelected?: boolean
  height?: number
  onClick?: () => void
}

Row.Cell = Cell
