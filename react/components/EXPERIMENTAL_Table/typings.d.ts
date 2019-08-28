interface MenuAction {
  label: string
  onClick: Function
  toggle: {
    checked: boolean
    semantic: boolean
  }
}
interface Column {
  id: string
  title: string
  width?: number
  cellRender?: ({ cellData: any, rowData: any }) => React.ReactNode
  headerRender?: ({ headerData: any }) => React.ReactNode
}

interface TableProps {
  nestedRows?: boolean
}

interface TableState {
  columns?: Array<Column>
  items?: Array<Object>
  isEmpty?: boolean
  tableHeight?: number
  rowHeight?: number
  selectedDensity?: string
  setSelectedDensity?: (density: Density) => void
}

type Density = 'low' | 'medium' | 'high'
type Size = 'small' | 'regular' | 'large'
type Alignment = 'left' | 'right'
type Variation = 'primary' | 'secondary' | 'tertiary'
type FlexJustify = 'between' | 'end' | 'start' | 'around' | 'center'
