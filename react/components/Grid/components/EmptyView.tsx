import React, { Ref, forwardRef } from 'react'

import { useMeasuresContext } from '../context/measures'
import { useLoadingEmptyContext } from '../context/loadingEmpty'

function EmptyView(
  { style, children, ...props }: NativeDiv,
  ref: Ref<HTMLDivElement>
) {
  const { combinedHeight, headerHeight } = useMeasuresContext()
  const { empty } = useLoadingEmptyContext()
  const height = combinedHeight - headerHeight
  return empty ? (
    <div ref={ref} style={{ height, ...style }} {...props}>
      {children}
    </div>
  ) : null
}

export default forwardRef(EmptyView)
