import { createRef } from 'react'

import mergeRef, { setRef } from './index'

describe('setRef', () => {
  it('works with functions', () => {
    const mutableStructure = {
      value: 0,
    }
    const double = (value: number) => (mutableStructure.value = value * 2)
    setRef(double, 5)
    expect(mutableStructure.value).toBe(10)
    setRef(double, 20)
    expect(mutableStructure.value).toBe(40)
  })

  it('works with refs', () => {
    const ref = createRef()
    setRef(ref, 5)
    expect(ref.current).toBe(5)
    setRef(ref, 20)
    expect(ref.current).toBe(20)
  })
})

describe('mergeRef', () => {
  it('should sync refs', () => {
    const refA = createRef()
    const refB = createRef()
    const mergedFn = mergeRef(refA, refB)

    mergedFn?.(10)

    expect(refA.current).toBe(10)
    expect(refB.current).toBe(10)
  })
})
