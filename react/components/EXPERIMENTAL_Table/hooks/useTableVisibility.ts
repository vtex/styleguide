import { useMemo, useState, useCallback } from 'react'

import { Column } from '../types'

export default function useTableVisibility({
  columns,
  hiddenColumns: initHiddenColumns = [],
}: VisibilityData) {
  const [hiddenColumns, setHiddenColumns] = useState(initHiddenColumns)

  const visibleColumns = useMemo(() => {
    const reducer = (acc: Column[], col: Column) =>
      hiddenColumns.includes(col.id as string) ? acc : [...acc, col]

    return columns.reduce(reducer, [])
  }, [hiddenColumns, columns])

  const toggleColumn = useCallback((id: string) => {
    setHiddenColumns(col =>
      col.includes(id) ? col.filter(column => column !== id) : [...col, id]
    )
  }, [])

  const showAllColumns = useCallback(() => {
    setHiddenColumns([])
  }, [])

  const hideAllColumns = useCallback(() => {
    setHiddenColumns(columns.map((col: any) => col.id))
  }, [columns])

  return {
    columns,
    visibleColumns,
    hiddenColumns,
    toggleColumn,
    showAllColumns,
    hideAllColumns,
  }
}

export type VisibilityData = {
  columns: Column[]
  hiddenColumns?: string[]
}
