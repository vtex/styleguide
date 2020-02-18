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
} from '../context'
import { ROW_TRANSITIONS } from './Row'
import Cell from './Cell'
import { withForwardedRef } from '../../../modules/withForwardedRef'

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

export const Body: FC<BodyProps> = ({
  columns,
  renderer,
  forwardedRef,
  ...rest
}) => {
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

export { fowardedDataTable as DataTable }
export { fowardedBody as Tbody }
