import React, { FC, useCallback } from 'react'
import uuid from 'uuid'

import { NAMESPACES } from '../constants'
import Row, { RowProps, CellProps } from './Row'
import { Column, Items } from '../index'
import { Density } from '../hooks/useTableMeasures'
import CellPrefix from './CellPrefix'
import { Checkboxes } from '../../EXPERIMENTAL_useCheckboxTree/types'

const Rows: FC<RowsProps> = ({
  columns,
  items,
  onRowClick,
  cellProps,
  rowProps,
  isRowActive,
  rowHeight,
  selectedDensity,
  checkboxes,
}) => {
  const renderRow = (rowData: unknown) => {
    const toggleChecked = () => checkboxes.toggle(rowData)

    const isRowChecked = checkboxes && checkboxes.isChecked(rowData)
    const isRowPartiallyChecked =
      checkboxes && checkboxes.isPartiallyChecked(rowData)
    const isRowSelected = isRowChecked || isRowPartiallyChecked

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
        active={(isRowActive && isRowActive(rowData)) || isRowSelected}
        key={`${NAMESPACES.ROW}-${uuid()}`}>
        {columns.map((column: Column, cellIndex: number) => {
          const { cellRenderer, width } = column
          const cellData = rowData[column.id]
          const content = cellRenderer
            ? cellRenderer({ cellData, rowData, rowHeight, selectedDensity })
            : cellData
          return (
            <Row.Cell {...cellProps} key={`cel-${uuid()}`} width={width}>
              {cellIndex === 0 && checkboxes && (
                <CellPrefix>
                  <span className="ph3">
                    <CellPrefix.Checkbox
                      checked={isRowChecked}
                      partial={isRowPartiallyChecked}
                      disabled={
                        checkboxes.isDisabled && checkboxes.isDisabled(rowData)
                      }
                      onClick={toggleChecked}
                    />
                  </span>
                </CellPrefix>
              )}
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
  selectedDensity: Density
  onRowClick?: ({ rowData: unknown }) => void
  isRowActive?: (rowData: unknown) => boolean
  rowProps?: RowProps
  rowHeight: number
  cellProps?: Pick<CellProps, 'as' | 'className'>
  checkboxes?: Checkboxes<unknown>
}

export default React.memo(Rows)
