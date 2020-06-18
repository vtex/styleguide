import React, { forwardRef, ForwardRefRenderFunction } from 'react'
import classNames from 'classnames'

export interface ModalBottomBarProps {
  showBorder?: boolean
  responsiveFullScreen?: boolean
  children?: React.ReactNode
}

function BottomBar(
  { showBorder = true, responsiveFullScreen = false, children },
  forwardedRef
): ForwardRefRenderFunction<HTMLDivElement, ModalBottomBarProps> {
  if (!children) return null
  return (
    <div
      className={classNames(
        'flex justify-content flex-row-reverse min-h-regular-ns min-h-small pv6-ns ph8-ns pv7 ph7 mt3',
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

export default forwardRef<HTMLDivElement, ModalBottomBarProps>(BottomBar)
