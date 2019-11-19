import { useMemo, useState } from 'react'

const DEFAULT_SCROLLBAR_WIDTH = 17
const EMPTY_STATE_SIZE_IN_ROWS = 5
export const TABLE_HEADER_HEIGHT = 36

export default function useTableMeasures({
  size = 0,
  density = Density.MEDIUM,
}: MeasuresInput) {
  const [selectedDensity, setSelectedDensity] = useState<Density>(density)

  const rowHeight = useMemo(() => getRowHeight(selectedDensity), [
    selectedDensity,
  ])

  const tableHeight = useMemo(() => calculateTableHeight(rowHeight, size), [
    size,
    selectedDensity,
  ])

  return {
    selectedDensity,
    rowHeight,
    tableHeight,
    setSelectedDensity,
  }
}

export type MeasuresInput = {
  size: number
  density: Density
}

export function calculateTableHeight(
  rowHeight: number,
  tableSize: number
): number {
  const multiplicator = tableSize !== 0 ? tableSize : EMPTY_STATE_SIZE_IN_ROWS
  return TABLE_HEADER_HEIGHT + rowHeight * multiplicator + getScrollbarWidth()
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
