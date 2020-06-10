import React from 'react'
import { render } from '@testing-library/react'

import Loop from '../Loop'

describe('Grid.Loop', () => {
  it('should render the correct number of items', () => {
    const coffeeList = [
      { id: 1, name: 'latte' },
      { id: 2, name: 'cappuccino' },
      { id: 3, name: 'espresso' },
      { id: 4, name: 'macchiato' },
      { id: 5, name: 'irish' },
    ]

    const { getAllByTestId } = render(
      <Loop list={coffeeList}>
        {coffee => <span data-testid="coffee">{coffee.name}</span>}
      </Loop>
    )

    expect(getAllByTestId('coffee')).toHaveLength(coffeeList.length)
  })

  it('should render with different data shapes', () => {
    const coffeeList = ['latte', 'cappuccino', 'espresso', 'macchiato', 'irish']

    const { getAllByTestId } = render(
      <Loop list={coffeeList} getKey={item => item}>
        {coffee => <span data-testid="coffee">{coffee}</span>}
      </Loop>
    )

    expect(getAllByTestId('coffee')).toHaveLength(coffeeList.length)
  })
})
