import React, { Ref, forwardRef } from 'react'
import classNames from 'classnames'

import Spinner from '../../Spinner'
import { useMeasuresContext } from '../context/measures'
import { useLoadingEmptyContext } from '../context/loadingEmpty'

function LoadingView(
  { className, style, children, ...props }: NativeDiv,
  ref: Ref<HTMLDivElement>
) {
  const { combinedHeight, headerHeight } = useMeasuresContext()
  const { loading, empty } = useLoadingEmptyContext()
  const height = combinedHeight - headerHeight
  const showView = !empty && loading
  return showView ? (
    <div
      ref={ref}
      className={classNames('flex justify-center items-center', className)}
      style={{ height, ...style }}
      {...props}>
      {children || <Spinner />}
    </div>
  ) : null
}

export default forwardRef(LoadingView)
