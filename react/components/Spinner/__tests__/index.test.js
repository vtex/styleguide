import React from 'react'
import { render } from '@testing-library/react'
import snapshotDiff from 'snapshot-diff'

import Spinner from '../index'

describe('Spinner spec', () => {
  it('matches snapshot', () => {
    const component = render(<Spinner />)
    expect(component.asFragment()).toMatchSnapshot()
  })
  it('diffs snapshots with different colors', () => {
    const black = render(<Spinner color="#000" />)
    const white = render(<Spinner color="#fff" />)

    expect(
      snapshotDiff(black.asFragment(), white.asFragment())
    ).toMatchSnapshot()
  })
  it('diffs snapshots with different sizes', () => {
    const small = render(<Spinner size={50} />)
    const large = render(<Spinner size={100} />)

    expect(
      snapshotDiff(small.asFragment(), large.asFragment())
    ).toMatchSnapshot()
  })
})
