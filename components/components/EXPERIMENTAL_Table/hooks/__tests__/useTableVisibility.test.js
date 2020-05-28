import { renderHook, act } from '@testing-library/react-hooks'

import useTableVisibility from '../useTableVisibility'

describe('Table V2 @ hooks/useTableVisibility spec', () => {
  const columns = [{ id: 'name' }, { id: 'location' }, { id: 'company' }]
  const ids = columns.map(col => col.id)

  it('toggles correctly', () => {
    const { result } = renderHook(() =>
      useTableVisibility({ columns, hiddenColumns: ['name'] })
    )

    expect(result.current.hiddenColumns).toEqual(['name'])
    expect(result.current.visibleColumns).toEqual([
      { id: 'location' },
      { id: 'company' },
    ])

    act(() => {
      result.current.toggleColumn('name')
    })

    expect(result.current.hiddenColumns).toEqual([])
    expect(result.current.visibleColumns).toEqual(columns)

    act(() => {
      result.current.toggleColumn('location')
    })

    expect(result.current.hiddenColumns).toEqual(['location'])
    expect(result.current.visibleColumns).toEqual([
      { id: 'name' },
      { id: 'company' },
    ])

    act(() => {
      result.current.toggleColumn('company')
    })

    expect(result.current.hiddenColumns).toEqual(['location', 'company'])
    expect(result.current.visibleColumns).toEqual([{ id: 'name' }])
  })

  it('shows a column correctly', () => {
    const { result } = renderHook(() =>
      useTableVisibility({ columns, hiddenColumns: ['name'] })
    )

    expect(result.current.visibleColumns).toEqual([
      { id: 'location' },
      { id: 'company' },
    ])

    act(() => {
      result.current.showColumn('name')
    })

    expect(result.current.hiddenColumns).toEqual([])
    expect(result.current.visibleColumns).toEqual(columns)
  })

  it('hides a column correctly', () => {
    const { result } = renderHook(() =>
      useTableVisibility({ columns, hiddenColumns: ['name'] })
    )

    expect(result.current.visibleColumns).toEqual([
      { id: 'location' },
      { id: 'company' },
    ])

    act(() => {
      result.current.hideColumn('location')
    })

    expect(result.current.hiddenColumns).toEqual(['name', 'location'])
    expect(result.current.visibleColumns).toEqual([{ id: 'company' }])
  })

  it('hiddes all columns', () => {
    const { result } = renderHook(() => useTableVisibility({ columns }))

    expect(result.current.hiddenColumns).toEqual([])
    expect(result.current.visibleColumns).toEqual(columns)

    act(() => {
      result.current.hideAllColumns()
    })

    expect(result.current.hiddenColumns).toEqual(ids)
    expect(result.current.visibleColumns).toEqual([])
  })

  it('shows all columns', () => {
    const { result } = renderHook(() =>
      useTableVisibility({
        columns,
        hiddenColumns: ['name', 'location', 'company'],
      })
    )

    expect(result.current.hiddenColumns).toEqual(ids)
    expect(result.current.visibleColumns).toEqual([])

    act(() => {
      result.current.showAllColumns()
    })

    expect(result.current.hiddenColumns).toEqual([])
    expect(result.current.visibleColumns).toEqual(columns)
  })
})
