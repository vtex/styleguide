const useTableState = ({ columns, items }: hookInput): TableState => {
  return {
    columns,
    items,
  }
}

export type hookInput = {
  columns: Array<Column>
  items: Array<any>
}

export default useTableState
