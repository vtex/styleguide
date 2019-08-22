import { useState } from 'react'

import { TABLE_DENSITIES } from '../constants'

export const getRowHeight = (density: Density) => {
  switch (density) {
    case TABLE_DENSITIES.LOW:
      return 76
    case TABLE_DENSITIES.MEDIUM:
      return 48
    case TABLE_DENSITIES.HIGH:
      return 32
    default:
      return 45
  }
}

const useDensity = (density: Density) => {
  const [selectedDensity, setSelectedDensity] = useState<Density>(density)
  const rowHeight = getRowHeight(selectedDensity)

  return {
    selectedDensity,
    setSelectedDensity,
    rowHeight,
  }
}

export default useDensity
