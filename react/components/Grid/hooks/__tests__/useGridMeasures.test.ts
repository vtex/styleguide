import { renderHook, act } from '@testing-library/react-hooks'

import useListMeasures from '../useGridMeasures'

describe('useGridMeasures', () => {
  it('should change density', () => {
    const { result } = renderHook(() =>
      useListMeasures({
        size: 5,
        densityMap: { small: 1, medium: 2, large: 3 },
        baseDensity: 'medium',
        headerHeight: 1,
      })
    )
    expect(result.current.baseHeight).toBe(2)
    act(() => {
      result.current.setDensity('large')
    })
    expect(result.current.baseHeight).toBe(3)
    act(() => {
      result.current.setDensity('small')
    })
    expect(result.current.baseHeight).toBe(1)
  })

  it('should combine heights', () => {
    const { result } = renderHook(() =>
      useListMeasures({
        size: 1,
        densityMap: { small: 1, medium: 2, large: 3 },
        baseDensity: 'medium',
        headerHeight: 1,
      })
    )
    expect(result.current.combinedHeight).toBe(3)
    act(() => {
      result.current.setDensity('large')
    })
    expect(result.current.combinedHeight).toBe(4)
    act(() => {
      result.current.setDensity('small')
    })
    expect(result.current.combinedHeight).toBe(2)
  })
})
