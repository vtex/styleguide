import React, { FC } from 'react'
import uuid from 'uuid'

import { NAMESPACES } from '../constants'
import Row, { RowProps, CellProps } from './Row'
import { Column, Items } from '../index'

const Rows: FC<RowsProps> = ({
  columns,
  items,
  onRowClick,
  cellProps,
  rowProps,
  isRowActive,
  rowHeight,
}) => {
  const renderRow = (rowData: unknown) => {
    const clickable = onRowClick
      ? {
          onClick: () => onRowClick({ rowData }),
        }
      : {}
    return (
      <Row
        {...rowProps}
        {...clickable}
        height={rowHeight}
        isActive={isRowActive && isRowActive(rowData)}
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

  return <>{items && items.map(renderRow)}</>
}

export type RowsProps = {
  columns: Array<Column>
  items: Items
  onRowClick?: ({ rowData: unknown }) => void
  isRowActive?: (rowData: unknown) => boolean
  rowProps?: RowProps
  rowHeight: number
  cellProps?: Pick<CellProps, 'as' | 'className'>
}

export default Rows
