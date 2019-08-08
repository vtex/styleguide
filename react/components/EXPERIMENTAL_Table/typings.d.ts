interface TableStateHookInput {
  columns: Object
  items: Array<any>
}

interface TableState {
  columns?: Object
  items?: Array<Object>
  isEmpty?: boolean
  tableHeight?: number
}
