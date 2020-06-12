import React, { forwardRef, Ref } from 'react'
import classNames from 'classnames'

import { useMeasuresContext } from '../context/measures'

function ScrollView(props: NativeDiv, ref: Ref<HTMLDivElement>) {
  const { combinedHeight } = useMeasuresContext()
  const { children, style, className, ...rest } = props
  return (
    <div
      ref={ref}
      style={{ height: combinedHeight, ...style }}
      className={classNames(
        'mw-100 overflow-x-auto overflow-y-auto overflow-hidden',
        className
      )}
      {...rest}>
      {children}
    </div>
  )
}

export default forwardRef(ScrollView)
