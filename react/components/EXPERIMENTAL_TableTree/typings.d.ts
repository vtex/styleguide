interface Column {
  id: string
  title: string
  width?: number
  cellRender?: ({ cellData: any, rowData: any }) => React.ReactNode
  headerRender?: ({ headerData: any }) => React.ReactNode
  hidden?: boolean
}

interface TableProps {
  containerHeight?: number
  nestedRows?: boolean
  loading?:
    | boolean
    | {
        renderAs?: () => React.ReactNode
      }
  emptyState?: {
    label?: string
    children?: Element
  }
}

interface TableState {
  visibleColumns?: Array<Column>
  columns?: Array<Column>
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
