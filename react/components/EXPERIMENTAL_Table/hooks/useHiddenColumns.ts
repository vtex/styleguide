import { useState, useMemo } from 'react'

const getHiddenColumns = (columns: Array<Column>): Array<string> => {
  return columns.filter(col => col.hidden).map(col => col.id)
}

const useHiddenColumns = (columns: Array<Column>) => {
  const [hiddenColumns, setHiddenColumns] = useState(getHiddenColumns(columns))

  const visibleColumns = useMemo(() => {
    const reducer = (acc: Array<string>, col: Column) =>
      hiddenColumns.includes(col.id) ? acc : [...acc, col]

    return columns.reduce(reducer, [])
  }, [hiddenColumns, columns])

  const toggleColumn = (id: string) => {
    hiddenColumns.includes(id)
      ? setHiddenColumns(hiddenColumns.filter(col => col !== id))
      : setHiddenColumns([...hiddenColumns, id])
  }

  const showAllColumns = () => {
    setHiddenColumns([])
  }

  const hideAllColumns = () => {
    setHiddenColumns(columns.map(col => col.id))
  }

  return {
    hiddenColumns,
    setHiddenColumns,
    visibleColumns,
    toggleColumn,
    showAllColumns,
    hideAllColumns,
  }
}

export default useHiddenColumns
