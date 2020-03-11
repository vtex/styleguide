import { renderHook, act } from '@testing-library/react-hooks'

import useTableMeasures, { DesitySizes, Density } from '../useTableMeasures'

describe('Table V2 @ hooks/useTableMeasures spec', () => {
  const TABLE_SIZE = 5
  it('changes density correctly', () => {
    const { result } = renderHook(() => useTableMeasures({ size: TABLE_SIZE }))

    expect(result.current.currentDensity).toBe(Density.Regular)
    expect(result.current.rowHeight).toBe(DesitySizes.Regular)

    act(() => {
      result.current.setCurrentDensity(Density.Comfortable)
    })

    expect(result.current.currentDensity).toBe(Density.Comfortable)
    expect(result.current.rowHeight).toBe(DesitySizes.Comfortable)

    act(() => {
      result.current.setCurrentDensity(Density.Compact)
    })

    expect(result.current.currentDensity).toBe(Density.Compact)
    expect(result.current.rowHeight).toBe(DesitySizes.Compact)

    act(() => {
      result.current.setCurrentDensity(Density.Regular)
    })

    expect(result.current.currentDensity).toBe(Density.Regular)
    expect(result.current.rowHeight).toBe(DesitySizes.Regular)
  })

  it('calculates tableHeight correctly', () => {
    const { result } = renderHook(() => useTableMeasures({ size: TABLE_SIZE }))

    expect(result.current.tableHeight).toBe(1300)

    act(() => {
      result.current.setCurrentDensity(Density.Comfortable)
    })

    expect(result.current.tableHeight).toBe(1440)

    act(() => {
      result.current.setCurrentDensity(Density.Compact)
    })

    expect(result.current.tableHeight).toBe(1220)

    act(() => {
      result.current.setCurrentDensity(Density.Regular)
    })

    expect(result.current.tableHeight).toBe(1300)
  })
})
