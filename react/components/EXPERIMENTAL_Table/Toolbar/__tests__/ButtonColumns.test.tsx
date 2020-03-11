import React from 'react'
import { renderHook } from '@testing-library/react-hooks'
import { render, fireEvent, screen } from '@testing-library/react'

import ButtonColumns from '../ButtonColumns'
import { ButtonGroupProvider } from '../context'
import useTableVisibility from '../../hooks/useTableVisibility'

describe('Table V2 @ Toolbar/ButtonColumns spec', () => {
  const basicProps = {
    label: 'Toggle visible fields',
    showAllLabel: 'Show All',
    hideAllLabel: 'Hide All',
  }

  const { result } = renderHook(() =>
    useTableVisibility({
      columns: [{ id: 'name', title: 'Name' }],
      hiddenColumns: [],
    })
  )

  it('matches snapshot', () => {
    const button = render(
      <ButtonGroupProvider testId="testId">
        <ButtonColumns visibility={result.current} {...basicProps} />
      </ButtonGroupProvider>
    )
    expect(button.asFragment()).toMatchSnapshot()
  })
  it('matches snapshot after click', () => {
    const button = render(
      <ButtonGroupProvider testId="testId">
        <ButtonColumns visibility={result.current} {...basicProps} />
      </ButtonGroupProvider>
    )
    fireEvent.click(screen.getByTestId('testId__columns'))
    expect(button.asFragment()).toMatchSnapshot()
  })
})
