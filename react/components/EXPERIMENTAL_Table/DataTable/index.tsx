import React, { forwardRef } from 'react'
import classNames from 'classnames'

import EmptyState from '../../EmptyState/index.js'
import { NAMESPACES, ORDER_CLASSNAMES } from '../constants'
import { TABLE_HEADER_HEIGHT } from '../hooks/useTableMeasures'
import Loading from './Loading'
import useTableMotion from '../hooks/useTableMotion'
import { E2ETestable } from '../types'
import { useTestingContext, useMeasuresContext } from '../context'

const DataTable = forwardRef<HTMLTableElement, DataTableProps>(
  ({ children, className, empty, loading, emptyState, motion }, ref) => {
    const { testId } = useTestingContext()
    const { tableHeight } = useMeasuresContext()
    const showLoading = !empty && loading
    const showEmptyState = empty && emptyState
    return (
      <div
        style={{ height: tableHeight, ...motion }}
        className={classNames(
          'order-1 mw-100 overflow-x-auto',
          ORDER_CLASSNAMES.TABLE
        )}>
        <table
          ref={ref}
          id={NAMESPACES.TABLE}
          data-testid={testId}
          className={`w-100 ${className}`}
          style={{ borderSpacing: 0 }}>
          {children}
        </table>
        {showLoading && (
          <Loading
            testId={`${testId}__loading`}
            motion={motion}
            height={tableHeight - TABLE_HEADER_HEIGHT}>
            {typeof loading !== 'boolean' &&
              loading.renderAs &&
              loading.renderAs()}
          </Loading>
        )}
        {showEmptyState && (
          <EmptyState
            testId={`${testId}__empty-state`}
            title={emptyState.label}>
            {emptyState.children}
          </EmptyState>
        )}
      </div>
    )
  }
)

export type DataTableProps = E2ETestable & {
  height: number
  className?: string
  empty: boolean
  motion: ReturnType<typeof useTableMotion>
  loading?:
    | boolean
    | {
        renderAs?: () => React.ReactNode
      }
  emptyState?: {
    label?: string
    children?: Element
  }
  stickyHeader?: boolean
}

DataTable.displayName = 'DataTable'

export default DataTable
