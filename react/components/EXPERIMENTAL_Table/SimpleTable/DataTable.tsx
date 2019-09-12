import React, { FC } from 'react'

import EmptyState from '../../EmptyState/index.js'

import Header from './Header'
import Rows from './Rows'
import { NAMESPACES } from '../constants'
import useTableContext from '../hooks/useTableContext'
import Loading from './Loading'

const DataTableContainer: FC = ({ children }) => {
  const {
    loading,
    isEmpty,
    tableHeight,
    containerHeight,
    emptyState,
  } = useTableContext()

  const height = isEmpty || loading ? containerHeight : tableHeight

  return (
    <div
      id={NAMESPACES.TABLE}
      style={{ height }}
      className="order-1 mw-100 overflow-x-auto">
      {children}
      {!isEmpty && loading && (
        <Loading>
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

const DataTable: FC & DataTableComposites = ({ children }) => {
  const { loading, isEmpty } = useTableContext()
  const hideRows = isEmpty || loading
  return (
    <DataTableContainer>
      <div className="dt w-100" style={{ borderSpacing: 0 }}>
        {React.Children.map(children, (child: DataTableChild) => {
          const isRowsChild = child.type.name === 'Rows'
          return isRowsChild && hideRows ? null : child
        })}
      </div>
    </DataTableContainer>
  )
}

type DataTableChild = {
  type: {
    name: 'Header' | 'Rows'
  }
}

type DataTableComposites = {
  Header?: FC
  Rows?: FC
}

DataTable.Header = Header
DataTable.Rows = Rows

export default DataTable
