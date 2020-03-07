import React, { forwardRef } from 'react'
import classNames from 'classnames'

import { useTestingContext, useHeadContext } from '../context'
import { TABLE_HEADER_HEIGHT } from '../hooks/useTableMeasures'
import Row from './Row'
import Cell from './Cell'
import { Column, RFC, ComposableWithRef } from '../types'

const Thead: RFC<HTMLTableSectionElement> = (_, ref) => {
  const { testId } = useTestingContext()
  const { sorting, columns, sticky } = useHeadContext()
  return (
    <thead
      ref={ref}
      data-testid={`${testId}__header`}
      className="w-100 ph4 truncate overflow-x-hidden c-muted-2 f6">
      <Row height={TABLE_HEADER_HEIGHT}>
        {columns.map((columnData: Column, headerIndex: number) => {
          const { id, title, width, sortable } = columnData
          const cellClassName = classNames('bt normal', { pointer: sortable })
          const cellSorting =
            sorting && sorting.sorted && sorting.sorted.by === id
          const ascending = sorting && sorting.sorted.order !== 'DSC'
          const onclick =
            sortable && sorting ? { onClick: () => sorting.sort(id) } : {}
          return (
            <Cell
              {...onclick}
              className={cellClassName}
              key={headerIndex}
              width={width}
              sticky={sticky}
              header>
              {title}
              {sortable && (
                <Cell.Suffix sorting={cellSorting} ascending={ascending} />
              )}
            </Cell>
          )
        })}
      </Row>
    </thead>
  )
}

export type ComposableThead = ComposableWithRef<HTMLTableSectionElement>

export default forwardRef(Thead)
