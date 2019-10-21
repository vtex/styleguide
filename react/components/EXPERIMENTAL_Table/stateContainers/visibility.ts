import { useMemo, useState, useCallback } from 'react'
import { Column, Items } from './data'

export default function useTableVisibility({ columns, items }: VisibilityData) {
  const [hiddenColumns, setHiddenColumns] = useState(getHiddenColumns(columns))

  const visibleColumns = useMemo(() => {
    const reducer = (acc: Array<Column>, col: Column) =>
      hiddenColumns.includes(col.id) ? acc : [...acc, col]

    return columns.reduce(reducer, [])
  }, [hiddenColumns, columns])

  const toggleColumn = useCallback(
    (id: string) => {
      hiddenColumns.includes(id)
        ? setHiddenColumns(hiddenColumns.filter(col => col !== id))
        : setHiddenColumns([...hiddenColumns, id])
    },
    [hiddenColumns]
  )

  const showAllColumns = () => {
    setHiddenColumns([])
  }

  const hideAllColumns = () => {
    setHiddenColumns(columns.map(col => col.id))
  }

  const isEmpty = useMemo(
    () => items.length === 0 || Object.keys(visibleColumns).length === 0,
    [visibleColumns, items]
  )

  return {
    columns,
    visibleColumns,
    hiddenColumns,
    items,
    isEmpty,
    toggleColumn,
    showAllColumns,
    hideAllColumns,
  }
}

export type VisibilityData = {
  columns: Array<Column>
  items: Items
}

function getHiddenColumns(columns: Array<Column>): Array<string> {
  return columns.filter(col => col.hidden).map(col => col.id)
}
