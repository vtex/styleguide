import { useMemo, useState } from 'react'

import { calculateTableHeight, getRowHeight } from '../util'

interface Input {
  columns: ColumnObject
  items: Array<any>
  density?: Density
}

const useTableState = ({ columns, items, density }: Input): TableState => {
  const [selectedDensity, setSelectedDensity] = useState<Density>(density)
  const isEmpty = useMemo(
    () => items.length === 0 || Object.keys(columns).length === 0,
    [columns, items]
  )
  const rowHeight = useMemo(() => getRowHeight(selectedDensity), [
    selectedDensity,
  ])
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
