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
  id: string
  title: string
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
}

type TableState = {
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

type Density = 'low' | 'medium' | 'high'
type Size = 'small' | 'regular' | 'large'
type Alignment = 'left' | 'right'
type Variation = 'primary' | 'secondary' | 'tertiary'
type FlexJustify = 'between' | 'end' | 'start' | 'around' | 'center'
