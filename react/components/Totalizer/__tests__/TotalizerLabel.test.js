import React from 'react'
import { render } from 'react-testing-library'

import TotalizerLabel from '../TotalizerLabel'

describe('Totalizer/Label spec', () => {
  const testId = 'testing_id'
  const label = 'testing_label'
  const props = {
    label,
    testId,
  }

  it('should match snapshot on desktop', () => {
    const Label = render(<TotalizerLabel {...props} />)
    expect(Label.asFragment()).toMatchSnapshot()
  })

  it('should match snapshot on mobile', () => {
    const Label = render(<TotalizerLabel {...props} mobileScroll />)
    expect(Label.asFragment()).toMatchSnapshot()
  })

  it('should render correctly', () => {
    const Label = render(<TotalizerLabel {...props} />)
    const ElementToTest = Label.getByTestId(testId)
    expect(ElementToTest).toBeTruthy()
    expect(ElementToTest.childElementCount).toBe(0)
    expect(ElementToTest.textContent).toBe(label)
  })
})
