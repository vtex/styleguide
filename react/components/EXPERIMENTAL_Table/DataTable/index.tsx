import React, { FC } from 'react'
import classNames from 'classnames'

import EmptyState from '../../EmptyState/index.js'
import { NAMESPACES, ORDER_CLASSNAMES } from '../constants'
import { TABLE_HEADER_HEIGHT } from '../hooks/useTableMeasures'
import Loading from './Loading'
import useTableMotion from '../hooks/useTableMotion'
import { useMeasuresContext } from '../context/measures'
import { useTestingContext } from '../context/testing'

const DataTable: FC<DataTableProps> = ({
  children,
  className,
  empty,
  loading,
  emptyState,
  motion,
  stickyHeader,
}) => {
  const { testId } = useTestingContext()
  const { tableHeight } = useMeasuresContext()
  const showLoading = !empty && loading
  const showEmptyState = empty && emptyState
  return (
    <div
      style={{ height: tableHeight, ...motion }}
      className={classNames(
        'order-1 mw-100 overflow-x-auto relative',
        {
          'overflow-y-auto': stickyHeader,
        },
        ORDER_CLASSNAMES.TABLE
      )}
    >
      <table
        id={NAMESPACES.TABLE}
        data-testid={testId}
        className={classNames('w-100', className)}
        style={{ borderSpacing: 0 }}
      >
        {children}
      </table>
      {showLoading && (
        <Loading
          testId={`${testId}__loading`}
          motion={motion}
          height={tableHeight - TABLE_HEADER_HEIGHT}
        >
          {typeof loading !== 'boolean' &&
            loading.renderAs &&
            loading.renderAs()}
        </Loading>
      )}
      {showEmptyState && (
        <EmptyState testId={`${testId}__empty-state`} title={emptyState.label}>
          {emptyState.children}
        </EmptyState>
      )}
    </div>
  )
}

export type DataTableProps = {
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

export default DataTable
