import React, { FC } from 'react'

import useTableContext from './hooks/useTableContext'
import { NAMESPACES } from './constants'

const TableContainer: FC = ({ children }) => {
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

export default TableContainer
