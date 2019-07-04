import React from 'react'
import PropTypes from 'prop-types'

import styles from './modal.css'

const BottomBar = props => {
  const { children, showTopShadow, responsiveFullScreen } = props

  return (
    <div
      className={`
        flex justify-content bt b--muted-4 flex-row-reverse
        ${responsiveFullScreen ? 'ph7 pv5 ph8-ns pv6-ns' : 'ph8 pv6'}
        ${styles.shadowTransition}
        ${showTopShadow ? 'shadow-4' : ''}
      `}>
      {children}
    </div>
  )
}

BottomBar.propTypes = {
  showTopShadow: PropTypes.bool,
  children: PropTypes.node,
  responsiveFullScreen: PropTypes.bool,
}

BottomBar.defaultProps = {
  showTopShadow: false,
  responsiveFullScreen: false,
}

export default BottomBar
