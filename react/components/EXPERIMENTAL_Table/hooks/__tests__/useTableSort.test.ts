import { renderHook, act } from '@testing-library/react-hooks'

import useTableSort, { SortOrder } from '../useTableSort'

describe('Table V2 @ hooks/useTableSort spec', () => {
  it('sorts ASC correctly', () => {
    const { result } = renderHook(() => useTableSort())

    expect(result.current.sorted).toEqual({ by: null, order: null })

    act(() => {
      result.current.sort('name')
    })

    expect(result.current.sorted).toEqual({ by: 'name', order: SortOrder.ASC })
  })

  it('sorts DSC correctly', () => {
    const { result } = renderHook(() => useTableSort())

    expect(result.current.sorted).toEqual({ by: null, order: null })

    act(() => {
      result.current.sort('name')
    })

    expect(result.current.sorted).toEqual({ by: 'name', order: SortOrder.ASC })

    act(() => {
      result.current.sort('name')
    })

    expect(result.current.sorted).toEqual({ by: 'name', order: SortOrder.DSC })
  })

  it('chages base correctly', () => {
    const { result } = renderHook(() => useTableSort())

    expect(result.current.sorted).toEqual({ by: null, order: null })

    act(() => {
      result.current.sort('name')
    })

    expect(result.current.sorted).toEqual({ by: 'name', order: SortOrder.ASC })

    act(() => {
      result.current.sort('age')
    })

    expect(result.current.sorted).toEqual({ by: 'age', order: SortOrder.ASC })
  })

  it('clears correctly', () => {
    const { result } = renderHook(() => useTableSort())

    expect(result.current.sorted).toEqual({ by: null, order: null })

    act(() => {
      result.current.sort('age')
    })

    expect(result.current.sorted).toEqual({ by: 'age', order: SortOrder.ASC })

    act(() => {
      result.current.clear()
    })

    expect(result.current.sorted).toEqual({ by: null, order: null })
  })
})
