import React from 'react'
import PropTypes from 'prop-types'
import IconClose from '../icon/Close'
import { shadowTransition } from './global.css'

const TopBar = props => {
  const { title, onClose, showBottomShadow } = props

  return (
    <div
      className={`
        flex justify-content pl7 pv5 flex-shrink-0
        ${shadowTransition}
        ${showBottomShadow ? 'shadow-4' : ''}
      `}>
      <span className="f3 c-on-base">
        {title}
        {showBottomShadow}
      </span>
      <div className="ph7 pointer ml-auto items-center flex" onClick={onClose}>
        <IconClose size={16} />
      </div>
    </div>
  )
}

TopBar.propTypes = {
  title: PropTypes.string,
  onClose: PropTypes.func,
  showBottomShadow: PropTypes.bool,
}

TopBar.defaultProps = {
  showBottomShadow: false,
}

export default TopBar
