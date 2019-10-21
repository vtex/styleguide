import React, { FC } from 'react'
import csx from 'classnames'

import { NAMESPACES, ORDER_CLASSNAMES } from '../constants'

const DataTable: FC<DataTableProps> = ({
  children,
  height,
  className,
  as: Tag,
}) => {
  return (
    <div
      id={NAMESPACES.TABLE}
      style={{ minHeight: height }}
      className={csx('order-1 mw-100 overflow-x-auto', ORDER_CLASSNAMES.TABLE)}>
      <Tag className={`w-100 ${className}`} style={{ borderSpacing: 0 }}>
        {children}
      </Tag>
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
}

export default DataTable
