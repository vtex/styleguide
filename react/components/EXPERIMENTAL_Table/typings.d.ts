type MenuAction = {
  label: string
  onClick: Function
  toggle?: {
    checked: boolean
    semantic: boolean
  }
  id?: number | string
}

type Density = 'low' | 'medium' | 'high'
type Size = 'small' | 'regular' | 'large'
type Alignment = 'left' | 'right'
type Variation = 'primary' | 'secondary' | 'tertiary'
type FlexJustify = 'between' | 'end' | 'start' | 'around' | 'center'
