import { Ref, useMemo } from 'react'

const mergeRefs = <T>(...refs: Ref<T>[]) => {
  return (node: T) => {
    refs.forEach(ref => {
      if (ref == null) {
        return
      }

      if (typeof ref === 'function') {
        ref(node)
        return
      }

      // The typescript definition for a ref
      // object types the `current` property
      // as read-only, but we can safely write
      // to it.
      ;(ref as any).current = node
    })
  }
}

const useMergeRefs = <T>(...refs: Ref<T>[]) => {
  return useMemo(
    () => mergeRefs(...refs),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    refs
  )
}

export default useMergeRefs
