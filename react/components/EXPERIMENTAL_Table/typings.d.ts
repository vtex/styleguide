type MenuAction = {
  label: string
  onClick: Function
  toggle?: {
    checked: boolean
    semantic: boolean
  }
  id?: number | string
}

type Column = {
  id?: string
  title?: string
  width?: number
  cellRender?: ({ cellData: any, rowData: any }) => React.ReactNode
  headerRender?: ({ headerData: any }) => React.ReactNode
  hidden?: boolean
}

type TableProps = {
  containerHeight?: number
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
}

type BulkedItem = {
  id: number
}

type BulkState = {
  selectedRows?: Array<BulkedItem>
  allLinesSelected?: boolean
}

type Bulk = {
  bulkState?: BulkState
  hasBulkActions?: boolean
  hasPrimaryBulkAction?: boolean
  hasSecondaryBulkActions?: boolean
  selectAllRows?: () => void
  deselectAllRows?: () => void
  selectRow?: (row: BulkedItem) => void
  setSelectedRows?: (selectedRows: Array<BulkedItem>) => void
  setAllLinesSelected?: (allLinesSelected: boolean) => void
  selectAllVisibleRows?: () => void
}

type TableState = {
  visibleColumns?: Array<Column>
  columns?: Array<Column>
  visibleColumns?: Array<Column>
  items?: Array<Object>
  isEmpty?: boolean
  tableHeight?: number
  rowHeight?: number
  selectedDensity?: string
  hiddenColumns?: Array<string>
  setSelectedDensity?: (density: Density) => void
  toggleColumn?: (id: string) => void
  showAllColumns?: () => void
  hideAllColumns?: () => void
}

type Density = 'low' | 'medium' | 'high'
type Size = 'small' | 'regular' | 'large'
type Alignment = 'left' | 'right'
type Variation = 'primary' | 'secondary' | 'tertiary'
type FlexJustify = 'between' | 'end' | 'start' | 'around' | 'center'
