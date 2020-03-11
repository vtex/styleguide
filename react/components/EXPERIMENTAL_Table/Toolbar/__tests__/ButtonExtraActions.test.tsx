import React from 'react'
import { render, fireEvent, screen } from '@testing-library/react'

import { ButtonGroupProvider } from '../context'
import ButtonExtraActions from '../ButtonExtraActions'

describe('Table V2 @ Toolbar/ButtonExtraActions spec', () => {
  const basicProps = {
    label: 'More',
    actions: [
      {
        label: 'First',
        onClick: () => {},
      },
      {
        label: 'Second',
        onClick: () => {},
      },
      {
        label: 'Third',
        onClick: () => {},
      },
    ],
  }

  function WrappedComponent() {
    return (
      <ButtonGroupProvider testId="button-group">
        <ButtonExtraActions {...basicProps} />
      </ButtonGroupProvider>
    )
  }

  it('matches snapshot', () => {
    const button = render(<WrappedComponent />)

    expect(button.asFragment()).toMatchSnapshot()
  })
  it('matches snapshot after click', () => {
    const button = render(<WrappedComponent />)
    fireEvent.click(screen.getByTestId('button-group__extra-actions'))
    expect(button.asFragment()).toMatchSnapshot()
  })
})
