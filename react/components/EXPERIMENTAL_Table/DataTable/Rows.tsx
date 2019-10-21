import React, { FC } from 'react'
import uuid from 'uuid'

import { NAMESPACES } from '../constants'
import Row, { RowProps, CellProps } from './Row'
import { useMeasuresState } from '../stateContainers/tableMeasures'
import { BulkState } from '../stateContainers/bulkActions'
import { Column, Items } from '../stateContainers/data'

const Rows: FC<RowsProps> = ({
  columns,
  items,
  onRowClick,
  unicityKey,
  cellProps,
  rowProps,
  bulkState,
  rowHeight,
}) => {
  const renderRow = (rowData: unknown) => {
    const clickable = onRowClick
      ? {
          onClick: () => onRowClick({ rowData }),
        }
      : {}
    const isSelected =
      bulkState &&
      bulkState.selectedRows.some(
        row => row[unicityKey] === rowData[unicityKey]
      )
    return (
      <Row
        {...rowProps}
        {...clickable}
        height={rowHeight}
        isSelected={isSelected}
        key={`${NAMESPACES.ROW}-${uuid()}`}>
        {columns.map((column: Column) => {
          const { cellRender, width } = column
          const cellData = rowData[column.id]
          const content = cellRender
            ? cellRender({ cellData, rowData, rowHeight })
            : cellData
          return (
            <Row.Cell {...cellProps} key={`cel-${uuid()}`} width={width}>
              {content}
            </Row.Cell>
          )
        })}
      </Row>
    )
  }

  return <>{items.map(renderRow)}</>
}

export type RowsProps = {
  columns: Array<Column>
  items: Items
  onRowClick: ({ rowData: unknown }) => void
  bulkState: BulkState
  unicityKey: string
  rowProps?: RowProps
  rowHeight: number
  cellProps?: Pick<CellProps, 'as' | 'className'>
}

export default Rows
