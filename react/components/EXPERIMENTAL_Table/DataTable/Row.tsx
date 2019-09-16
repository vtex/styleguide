import React, { FC, useState } from 'react'

import Cell from './Cell'
import useTableContext from '../hooks/useTableContext'
import { NAMESPACES } from '../constants'
import RowContainer from './RowContainer'

const Row: FC<RowProps> = ({ rowData, index }) => {
  const { visibleColumns } = useTableContext()

  const rowKey = `row-${index}`

  const renderCells = () => {
    return (
      <RowContainer id={`${NAMESPACES.ROW}-${index}`} key={rowKey}>
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
      </RowContainer>
    )
  }

  return renderCells()
}

interface RowProps {
  rowData: unknown
  index: number
  depth?: number
}

export default Row
