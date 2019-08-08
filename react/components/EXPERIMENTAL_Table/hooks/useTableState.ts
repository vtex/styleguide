import { calculateTableHeight, constants } from '../util'

const useTableState = ({ columns, items }: TableStateHookInput): TableState => {
  const isEmpty = Object.keys(columns).length === 0
  const tableHeight = calculateTableHeight(constants.ROW_HEIGHT, items.length)

  return {
    columns,
    items,
    isEmpty,
    tableHeight,
  }
}

export default useTableState
