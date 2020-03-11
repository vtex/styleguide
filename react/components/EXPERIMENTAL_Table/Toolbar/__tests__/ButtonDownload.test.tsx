import React from 'react'
import { render } from '@testing-library/react'

import { ButtonGroupProvider } from '../context'
import ButtonDownload from '../ButtonDownload'

describe('Table V2 @ Toolbar/ButtonDownload spec', () => {
  const basicProps = {
    label: 'Download',
    onClick: () => {},
  }

  it('renders the component', () => {
    const button = render(
      <ButtonGroupProvider testId="testId">
        <ButtonDownload {...basicProps} />
      </ButtonGroupProvider>
    )
    expect(button.asFragment()).toMatchSnapshot()
  })
})
