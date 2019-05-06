import React from 'react'
import PropTypes from 'prop-types'
import { shadowTransition } from './global.css'

const BottomBar = props => {
  const { children, showTopShadow } = props

  return (
    <div
      className={`
        flex justify-content ph7 pv5 bt b--muted-4 flex-row-reverse flex-shrink-0
        ${shadowTransition}
        ${showTopShadow ? 'shadow-4' : ''}
      `}>
      {children}
    </div>
  )
}

BottomBar.propTypes = {
  showTopShadow: PropTypes.bool,
  children: PropTypes.node,
}

BottomBar.defaultProps = {
  showTopShadow: false,
}

export default BottomBar
