import React, { FC } from 'react'

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
    className="w-100 h-100 ph4 truncate overflow-x-hidden c-muted-2 f6">
    {children}
  </thead>
)
