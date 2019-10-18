import { useContext, createContext } from 'react'
import { OUT_OF_SCOPE_COMPOSITES_ERROR } from './errors'

export const TableContext = createContext<Partial<TableState & TableProps>>({})

export const useTableContext = () => {
  const context = useContext(TableContext)
  if (!context) {
    throw OUT_OF_SCOPE_COMPOSITES_ERROR
  }
  return context
}
