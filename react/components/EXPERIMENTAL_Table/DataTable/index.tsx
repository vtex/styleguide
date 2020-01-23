import React, { FC } from 'react'
import classNames from 'classnames'

import EmptyState from '../../EmptyState/index.js'
import { NAMESPACES, ORDER_CLASSNAMES } from '../constants'
import { TABLE_HEADER_HEIGHT } from '../hooks/useTableMeasures'
import Loading from './Loading'
import useTableMotion from '../hooks/useTableMotion'

const DataTable: FC<DataTableProps> = ({
  children,
  height,
  className,
  tagName: Tag,
  empty,
  loading,
  emptyState,
  motion,
}) => {
  const showLoading = !empty && loading
  const showEmptyState = empty && emptyState
  return (
    <div
      id={NAMESPACES.TABLE}
      style={{ minHeight: height, ...motion }}
      className={classNames(
        'order-1 mw-100 overflow-x-auto',
        ORDER_CLASSNAMES.TABLE
      )}>
      <Tag className={`w-100 ${className}`} style={{ borderSpacing: 0 }}>
        {children}
      </Tag>
      {showLoading && (
        <Loading motion={motion} height={height - TABLE_HEADER_HEIGHT}>
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
  tagName: 'table',
  className: '',
}

export type DataTableProps = {
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
