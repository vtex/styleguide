import { Density } from './hooks/useTableMeasures'
import useTableMotion from './hooks/useTableMotion'

export type Items = object[]

export type ReturnedData = {
  data: unknown | object
  rowHeight: number
  density: Density
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

/** Shorthand for RefForwardingComponent */
export type RFC<T, P = {}> = React.RefForwardingComponent<T, P>

/** Defines a exported foward ref with composites */
export type ComposableWithRef<
  Ref,
  Props = {},
  Composites = {}
> = React.ForwardRefExoticComponent<
  React.PropsWithChildren<Props> & React.RefAttributes<Ref>
> &
  Partial<Composites>

/** Type with ref and renderProps */
type RenderProps<P> = P & {
  children?: (data: Record<string, unknown>) => React.ReactNode
}

/** Ref foward component with render props */
export interface RFCRP<T, P> {
  (props: RenderProps<P>, ref: React.Ref<T>): React.ReactElement | null
}
