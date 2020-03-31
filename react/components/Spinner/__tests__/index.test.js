import React from 'react'
import { render } from '@testing-library/react'

import Spinner from '../index'

describe('Spinner', () => {
  it('matches snapshot', () => {
    const component = render(<Spinner />)
    expect(component.asFragment()).toMatchSnapshot()
  })
  it('renders with the correct color', () => {
    const component = render(<Spinner color="#000" />)
    expect(component.asFragment()).toMatchSnapshot()
    expect(
      component.container
        .querySelector('.vtex-spinner_circle')
        .getAttribute('stroke')
    ).toBe('#000')
  })
  it('renders with the correct size', () => {
    const component = render(<Spinner size={100} />)
    expect(component.asFragment()).toMatchSnapshot()
    expect(
      component.container
        .querySelector('.vtex__icon-spinner')
        .getAttribute('height')
    ).toBe('100')
    expect(
      component.container
        .querySelector('.vtex__icon-spinner')
        .getAttribute('width')
    ).toBe('100')
  })
})
