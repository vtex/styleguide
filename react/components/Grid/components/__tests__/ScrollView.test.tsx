import React from 'react'
import { render } from '@testing-library/react'

import ScrollView from '../ScrollView'
import { MeasuresProvider } from '../../context/measures'

describe('Grid.ScrollView', () => {
  it('should have the correct height', () => {
    const measures = {
      density: 'compact',
      headerHeight: 0,
      setDensity: () => null,
      baseHeight: 20,
      combinedHeight: 100,
    }

    const { getByTestId } = render(
      <MeasuresProvider measures={measures}>
        <ScrollView data-testid="view">
          <span>test</span>
        </ScrollView>
      </MeasuresProvider>
    )

    expect(getByTestId('view').style.height).toBe(
      `${measures.combinedHeight}px`
    )
  })
})
