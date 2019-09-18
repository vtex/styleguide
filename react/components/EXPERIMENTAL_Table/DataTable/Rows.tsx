import React, { FC } from 'react'
import uuid from 'uuid'

import Cell, { CellProps } from './Cell'
import useTableContext from '../hooks/useTableContext'
import { NAMESPACES } from '../constants'

const Rows: FC<RowProps> = ({ cellProps, as: Tag }) => {
  const { visibleColumns, items, rowHeight } = useTableContext()

  const renderRow = (rowData: unknown, index: number) => (
    <Tag
      key={`${NAMESPACES.ROW}-${uuid()}`}
      style={{ height: rowHeight }}
      className="w-100 h-100 ph4 truncate overflow-x-hidden">
      {visibleColumns.map((column: Column, cellIndex: number) => {
        const { cellRender, width } = column
        const cellData = rowData[column.id]
        const content = cellRender
          ? cellRender({ cellData, rowData })
          : cellData
        return (
          <Cell {...cellProps} key={`cel-${uuid()}`} width={width}>
            {content}
          </Cell>
        )
      })}
    </Tag>
  )

  return <>{items.map(renderRow)}</>
}

Rows.defaultProps = {
  as: 'tr',
}

export type RowProps = {
  as: 'tr' | 'div' | 'ul'
  cellProps?: Pick<CellProps, 'as' | 'className'>
}

export default Rows
