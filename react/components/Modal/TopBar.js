import React from 'react'
import PropTypes from 'prop-types'
import IconClose from '../icon/Close'
import { shadowTransition } from './global.css'

const TopBar = props => {
  const { title, onClose, showBottomShadow, responsiveFullScreen } = props

  return (
    <div
      className={`
        flex justify-content ${title ? 'pv6' : ''}
        ${responsiveFullScreen ? 'pl7 pl8-ns' : 'pl8'}
        ${shadowTransition}
        ${showBottomShadow ? 'shadow-4' : ''}
      `}>
      <span className="f3 c-on-base">
        {title}
        {showBottomShadow}
      </span>
      <div
        className={`pl7 pointer ml-auto items-center flex ${
          title ? 'mr6' : 'pv5 mr5'
        }`}
        onClick={onClose}>
        <IconClose size={18} />
      </div>
    </div>
  )
}

TopBar.propTypes = {
  title: PropTypes.string,
  onClose: PropTypes.func,
  showBottomShadow: PropTypes.bool,
  responsiveFullScreen: PropTypes.bool,
}

TopBar.defaultProps = {
  showBottomShadow: false,
  responsiveFullScreen: false,
}

export default TopBar
