import React, { forwardRef, ReactNode } from 'react'
import classNames from 'classnames'

import IconClose from '../icon/Close'
import { Key } from './utils'

export interface ModalTopBarProps {
  showCloseIcon?: boolean
  showTopBar: boolean
  children: ReactNode
  onClose: () => unknown
  responsiveFullScreen?: boolean
}

function TopBar(
  { showCloseIcon, children, onClose, showTopBar },
  forwardedRef
) {
  const handleKeyPress = ({ key }: React.KeyboardEvent) => {
    if (key === Key.SPACE || key === Key.ENTER) {
      onClose()
    }
  }

  return (
    <div>
      <div className="min-h-regular min-h-large-ns pl6 pl8-ns">
        {showCloseIcon && (
          <div className={'fr pointer pr5-ns pt5-ns pr4 pt4'}>
            <div
              role="button"
              aria-label="Modal Close Button"
              className={classNames(
                'ph3-ns pt3-ns pb2-ns ph2 pt2 pb1 br2 hover-b--transparent hover-bg-action-secondary hover-b--action-secondary'
              )}
              onKeyPress={handleKeyPress}
              onClick={onClose}
              ref={forwardedRef}
              tabIndex={0}>
              <IconClose size={20} color="black" />
            </div>
          </div>
        )}
      </div>
      {showTopBar && children && (
        <div className="t-heading-4 ml8-ns ml7 mb5">{children}</div>
      )}
    </div>
  )
}

export default forwardRef<HTMLDivElement, ModalTopBarProps>(TopBar)
