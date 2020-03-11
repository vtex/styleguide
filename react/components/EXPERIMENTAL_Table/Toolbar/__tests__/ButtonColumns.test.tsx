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

  function WrappedComponent() {
    return (
      <ButtonGroupProvider testId="button-group">
        <ButtonColumns visibility={result.current} {...basicProps} />
      </ButtonGroupProvider>
    )
  }

  it('matches snapshot', () => {
    const button = render(<WrappedComponent />)
    expect(button.asFragment()).toMatchSnapshot()
  })
  it('matches snapshot after click', () => {
    const button = render(<WrappedComponent />)
    fireEvent.click(screen.getByTestId('button-group__columns'))
    expect(button.asFragment()).toMatchSnapshot()
  })
})
