import React, { FC } from 'react'
import classNames from 'classnames'

import EmptyState from '../../EmptyState/index.js'
import { NAMESPACES, ORDER_CLASSNAMES } from '../constants'
import { TABLE_HEADER_HEIGHT } from '../hooks/useTableMeasures'
import Loading from './Loading'
import useTableMotion from '../hooks/useTableMotion'
import { E2ETestable } from '../types'

const DataTable: FC<DataTableProps> = ({
  children,
  height,
  className,
  tagName: Tag,
  empty,
  loading,
  emptyState,
  motion,
  testId,
}) => {
  const showLoading = !empty && loading
  const showEmptyState = empty && emptyState
  return (
    <div
      style={{ minHeight: height, ...motion }}
      className={classNames(
        'order-1 mw-100 overflow-x-auto',
        ORDER_CLASSNAMES.TABLE
      )}>
      <Tag
        id={NAMESPACES.TABLE}
        data-testid={testId}
        className={`w-100 ${className}`}
        style={{ borderSpacing: 0 }}>
        {children}
      </Tag>
      {showLoading && (
        <Loading
          testId={`${testId}__loading`}
          motion={motion}
          height={height - TABLE_HEADER_HEIGHT}>
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

DataTable.defaultProps = {
  tagName: 'table',
  className: '',
}

export type DataTableProps = E2ETestable & {
  height: number
  tagName?: 'table' | 'div' | 'section'
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
}

export default DataTable
