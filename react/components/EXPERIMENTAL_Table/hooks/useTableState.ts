import { useMemo } from 'react'

import { calculateTableHeight } from '../util'
import useDensity from './useDensity'

interface Input {
  columns: Array<Column>
  items: Array<any>
  density?: Density
}

const useTableState = ({ columns, items, density }: Input): TableState => {
  const { selectedDensity, setSelectedDensity, rowHeight } = useDensity(density)

  const isEmpty = useMemo(
    () => items.length === 0 || Object.keys(columns).length === 0,
    [columns, items]
  )

  const tableHeight = useMemo(
    () => calculateTableHeight(rowHeight, items.length),
    [items, rowHeight]
  )

  return {
    columns,
    items,
    isEmpty,
    tableHeight,
    rowHeight,
    selectedDensity,
    setSelectedDensity,
  }
}

export default useTableState
