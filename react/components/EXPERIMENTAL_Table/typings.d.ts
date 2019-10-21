type MenuAction = {
  label: string
  onClick: Function
  toggle?: {
    checked: boolean
    semantic: boolean
  }
  id?: number | string
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
  unicityKey?: string
}

type TableState = {
  visibleColumns?: Array<Column>
  columns?: Array<Column>
  visibleColumns?: Array<Column>
  items?: Array<unknown> | any
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
