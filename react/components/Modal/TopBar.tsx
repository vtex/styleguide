import React, { forwardRef } from 'react'

import IconClose from '../icon/Close'

export interface TopBarProps {
  showCloseIcon: boolean
  title?: string
  showTopBar?: boolean
  onClose: () => unknown
}

const TopBar = forwardRef<HTMLDivElement, TopBarProps>(function TopBar(
  { showCloseIcon, title, showTopBar, onClose },
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
    <div className="min-h-large">
      {showTopBar && title && <div className="">{title}</div>}
      {showCloseIcon && (
        <div
          className="fr mr6 mt6 pointer"
          role="button"
          onKeyDown={handleKeyDown}
          onClick={onClose}
        >
          <IconClose color="black" />
        </div>
      )}
    </div>
  )
})

export default TopBar
