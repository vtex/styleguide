import React from 'react'
import { render } from '@testing-library/react'

import { ButtonGroupProvider } from '../context'
import ButtonNewLine from '../ButtonNewLine'

describe('Table V2 @ Toolbar/ButtonNewLine spec', () => {
  const basicProps = {
    label: 'New',
    onClick: () => {},
  }

  it('matches snapshot', () => {
    const button = render(
      <ButtonGroupProvider testId="button-group">
        <ButtonNewLine {...basicProps} />
      </ButtonGroupProvider>
    )
    expect(button.asFragment()).toMatchSnapshot()
  })
})
