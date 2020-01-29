import { useMemo, useState } from 'react'

const DEFAULT_SCROLLBAR_WIDTH = 17
const EMPTY_STATE_SIZE_IN_ROWS = 5
export const TABLE_HEADER_HEIGHT = 36

export default function useTableMeasures({
  size = 0,
  density = Density.Regular,
}: MeasuresInput) {
  const [currentDensity, setCurrentDensity] = useState<Density>(density)

  const rowHeight = useMemo(() => getRowHeight(currentDensity), [
    currentDensity,
  ])

  const tableHeight = useMemo(() => calculateTableHeight(rowHeight, size), [
    rowHeight,
    size,
  ])

  return {
    currentDensity,
    rowHeight,
    tableHeight,
    setCurrentDensity,
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
  Compact = 'compact',
  Regular = 'regular',
  Comfortable = 'comfortable',
}

export enum DesitySizes {
  Compact = 32,
  Regular = 48,
  Comfortable = 76,
}

export const DENSITY_OPTIONS = [
  Density.Compact,
  Density.Regular,
  Density.Comfortable,
]

export function getRowHeight(density: Density): number {
  switch (density) {
    case Density.Compact:
      return DesitySizes.Compact
    case Density.Regular:
      return DesitySizes.Regular
    case Density.Comfortable:
      return DesitySizes.Comfortable
  }
}
