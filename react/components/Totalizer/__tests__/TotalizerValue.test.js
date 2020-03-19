import React from 'react'
import { render } from 'react-testing-library'

import TotalizerValue from '../TotalizerValue'

describe('Totalizer/Value spec', () => {
  const testId = 'testing_id'
  const value = 'value'

  it('should match snapshot on desktop', () => {
    const Value = render(<TotalizerValue item={{ value }} testId={testId} />)
    expect(Value.asFragment()).toMatchSnapshot()
  })

  it('should match snapshot on mobile', () => {
    const Value = render(
      <TotalizerValue item={{ value }} testId={testId} mobileScroll />
    )
    expect(Value.asFragment()).toMatchSnapshot()
  })

  it('should match snapshot while loading', () => {
    const Value = render(
      <TotalizerValue item={{ value, isLoading: true }} testId={testId} />
    )
    expect(Value.asFragment()).toMatchSnapshot()
  })

  it('should match snapshot while loading on mobile', () => {
    const Value = render(
      <TotalizerValue
        item={{ value, isLoading: true }}
        testId={testId}
        mobileScroll
      />
    )
    expect(Value.asFragment()).toMatchSnapshot()
  })

  it('should render correctly', () => {
    const Value = render(<TotalizerValue item={{ value }} />)
    const ElementToTest = Value.getByTestId(testId)
    expect(ElementToTest).toBeTruthy()
    expect(ElementToTest.childElementCount).toBe(0)
    expect(ElementToTest.textContent).toBe(value)
  })

  it('should render correctly while loading', () => {
    const Loading = render(<TotalizerValue item={{ value, isLoading: true }} />)
    const ElementLoading = Loading.getByTestId(`${testId}__loading`)
    expect(ElementLoading).toBeTruthy()
    expect(ElementLoading.childElementCount).toBe(1)
    expect(ElementLoading.textContent).not.toBe(value)
  })
})
