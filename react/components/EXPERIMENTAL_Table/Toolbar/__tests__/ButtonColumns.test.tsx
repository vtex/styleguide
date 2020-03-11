import React from 'react'
import { renderHook } from '@testing-library/react-hooks'
import { render } from '@testing-library/react'

import ButtonColumns from '../ButtonColumns'
import { ButtonGroupProvider } from '../context'
import useTableVisibility from '../../hooks/useTableVisibility'

describe('Table V2 Toolbar <ButtonColumns /> spec', () => {
  const basicProps = {
    label: 'Toggle visible fields',
    showAllLabel: 'Show All',
    hideAllLabel: 'Hide All',
  }

  it('renders the component', () => {
    const { result } = renderHook(() =>
      useTableVisibility({
        columns: [{ id: 'name', title: 'Name' }],
        hiddenColumns: [],
      })
    )
    const button = render(
      <ButtonGroupProvider testId="testId">
        <ButtonColumns visibility={result.current} {...basicProps} />
      </ButtonGroupProvider>
    )
    expect(button.asFragment()).toMatchSnapshot()
  })
})

export type ButtonColumnsProps = {
  label: string
  showAllLabel: string
  hideAllLabel: string
  disabled: boolean
  visibility: ReturnType<typeof useTableVisibility>
}
