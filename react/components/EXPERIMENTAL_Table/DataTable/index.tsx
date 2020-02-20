import React, { forwardRef, RefForwardingComponent } from 'react'
import classNames from 'classnames'

import EmptyState from '../../EmptyState/index.js'
import { ORDER_CLASSNAMES } from '../constants'
import { TABLE_HEADER_HEIGHT } from '../hooks/useTableMeasures'
import Loading from './Loading'
import useTableMotion from '../hooks/useTableMotion'
import { E2ETestable } from '../types'
import {
  useTestingContext,
  useMeasuresContext,
  useLoadingContext,
} from '../context'
import Tbody from './Tbody'
import Thead from './Thead'

export interface DataTableProps extends E2ETestable {
  className?: string
  motion?: ReturnType<typeof useTableMotion>
}

const DataTable: RefForwardingComponent<HTMLTableElement, DataTableProps> = (
  { children, className, motion },
  ref
) => {
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
        ref={ref}
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

// TODO: find a type for this fella
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const fowardedDataTable: any = forwardRef(DataTable)

fowardedDataTable.Body = Tbody
fowardedDataTable.Head = Thead

export default fowardedDataTable
