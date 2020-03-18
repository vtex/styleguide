import React, { FC } from 'react'
import classNames from 'classnames'

import { TABLE_HEADER_HEIGHT } from '../hooks/useTableMeasures'
import Row, { RowProps } from './Row'
import { Column } from '../types'
import Cell from './Cell'
import useTableSort from '../hooks/useTableSort'

const Headings: FC<HeadingsProps> = ({
  columns,
  rowProps,
  sorting,
  sticky,
}) => {
  return (
    <Row {...rowProps} height={TABLE_HEADER_HEIGHT}>
      {columns.map((columnData: Column, headerIndex: number) => {
        const { id, title, width, sortable } = columnData
        const cellClassName = classNames('bt normal', { pointer: sortable })
        const cellSorting =
          sorting && sorting.sorted && sorting.sorted.by === id
        const ascending = sorting && sorting.sorted.order !== 'DSC'
        const onclick =
          sortable && sorting ? { onClick: () => sorting.sort(id) } : {}
        return (
          <Row.Cell
            {...onclick}
            sortable={sortable}
            sorting={cellSorting}
            className={cellClassName}
            key={headerIndex}
            width={width}
            sticky={sticky}
            header>
            {title}
            {sortable && (
              <Cell.Suffix sorting={cellSorting} ascending={ascending} />
            )}
          </Row.Cell>
        )
      })}
    </Row>
  )
}

type HeadingsProps = {
  columns: Array<Column>
  rowProps?: RowProps
  sorting?: Partial<ReturnType<typeof useTableSort>>
  sticky?: boolean
}

export default React.memo(Headings)
