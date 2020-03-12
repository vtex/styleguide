import React, { FC } from 'react'
import pick from 'lodash/pick'

import Row, { RowProps, ROW_TRANSITIONS } from './Row'
import { Column, Items } from '../types'
import { Density } from '../hooks/useTableMeasures'
import { Checkboxes } from '../../EXPERIMENTAL_useCheckboxTree/types'
import useTableMotion from '../hooks/useTableMotion'

const Rows: FC<RowsProps> = ({
  columns,
  items,
  onRowClick,
  rowProps,
  isRowActive,
  rowHeight,
  currentDensity,
  checkboxes,
  rowKey,
  highlightOnHover,
}) => {
  const motion = useTableMotion(ROW_TRANSITIONS)
  return items ? (
    <>
      {items.map(rowData => {
        const toggleChecked = () => checkboxes.toggle(rowData)

        const isRowChecked = checkboxes?.isChecked(rowData)
        const isRowPartiallyChecked = checkboxes?.isPartiallyChecked(rowData)
        const isRowSelected = isRowChecked || isRowPartiallyChecked

        const clickable = onRowClick
          ? {
              onClick: () => onRowClick({ rowData }),
              highlightOnHover: true,
            }
          : { highlightOnHover }
        return (
          <Row
            {...rowProps}
            {...clickable}
            height={rowHeight}
            active={isRowActive?.(rowData) ?? isRowSelected}
            key={rowKey({ rowData })}
            motion={motion}
          >
            {columns.map((column: Column, cellIndex: number) => {
              const { cellRenderer, width } = column
              const data = column.condensed
                ? pick(rowData, column.condensed)
                : column.extended
                ? rowData
                : rowData[column.id]
              const content = cellRenderer
                ? cellRenderer({
                    data,
                    rowHeight,
                    currentDensity,
                    motion,
                  })
                : data
              return (
                <Row.Cell key={column.id} width={width}>
                  {cellIndex === 0 && checkboxes && (
                    <Row.Cell.Prefix>
                      <span className="ph3">
                        <Row.Cell.Prefix.Checkbox
                          checked={isRowChecked}
                          partial={isRowPartiallyChecked}
                          disabled={checkboxes.isDisabled(rowData)}
                          onClick={toggleChecked}
                        />
                      </span>
                    </Row.Cell.Prefix>
                  )}
                  {content}
                </Row.Cell>
              )
            })}
          </Row>
        )
      })}
    </>
  ) : null
}

export type RowsProps = {
  columns: Column[]
  items: Items
  currentDensity: Density
  rowKey?: ({ rowData: unknown }) => string
  onRowClick?: ({ rowData: unknown }) => void
  isRowActive?: (rowData: unknown) => boolean
  rowProps?: RowProps
  rowHeight: number
  checkboxes?: Checkboxes<unknown>
  highlightOnHover?: boolean
}

export default Rows
