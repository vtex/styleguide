import { calculateTableHeight, constants } from '../util'
import { useMemo } from 'react'

interface Input {
  columns: ColumnObject
  items: Array<any>
}

const useTableState = ({ columns, items }: Input): TableState => {
  const isEmpty = useMemo(() => Object.keys(columns).length === 0, [columns])
  const tableHeight = useMemo(
    () => calculateTableHeight(constants.ROW_HEIGHT, items.length),
    [items]
  )

  return {
    columns,
    items,
    isEmpty,
    tableHeight,
  }
}

export default useTableState
