import { Density } from './hooks/useTableMeasures'
import useTableMotion from './hooks/useTableMotion'

export type Items = object[]

export type ReturnedData = {
  data: unknown | object
  rowHeight: number
  currentDensity: Density
  motion: ReturnType<typeof useTableMotion>
}

export type Column = {
  id?: string
  title?: string | Element | Function
  width?: number | string
  sortable?: boolean
  cellRenderer?: (data: ReturnedData) => React.ReactNode
  extended?: boolean
  condensed?: string[]
}

export type E2ETestable<T = string> = {
  testId?: T
}
