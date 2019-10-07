import { useContext, createContext } from 'react'
import { OUT_OF_SCOPE_COMPOSITES_ERROR } from './errors'
import { Bulk } from './hooks/useTableBulkActions'

export const TableContext = createContext<Partial<TableState & TableProps>>({})
export const BulkContext = createContext<Partial<Bulk>>({})

export const useTableContext = () => {
  const context = useContext(TableContext)
  if (!context) {
    throw OUT_OF_SCOPE_COMPOSITES_ERROR
  }
  return context
}

export const useBulkContext = () => useContext(BulkContext)
