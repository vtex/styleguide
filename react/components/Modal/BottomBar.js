import React from 'react'
import PropTypes from 'prop-types'

import styles from './modal.css'

const BottomBar = props => {
  const { children, showTopShadow, responsiveFullScreen, showBorder } = props

  return (
    <div
      className={`
        flex justify-content flex-row-reverse 
        ${showBorder ? 'bt b--muted-4 ' : ''}
        ${
          responsiveFullScreen
            ? 'ph7 pv5 ph8-ns pv6-ns '
            : 'ph6 ph8-ns pv5 pv6-ns '
        }
        ${styles.shadowTransition}
        ${showTopShadow ? 'shadow-4 ' : ''}
      `}>
      {children}
    </div>
  )
}

BottomBar.propTypes = {
  showTopShadow: PropTypes.bool,
  children: PropTypes.node,
  responsiveFullScreen: PropTypes.bool,
  showBorder: PropTypes.bool,
}

BottomBar.defaultProps = {
  showTopShadow: false,
  responsiveFullScreen: false,
}

export default BottomBar
