import React from 'react'
import PropTypes from 'prop-types'

import IconClose from '../icon/Close'
import styles from './modal.css'

const TopBar = props => {
  const {
    title,
    onClose,
    showBottomShadow,
    responsiveFullScreen,
    showCloseIcon,
  } = props

  return (
    <div
      className={`
        flex justify-content relative ${title ? 'pv5 pv6-ns' : ''}
        ${responsiveFullScreen ? 'pl7 pr8 pl8-ns pl8-ns' : 'pl6 pr8 pl8-ns'}
        ${styles.shadowTransition}
        ${showBottomShadow ? 'shadow-4' : ''}
      `}>
      <span className="f3 c-on-base w-100">
        {title}
        {showBottomShadow}
      </span>
      {showCloseIcon && (
        <div
          className={
            'vtex-modal__close-icon absolute top-0 right-0 pa5 pa6-ns pointer ml-auto items-center flex'
          }
          onClick={onClose}>
          <IconClose size={18} />
        </div>
      )}
    </div>
  )
}

TopBar.propTypes = {
  title: PropTypes.node,
  onClose: PropTypes.func,
  showBottomShadow: PropTypes.bool,
  responsiveFullScreen: PropTypes.bool,
  showCloseIcon: PropTypes.bool,
}

TopBar.defaultProps = {
  showBottomShadow: false,
  responsiveFullScreen: false,
}

export default TopBar
