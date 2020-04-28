import React, { forwardRef } from 'react'
import classNames from 'classnames'

export interface Props {
  showBorder?: boolean
  responsiveFullScreen?: boolean
  children?: React.ReactNode
}

function BottomBar(
  { showBorder = true, responsiveFullScreen = false, children }: Props,
  forwardedRef: React.Ref<HTMLDivElement>
) {
  if (!children) return <></>
  return (
    <div
      className={classNames(
        'flex justify-content flex-row-reverse min-h-regular-ns min-h-small pv6-ns ph8-ns pv7 ph6 mt3',
        {
          'bt b--muted-4': showBorder,
          pb7: responsiveFullScreen,
        }
      )}
      style={responsiveFullScreen ? { marginTop: 'auto' } : {}}
      ref={forwardedRef}
    >
      <div>{children}</div>
    </div>
  )
}

export default forwardRef<HTMLDivElement, Props>(BottomBar)
