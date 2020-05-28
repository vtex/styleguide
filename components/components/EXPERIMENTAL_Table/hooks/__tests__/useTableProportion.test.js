import { renderHook } from '@testing-library/react-hooks'

import useTableProportion from '../useTableProportion'

describe('Table V2 @ hooks/useTableProportion spec', () => {
  const columns = [{ id: 'name' }, { id: 'location' }, { id: 'company' }]

  const ratio = [2, 1, 1]

  it('calculates widths correctly', () => {
    const { result } = renderHook(() => useTableProportion({ columns, ratio }))

    expect(result.current.sizedColumns).toEqual([
      { id: 'name', width: '50%' },
      { id: 'location', width: '25%' },
      { id: 'company', width: '25%' },
    ])
  })
})
