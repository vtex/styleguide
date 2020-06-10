import { useMemo, useState } from 'react'

import {
  DEFAULT_SIZE,
  DEFAULT_DENSITY_MAP,
  DEFAULT_BASE_DENSITY,
  DEFAULT_HEADER_HEIGHT,
} from './constants'

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
