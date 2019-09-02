import { useMemo } from 'react'

import { calculateTableHeight } from '../util'
import useDensity from './useDensity'
import useHiddenColumns from './useHiddenColumns'

interface Input {
  columns: Array<Column>
  items: Array<any>
  density?: Density
}

const useTableState = ({ columns, items, density }: Input): TableState => {
  const { selectedDensity, setSelectedDensity, rowHeight } = useDensity(density)
  const {
    hiddenColumns,
    visibleColumns,
    toggleColumn,
    showAllColumns,
    hideAllColumns,
  } = useHiddenColumns(columns)

  const isEmpty = useMemo(
    () => items.length === 0 || Object.keys(visibleColumns).length === 0,
    [visibleColumns, items]
  )

  const tableHeight = useMemo(
    () => calculateTableHeight(rowHeight, items.length),
    [items, rowHeight]
  )

  return {
    columns,
    visibleColumns,
    hiddenColumns,
    items,
    isEmpty,
    tableHeight,
    rowHeight,
    selectedDensity,
    setSelectedDensity,
    toggleColumn,
    showAllColumns,
    hideAllColumns,
  }
}

export default useTableState
