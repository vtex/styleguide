import React, { FC } from 'react'
import uuid from 'uuid'

import { useTableContext } from '../contexts'
import { NAMESPACES } from '../constants'
import { Row, RowProps, CellProps } from '../Styled'
import { useMeasuresState } from '../stateContainers/tableMeasures'
import { useBulkActionsState } from '../stateContainers/bulkActions'
import { Column, useDataState } from '../stateContainers/data'

const Rows: FC<RowsProps> = ({ cellProps, rowProps }) => {
  const { columns, items, onRowClick, unicityKey } = useDataState()
  const { rowHeight } = useMeasuresState()
  const bulkContext = useBulkActionsState()

  const renderRow = (rowData: unknown) => {
    const clickable = onRowClick
      ? {
          onClick: () => onRowClick({ rowData }),
        }
      : {}
    const isSelected =
      bulkContext &&
      bulkContext.bulkState &&
      bulkContext.bulkState.selectedRows.some(
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
  rowProps?: RowProps
  cellProps?: Pick<CellProps, 'as' | 'className'>
}

export default Rows
