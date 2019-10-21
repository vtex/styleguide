import React, { FC, Children } from 'react'
import csx from 'classnames'

import Spinner from '../../Spinner/index.js'
import EmptyState from '../../EmptyState/index.js'
import { NAMESPACES, ORDER_CLASSNAMES, TABLE_HEADER_HEIGHT } from '../constants'

const DataTable: FC<DataTableProps> = ({
  children,
  height,
  isEmpty,
  loading,
  emptyState,
  className,
  as: Tag,
}) => {
  const hideRows = isEmpty || loading

  const isRowsChild = (child: DataTableChild) =>
    child.type.name && child.type.name.toLowerCase() === 'rows'

  const isRowsContainer = (child: DataTableChild) =>
    child.props.children &&
    Children.toArray(child.props.children).some(isRowsChild)

  const childRenderer = (child: DataTableChild) => {
    const hasRowsChild = isRowsChild(child) || isRowsContainer(child)
    return hasRowsChild && hideRows ? null : child
  }

  return (
    <div
      id={NAMESPACES.TABLE}
      style={{ minHeight: height }}
      className={csx('order-1 mw-100 overflow-x-auto', ORDER_CLASSNAMES.TABLE)}>
      <Tag className={`w-100 ${className}`} style={{ borderSpacing: 0 }}>
        {Children.map(children, childRenderer)}
      </Tag>
      {!isEmpty && loading && (
        <Loading height={height - TABLE_HEADER_HEIGHT}>
          {typeof loading !== 'boolean' &&
            loading.renderAs &&
            loading.renderAs()}
        </Loading>
      )}
      {isEmpty && emptyState && (
        <EmptyState title={emptyState.label}>{emptyState.children}</EmptyState>
      )}
    </div>
  )
}

const Loading: FC<{ height: number }> = ({ height, children }) => {
  return (
    <div className="flex justify-center items-center" style={{ height }}>
      {children || <Spinner />}
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
  isEmpty?: boolean
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

export type DataTableChild = {
  type: {
    name?: 'headings' | 'rows'
  }
  props: {
    children?: Array<DataTableChild>
  }
}

export default DataTable
