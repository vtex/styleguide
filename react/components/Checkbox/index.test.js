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
      />
    )
    const inputElement = document.querySelector('input')

    expect(refSpy).toBeCalledWith(inputElement)
  })
})
