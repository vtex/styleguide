import React, { forwardRef, FC, ReactElement } from 'react'
import classNames from 'classnames'

import { useTestingContext } from '../context/testing'
import { useHeadContext } from '../context/head'
import { TABLE_HEADER_HEIGHT } from '../hooks/useTableMeasures'
import Row from './Row'
import Cell, { CellProps, CellComposites } from './Cell'
import { ComposableWithRef, RFCRP, Column } from '../types'

interface RenderProps {
  props: {
    width: number | string
    className: string
    sorting: boolean
    onClick: () => void
    sortable: boolean
    sticky: boolean
    header: boolean
  }
  column: Column
  key: string
  suffix: ReactElement
}

const Thead: RFCRP<HTMLTableSectionElement, {}, RenderProps> = (
  { children },
  ref
) => {
  const { testId } = useTestingContext()
  const { sorting, sticky } = useHeadContext()
  return (
    <thead
      ref={ref}
      data-testid={`${testId}__header`}
      className="w-100 ph4 truncate overflow-x-hidden c-muted-2 f6">
      <Row height={TABLE_HEADER_HEIGHT} data="">
        {({ column, props: receivedProps }) => {
          const { id, title, sortable } = column
          const currentlySorting =
            sorting && sorting.sorted && sorting.sorted.by === id
          const ascending = sorting && sorting.sorted.order !== 'DSC'

          const suffix = sortable && (
            <Cell.Suffix sorting={currentlySorting} ascending={ascending} />
          )
          const props = {
            ...receivedProps,
            className: classNames('bt normal', { pointer: sortable }),
            sorting: currentlySorting,
            onClick: () => sortable && sorting && sorting.sort(id),
            sortable,
            sticky,
            header: true,
          }

          return children ? (
            children({ props, key: id, column, suffix })
          ) : (
            <Row.Cell key={id} {...props}>
              {title}
              {suffix}
            </Row.Cell>
          )
        }}
      </Row>
    </thead>
  )
}

interface Composites {
  Cell?: FC<CellProps> & CellComposites
}

export type ComposableThead = ComposableWithRef<
  HTMLTableSectionElement,
  {},
  Composites
>

const ForwardedThead: ComposableThead = forwardRef(Thead)

ForwardedThead.Cell = Row.Cell

export default ForwardedThead
