import React, { forwardRef } from 'react'

const BottomBar = forwardRef<HTMLDivElement, { children: React.ReactNode }>(
  function BottomBar({ children }, forwardedRef) {
    return (
      <div
        className={`
        flex justify-content flex-row-reverse 'ph6 ph8-ns pv5 pv6-ns '
        }
      `}
        ref={forwardedRef}
      >
        {children}
      </div>
    )
  }
)

export default BottomBar
