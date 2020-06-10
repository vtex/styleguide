/* eslint-disable @typescript-eslint/no-explicit-any */
interface CellRenderer<T = any> {
  data: T
  rowHeight: number
  density: string
}

export interface Column<T = any> {
  id: string
  title?: string | Element | Function
  width?: number | string
  sortable?: boolean
  cellRenderer?: (data: CellRenderer<T>) => ReactNode
  extended?: boolean
  condensed?: string[]
}
