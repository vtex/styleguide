import {
  ReactNode,
  PropsWithChildren,
  ForwardRefExoticComponent,
  RefAttributes,
  DetailedHTMLProps,
  HTMLAttributes,
} from 'react'

import { Density } from './hooks/useTableMeasures'
import useTableMotion from './hooks/useTableMotion'

export type Items = object[]

export type ReturnedData = {
  data: unknown | object
  rowHeight: number
  density: Density
  motion?: ReturnType<typeof useTableMotion>
}

export type Column = {
  id: string
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

export interface HasMotion {
  motion?: ReturnType<typeof useTableMotion>
}

/** Shorthand for RefForwardingComponent */
export type RFC<T, P = {}> = React.RefForwardingComponent<T, P>

/** Defines a exported foward ref with composites */
export type ComposableWithRef<
  Ref = HTMLElement,
  Props = PropsWithChildren<{}>,
  Composites = {}
> = ForwardRefExoticComponent<Props & RefAttributes<Ref>> & Partial<Composites>

/** Type with children that receives render-props */
export type RenderProps<P = {}, T = Record<string, unknown>> = P & {
  children?: (data: T) => ReactNode
}

export type NativeTableSection = DetailedHTMLProps<
  HTMLAttributes<HTMLTableSectionElement>,
  HTMLTableSectionElement
>

export type NativeTr = DetailedHTMLProps<
  HTMLAttributes<HTMLTableRowElement>,
  HTMLTableRowElement
>

export type NativeTable = DetailedHTMLProps<
  HTMLAttributes<HTMLTableElement>,
  HTMLTableElement
>
