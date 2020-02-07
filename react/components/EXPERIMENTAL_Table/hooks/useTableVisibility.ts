import { useMemo, useState, useCallback } from 'react'

import { Column } from '../types'

export default function useTableVisibility({
  columns,
  hiddenColumns: initHiddenColumns = [],
}: VisibilityData) {
  const [hiddenColumns, setHiddenColumns] = useState(initHiddenColumns)

  const visibleColumns = useMemo(() => {
    const reducer = (acc: Array<Column>, col: Column) =>
      hiddenColumns.includes(col.id) ? acc : [...acc, col]

    return columns.reduce(reducer, [])
  }, [hiddenColumns, columns])

  const toggleColumn = useCallback((id: string) => {
    setHiddenColumns(col =>
      col.includes(id) ? col.filter(col => col !== id) : [...col, id]
    )
  }, [])

  const showAllColumns = () => {
    setHiddenColumns([])
  }

  const hideAllColumns = () => {
    setHiddenColumns(columns.map(col => col.id))
  }

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
