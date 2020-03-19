import React from 'react'
import { render } from 'react-testing-library'

import TotalizerIcon from '../TotalizerIcon'

describe('Totalizer/Icon spec', () => {
  const testId = 'testing'
  const bg = 'rgb(0, 0, 0)'
  const props = {
    item: {
      icon: <svg />,
      iconBackgroundColor: bg,
    },
    testId,
  }

  it('should match snapshot', () => {
    const Icon = render(<TotalizerIcon {...props} />)
    expect(Icon.asFragment()).toMatchSnapshot()
  })

  it('should render correctly', () => {
    const Icon = render(<TotalizerIcon testId={testId} {...props} />)
    const ElementToTest = Icon.getByTestId(testId)
    expect(ElementToTest).toBeTruthy()
    expect(ElementToTest.style.backgroundColor).toBe(bg)
    expect(ElementToTest.childElementCount).toBe(1)
  })
})
