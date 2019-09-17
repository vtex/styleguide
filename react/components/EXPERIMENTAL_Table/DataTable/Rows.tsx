import React, { FC, useState, ReactNode, Children } from 'react'

import Cell from './Cell'
import useTableContext from '../hooks/useTableContext'
import { NAMESPACES } from '../constants'

const Rows: FC = () => {
  const { visibleColumns, items, rowHeight } = useTableContext()

  const renderRow = (rowData: unknown, index: number) => (
    <tr
      id={`${NAMESPACES.ROW}-${index}`}
      style={{ height: rowHeight }}
      className="w-100 h-100 ph4 truncate overflow-x-hidden">
      {visibleColumns.map((column: Column, cellIndex: number) => {
        const { cellRender, width } = column
        const cellData = rowData[column.id]
        const content = cellRender
          ? cellRender({ cellData, rowData })
          : cellData
        return (
          <Cell
            id={`${index}-${cellIndex}`}
            key={`cel-${index}-${cellIndex}`}
            width={width}>
            {content}
          </Cell>
        )
      })}
    </tr>
  )

  return <tbody>{items.map(renderRow)}</tbody>
}

export default Rows
