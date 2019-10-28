import React, { FC } from 'react'
import csx from 'classnames'

import EmptyState from '../../EmptyState/index.js'
import { NAMESPACES, ORDER_CLASSNAMES, TABLE_HEADER_HEIGHT } from '../constants'
import Loading from './Loading'

const DataTable: FC<DataTableProps> = ({
  children,
  height,
  className,
  as: Tag,
  isEmpty,
  loading,
  emptyState,
}) => {
  const showLoading = !isEmpty && loading
  const showEmptyState = isEmpty && emptyState
  return (
    <div
      id={NAMESPACES.TABLE}
      style={{ minHeight: height }}
      className={csx('order-1 mw-100 overflow-x-auto', ORDER_CLASSNAMES.TABLE)}>
      <Tag className={`w-100 ${className}`} style={{ borderSpacing: 0 }}>
        {children}
      </Tag>
      {showLoading && (
        <Loading height={height - TABLE_HEADER_HEIGHT}>
          {typeof loading !== 'boolean' &&
            loading.renderAs &&
            loading.renderAs()}
        </Loading>
      )}
      {showEmptyState && (
        <EmptyState title={emptyState.label}>{emptyState.children}</EmptyState>
      )}
    </div>
  )
}

DataTable.defaultProps = {
  as: 'table',
  className: '',
}

export type DataTableProps = {
  height: number
  as?: 'table' | 'div' | 'section'
  className?: string
  isEmpty: boolean
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
