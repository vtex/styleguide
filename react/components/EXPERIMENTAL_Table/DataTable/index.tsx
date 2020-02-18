import React, { FC, RefObject, DetailedHTMLProps } from 'react'
import pick from 'lodash/pick'
import classNames from 'classnames'

import EmptyState from '../../EmptyState/index.js'
import { ORDER_CLASSNAMES } from '../constants'
import { TABLE_HEADER_HEIGHT } from '../hooks/useTableMeasures'
import Loading from './Loading'
import useTableMotion from '../hooks/useTableMotion'
import { E2ETestable, Column } from '../types'
import {
  useTestingContext,
  useMeasuresContext,
  useBodyContext,
  useLoadingContext,
  useHeadContext,
} from '../context'
import Row, { ROW_TRANSITIONS } from './Row'
import Cell from './Cell'
import { withForwardedRef } from '../../../modules/withForwardedRef'
import useTableSort from '../hooks/useTableSort'

export interface DataTableProps extends E2ETestable {
  height: number
  className?: string
  motion: ReturnType<typeof useTableMotion>
  forwardedRef: RefObject<HTMLTableElement>
}

const DataTable: FC<DataTableProps> = ({
  children,
  className,
  motion,
  forwardedRef,
}) => {
  const { emptyState, empty, loading } = useLoadingContext()
  const { testId } = useTestingContext()
  const { tableHeight } = useMeasuresContext()

  return (
    <div
      style={{ height: tableHeight, ...motion }}
      className={classNames(
        'order-1 mw-100 overflow-x-auto',
        ORDER_CLASSNAMES.TABLE
      )}>
      <table
        ref={forwardedRef}
        data-testid={testId}
        className={`w-100 ${className}`}
        style={{ borderSpacing: 0 }}>
        {children}
      </table>
      {!empty && loading && (
        <Loading
          testId={`${testId}__loading`}
          motion={motion}
          height={tableHeight - TABLE_HEADER_HEIGHT}>
          {typeof loading !== 'boolean' &&
            loading.renderAs &&
            loading.renderAs()}
        </Loading>
      )}
      {empty && emptyState && (
        <EmptyState testId={`${testId}__empty-state`} title={emptyState.label}>
          {emptyState.children}
        </EmptyState>
      )}
    </div>
  )
}

interface HeadProps {
  columns: Array<Column>
  sorting?: Partial<ReturnType<typeof useTableSort>>
  forwardedRef: RefObject<HTMLTableSectionElement>
}

const Head: FC<HeadProps> = ({ forwardedRef }) => {
  const { testId } = useTestingContext()
  const { sorting, columns } = useHeadContext()
  return (
    <thead
      ref={forwardedRef}
      data-testid={`${testId}__header`}
      className="w-100 ph4 truncate overflow-x-hidden c-muted-2 f6">
      <Row height={TABLE_HEADER_HEIGHT}>
        {columns.map((columnData: Column, headerIndex: number) => {
          const { id, title, width, sortable } = columnData
          const cellClassName = classNames('bt normal', { pointer: sortable })
          const active = sorting && sorting.sorted && sorting.sorted.by === id
          const ascending = sorting && sorting.sorted.order !== 'DSC'
          const onclick =
            sortable && sorting ? { onClick: () => sorting.sort(id) } : {}
          return (
            <Cell
              {...onclick}
              active={active}
              className={cellClassName}
              key={headerIndex}
              width={width}
              header>
              {title}
              {sortable && (
                <Cell.Suffix active={active} ascending={ascending} />
              )}
            </Cell>
          )
        })}
      </Row>
    </thead>
  )
}

interface BodyProps
  extends DetailedHTMLProps<
    React.HTMLAttributes<HTMLTableSectionElement>,
    HTMLTableSectionElement
  > {
  columns: Array<Column>
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  renderer?: (props: any) => React.ReactNode
  forwardedRef: RefObject<HTMLTableSectionElement>
}

export const Body: FC<BodyProps> = ({ renderer, forwardedRef, ...rest }) => {
  const { columns } = useHeadContext()
  const {
    onRowClick,
    isRowActive,
    items,
    rowKey,
    highlightOnHover,
  } = useBodyContext()
  const { empty, loading } = useLoadingContext()
  const { testId } = useTestingContext()
  const { rowHeight, currentDensity } = useMeasuresContext()
  const motion = useTableMotion(ROW_TRANSITIONS)

  return !empty && !loading ? (
    <tbody ref={forwardedRef} {...rest} data-testid={`${testId}__body`}>
      {items.map((rowData, rowIndex: number) => {
        const clickable = onRowClick
          ? {
              onClick: () => onRowClick({ rowData }),
              highlightOnHover: true,
            }
          : { highlightOnHover }

        const rp = {
          rowData,
          rowIndex,
          rowProps: {
            ...clickable,
            height: rowHeight,
            active: isRowActive && isRowActive(rowData),
            key: rowKey({ rowData }),
            motion,
            children: columns.map((column: Column) => {
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
                <Cell key={column.id} width={width}>
                  {content}
                </Cell>
              )
            }),
          },
        }
        return renderer(rp)
      })}
    </tbody>
  ) : null
}

const fowardedDataTable = withForwardedRef(DataTable)
const fowardedBody = withForwardedRef(Body)
const fowardedHead = withForwardedRef(Head)

export { fowardedDataTable as DataTable }
export { fowardedBody as Tbody }
export { fowardedHead as Thead }
