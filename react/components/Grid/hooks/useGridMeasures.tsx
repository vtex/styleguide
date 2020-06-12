import { useMemo, useState } from 'react'

export const DEFAULT_SIZE = 5
export const DEFAULT_BASE_DENSITY = 'regular'
export const DEFAULT_DENSITY_MAP = { compact: 32, regular: 48, comfortable: 76 }
export const DEFAULT_HEADER_HEIGHT = 36

interface HookInput {
  size?: number
  baseDensity?: string
  headerHeight?: number
  densityMap?: Record<string, number>
}

export default function useStackSize({
  size = DEFAULT_SIZE,
  densityMap = DEFAULT_DENSITY_MAP,
  baseDensity = DEFAULT_BASE_DENSITY,
  headerHeight = DEFAULT_HEADER_HEIGHT,
}: HookInput) {
  const [density, setDensity] = useState<string>(baseDensity)

  const baseHeight = useMemo(() => densityMap[density], [densityMap, density])

  const combinedHeight = useMemo(() => headerHeight + baseHeight * size, [
    baseHeight,
    headerHeight,
    size,
  ])

  return {
    density,
    headerHeight,
    setDensity,
    baseHeight,
    combinedHeight,
  }
}
