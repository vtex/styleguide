import React, { forwardRef } from 'react'
import classNames from 'classnames'

import { useTestingContext } from '../context/testing'
import { useHeadContext } from '../context/head'
import { TABLE_HEADER_HEIGHT } from '../hooks/useTableMeasures'
import Row from './Row'
import Cell from './Cell'
import { RFC, ComposableWithRef } from '../types'

const Thead: RFC<HTMLTableSectionElement> = (_, ref) => {
  const { testId } = useTestingContext()
  const { sorting, sticky } = useHeadContext()
  return (
    <thead
      ref={ref}
      data-testid={`${testId}__header`}
      className="w-100 ph4 truncate overflow-x-hidden c-muted-2 f6">
      <Row height={TABLE_HEADER_HEIGHT} data="">
        {({ column, props }) => {
          const { id, title, sortable } = column
          const cellClassName = classNames('bt normal', { pointer: sortable })
          const cellSorting =
            sorting && sorting.sorted && sorting.sorted.by === id
          const ascending = sorting && sorting.sorted.order !== 'DSC'
          const onclick =
            sortable && sorting ? { onClick: () => sorting.sort(id) } : {}
          return (
            <Row.Cell
              {...onclick}
              {...props}
              sortable={sortable}
              sorting={cellSorting}
              className={cellClassName}
              sticky={sticky}
              header>
              {title}
              {sortable && (
                <Cell.Suffix sorting={cellSorting} ascending={ascending} />
              )}
            </Row.Cell>
          )
        }}
      </Row>
    </thead>
  )
}

export type ComposableThead = ComposableWithRef<HTMLTableSectionElement>

export default forwardRef(Thead)
