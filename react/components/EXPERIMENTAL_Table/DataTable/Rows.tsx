import React, { FC } from 'react'
import pick from 'lodash/pick'

import Row, { RowProps, ROW_TRANSITIONS } from './Row'
import { Column, Items } from '../types'
import { Checkboxes } from '../../EXPERIMENTAL_useCheckboxTree/types'
import useTableMotion from '../hooks/useTableMotion'
import { useMeasuresContext } from '../context/measures'

const Rows: FC<RowsProps> = ({
  columns,
  items,
  onRowClick,
  rowProps,
  isRowActive,
  rowKey,
  highlightOnHover,
}) => {
  const { rowHeight, density } = useMeasuresContext()
  const motion = useTableMotion(ROW_TRANSITIONS)
  return items ? (
    <>
      {items.map(rowData => {
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
            active={isRowActive?.(rowData)}
            key={rowKey({ rowData })}
            motion={motion}
          >
            {columns.map(column => {
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
                    density,
                    motion,
                  })
                : data
              return (
                <Row.Cell key={column.id} width={width}>
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
  rowKey?: ({ rowData: unknown }) => string
  onRowClick?: ({ rowData: unknown }) => void
  isRowActive?: (rowData: unknown) => boolean
  rowProps?: RowProps
  checkboxes?: Checkboxes<unknown>
  highlightOnHover?: boolean
}

export default Rows
