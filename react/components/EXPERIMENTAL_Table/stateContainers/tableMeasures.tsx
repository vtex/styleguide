import React, {
  useMemo,
  useState,
  createContext,
  useContext,
  ReactNode,
} from 'react'

import {
  TABLE_HEADER_HEIGHT,
  EMPTY_STATE_SIZE_IN_ROWS,
  DEFAULT_SCROLLBAR_WIDTH,
} from '../constants'
import { Items } from './data'

export default function useTableMeasures({
  items,
  density = Density.MEDIUM,
}: MeasuresData) {
  const [selectedDensity, setSelectedDensity] = useState<Density>(density)
  const rowHeight = getRowHeight(selectedDensity)

  const tableHeight = useMemo(
    () => calculateTableHeight(rowHeight, items.length),
    [items, rowHeight]
  )

  return {
    selectedDensity,
    rowHeight,
    tableHeight,
    setSelectedDensity,
  }
}

export type MeasuresData = {
  items: Items
  density: Density
}

const MeasuresContext = createContext<Partial<
  ReturnType<typeof useTableMeasures>
> | null>(null)

export function useMeasuresState() {
  const state = useContext(MeasuresContext)
  if (!state)
    throw new Error('This component is not under the Measures Context')
  return state
}

export function MeasuresProvider({
  value,
  children,
}: {
  value: ReturnType<typeof useTableMeasures>
  children: ReactNode
}) {
  return (
    <MeasuresContext.Provider value={value}>
      {children}
    </MeasuresContext.Provider>
  )
}

export function calculateTableHeight(
  tableRowHeight: number,
  totalItems: number
): number {
  const multiplicator = totalItems !== 0 ? totalItems : EMPTY_STATE_SIZE_IN_ROWS
  return (
    TABLE_HEADER_HEIGHT + tableRowHeight * multiplicator + getScrollbarWidth()
  )
}

export function getScrollbarWidth(): number {
  if (!window || !document || !document.documentElement)
    return DEFAULT_SCROLLBAR_WIDTH
  const scrollbarWidth =
    window.innerWidth - document.documentElement.clientWidth
  return isNaN(scrollbarWidth) ? DEFAULT_SCROLLBAR_WIDTH : scrollbarWidth
}

export enum Density {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
}

export enum DesitySizes {
  low = 76,
  medium = 48,
  high = 32,
}

export const DENSITY_OPTIONS = [Density.LOW, Density.MEDIUM, Density.HIGH]

export function getRowHeight(density: Density): number {
  switch (density) {
    case Density.LOW:
      return DesitySizes.low
    case Density.MEDIUM:
      return DesitySizes.medium
    case Density.HIGH:
      return DesitySizes.high
  }
}
