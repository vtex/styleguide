import React, { forwardRef } from 'react'
import classNames from 'classnames'

import IconClose from '../icon/Close'

export interface TopBarProps {
  showCloseIcon?: boolean
  title?: string
  showTopBar?: boolean
  onClose: () => unknown
  responsiveFullScreen: boolean
}

const TopBar = forwardRef<HTMLDivElement, TopBarProps>(function TopBar(
  { showCloseIcon, title, showTopBar, onClose, responsiveFullScreen },
  forwardedRef
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
      <div className="min-h-large pl8">
        {showCloseIcon && (
          <div
            className={classNames('fr pointer', {
              'pr6 pt6': responsiveFullScreen,
              'pr6-ns pt6-ns pr5 pt5': !responsiveFullScreen,
            })}
            role="button"
            onKeyDown={handleKeyDown}
            onClick={onClose}
            ref={forwardedRef}
            tabIndex={0}
          >
            <IconClose color="black" />
          </div>
        )}
      </div>
      {showTopBar && title && <span className="t-heading-4 ml8">{title}</span>}
    </div>
  )
})

export default TopBar
