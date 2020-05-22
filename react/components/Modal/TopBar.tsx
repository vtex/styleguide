import React, { forwardRef, ReactNode } from 'react'
import classNames from 'classnames'

import IconClose from '../icon/Close'

export interface Props {
  showCloseIcon?: boolean
  showTopBar: boolean
  children: ReactNode
  onClose: () => unknown
  responsiveFullScreen?: boolean
}

function TopBar(
  { showCloseIcon, children, onClose, responsiveFullScreen, showTopBar }: Props,
  forwardedRef: React.Ref<HTMLDivElement>
) {
  const handleKeyDown = ({ key }: React.KeyboardEvent) => {
    const SPACE = ' '
    const ENTER = 'Enter'

    if (key === SPACE || key === ENTER) {
      onClose()
    }
  }

  return (
    <div className="mb5">
      <div className="min-h-small min-h-large-ns pl6 pl8-ns">
        {showCloseIcon && (
          <div
            className={classNames('fr pointer', {
              'pr7 pt7': responsiveFullScreen,
              'pr7-ns pt7-ns pr5 pt5': !responsiveFullScreen,
            })}
            role="button"
            aria-label="Modal Close Button"
            onKeyDown={handleKeyDown}
            onClick={onClose}
            ref={forwardedRef}
            tabIndex={0}
          >
            <IconClose color="black" />
          </div>
        )}
      </div>
      {showTopBar && children && (
        <span className="t-heading-4 ml8-ns ml6">{children}</span>
      )}
    </div>
  )
}

export default forwardRef<HTMLDivElement, Props>(TopBar)
