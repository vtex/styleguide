import { MutableRefObject } from 'react'
import memoize from 'memoize-one'

export function setRef(
  ref: MutableRefObject<unknown> | Function,
  value: unknown = null
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
function mergeRef(
  refA: MutableRefObject<unknown>,
  refB: MutableRefObject<unknown>
) {
  if (refA == null && refB == null) {
    return null
  }
  return (value: unknown) => {
    setRef(refA, value)
    setRef(refB, value)
  }
}

export default memoize(mergeRef)
