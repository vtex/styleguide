/* eslint-disable @typescript-eslint/no-explicit-any */
import { MutableRefObject } from 'react'
import memoize from 'memoize-one'

export function setRef(
  ref: MutableRefObject<any> | Function | undefined,
  value: any = null
) {
  if (!ref) return

  if (typeof ref === 'function') {
    ref(value)
  } else {
    ref.current = value
  }
}

/**
 * Merges/Aligns the values of two refs
 */
function mergeRef(refA?: MutableRefObject<any>, refB?: MutableRefObject<any>) {
  if (refA == null && refB == null) {
    return null
  }
  return (value: any) => {
    setRef(refA, value)
    setRef(refB, value)
  }
}

export default memoize(mergeRef)
