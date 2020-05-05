import React, { forwardRef, ReactElement, Ref } from 'react'
import classNames from 'classnames'

import { useTestingContext } from '../context/testing'
import { useHeadContext } from '../context/head'
import { TABLE_HEADER_HEIGHT } from '../hooks/useTableMeasures'
import Row from './Row'
import Cell, { ComposableCell } from './Cell'
import {
  ComposableWithRef,
  Column,
  NativeTableSection,
  RenderProps,
} from '../types'

interface HeadRenderProps {
  props: {
    width: number | string
    className: string
    sorting: boolean
    sortable: boolean
    sticky: boolean
    header: boolean
    onClick?: () => void
  }
  column: Column
  key: string
  suffix: ReactElement
}

type Props = RenderProps<NativeTableSection, HeadRenderProps>

function Thead(
  { children, className, ...restProps }: Props,
  ref: Ref<HTMLTableSectionElement>
) {
  const { testId } = useTestingContext()
  const { sorting, sticky } = useHeadContext()
  return (
    <thead
      ref={ref}
      data-testid={`${testId}__header`}
      className={`w-100 ph4 truncate overflow-x-hidden c-muted-2 f6 ${className}`}
      {...restProps}>
      <Row height={TABLE_HEADER_HEIGHT} header className="bt">
        {({ column, props: receivedProps }) => {
          const { id, title, sortable } = column
          const currentlySorting =
            sorting && sorting.sorted && sorting.sorted.by === id
          const ascending = sorting && sorting.sorted.order !== 'DSC'

          const suffix = sortable && (
            <Cell.Suffix sorting={currentlySorting} ascending={ascending} />
          )
          const clickable = sortable ? { onClick: () => sorting?.sort(id) } : {}
          const props = {
            ...receivedProps,
            ...clickable,
            className: classNames('normal', { pointer: sortable }),
            sorting: currentlySorting,
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
  Cell?: ComposableCell
}

export type ComposableThead = ComposableWithRef<
  HTMLTableSectionElement,
  Props,
  Composites
>

const ForwardedThead: ComposableThead = forwardRef(Thead)

ForwardedThead.Cell = Row.Cell

export default ForwardedThead
