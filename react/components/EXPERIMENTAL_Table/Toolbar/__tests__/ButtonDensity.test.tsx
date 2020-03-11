import React from 'react'
import { renderHook } from '@testing-library/react-hooks'
import { render, fireEvent, screen } from '@testing-library/react'

import { ButtonGroupProvider } from '../context'
import useTableMeasures from '../../hooks/useTableMeasures'
import { MeasuresProvider } from '../../context/measures'
import ButtonDensity from '../ButtonDensity'

describe('Table V2 @ Toolbar/ButtonDensity spec', () => {
  const basicProps = {
    label: 'Line density',
    compactLabel: 'Compact',
    regularLabel: 'Regular',
    comfortableLabel: 'Comfortable',
  }

  const { result } = renderHook(() =>
    useTableMeasures({
      size: 5,
    })
  )

  it('matches snapshot', () => {
    const button = render(
      <MeasuresProvider measures={result.current}>
        <ButtonGroupProvider testId="button-group">
          <ButtonDensity {...basicProps} />
        </ButtonGroupProvider>
      </MeasuresProvider>
    )

    expect(button.asFragment()).toMatchSnapshot()
  })
  it('matches snapshot after click', () => {
    const button = render(
      <MeasuresProvider measures={result.current}>
        <ButtonGroupProvider testId="button-group">
          <ButtonDensity {...basicProps} />
        </ButtonGroupProvider>
      </MeasuresProvider>
    )

    fireEvent.click(screen.getByTestId('button-group__density'))
    expect(button.asFragment()).toMatchSnapshot()
  })
})
