import React from 'react'
import { render } from '@testing-library/react'

import Checkbox from '.'

describe('Checkbox', () => {
  it('should define the current attribute of the ref object', () => {
    const refObj = {}

    render(
      <Checkbox
        ref={refObj}
        name="checkme"
        id="my-checkbox"
        onChange={() => {}}
        isClicked="false"
        facetKey="my-key"
      />
    )

    const inputElement = document.querySelector('input')
    expect(refObj.current).toBe(inputElement)
  })

  it('should accept a ref that is a function', () => {
    const refSpy = jest.fn()
    render(
      <Checkbox
        ref={refSpy}
        name="checkme"
        id="my-checkbox"
        onChange={() => {}}
        queryText="my-query"
      />
    )
    const inputElement = document.querySelector('input')

    expect(refSpy).toBeCalledWith(inputElement)
  })

  it('should accept not passing a ref', () => {
    render(<Checkbox name="checkme" id="my-checkbox" onChange={() => {}} queryCategory="my-query"/>)
    const inputElement = document.querySelector('input')

    expect(inputElement).toBeTruthy()
  })

})
