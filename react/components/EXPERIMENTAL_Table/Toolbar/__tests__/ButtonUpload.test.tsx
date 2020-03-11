import React from 'react'
import { render } from '@testing-library/react'

import { ButtonGroupProvider } from '../context'
import ButtonUpload from '../ButtonUpload'

describe('Table V2 @ Toolbar/ButtonUpload spec', () => {
  const basicProps = {
    label: 'Upload',
    onClick: () => {},
  }

  it('renders the component', () => {
    const button = render(
      <ButtonGroupProvider testId="testId">
        <ButtonUpload {...basicProps} />
      </ButtonGroupProvider>
    )
    expect(button.asFragment()).toMatchSnapshot()
  })
})
