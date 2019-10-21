import React from 'react'

export type TableData = {
  columns: Array<Column>
  items: Items
  loading?:
    | boolean
    | {
        renderAs?: () => React.ReactNode
      }
  emptyState?: {
    label?: string
    children?: Element
  }
  onRowClick?: ({ rowData: unknown }) => void
  unicityKey?: string
}

export type Items = Array<unknown>

export type HeaderData = unknown

export type CellData = {
  cellData: unknown
  rowData: unknown
  rowHeight: number
}

export type Column = {
  id?: string
  title?: string
  width?: number
  cellRender?: (cellData: CellData) => React.ReactNode
  headerRender?: ({ headerData: unknown }) => React.ReactNode
  hidden?: boolean
}
