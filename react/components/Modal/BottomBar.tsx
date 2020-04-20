import React, { forwardRef } from 'react'
import classNames from 'classnames'

export interface Props {
  showBorder?: boolean
  responsiveFullScreen?: boolean
  children?: React.ReactNode
}

const BottomBar = forwardRef<HTMLDivElement, Props>(function BottomBar(
  { showBorder, responsiveFullScreen, children },
  forwardedRef
) {
  if (!children) return <></>
  return (
    <div
      className={classNames('flex justify-content flex-row-reverse', {
        'bt b--muted-4': showBorder,
        'ph7 pv5 ph8-ns pv6-ns': responsiveFullScreen,
        'ph6 ph8-ns pv5 pv6-ns': !responsiveFullScreen,
      })}
      ref={forwardedRef}
    >
      {children}
    </div>
  )
})

export default BottomBar
