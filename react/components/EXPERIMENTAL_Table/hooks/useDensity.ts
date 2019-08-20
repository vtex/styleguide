import { useState, useMemo } from 'react'
import { getRowHeight } from '../util'

const useDensity = (density: Density) => {
  const [selectedDensity, setSelectedDensity] = useState<Density>(density)
  const rowHeight = useMemo(() => getRowHeight(selectedDensity), [
    selectedDensity,
  ])

  return {
    selectedDensity,
    setSelectedDensity,
    rowHeight,
  }
}

export default useDensity
