import React, { cloneElement } from 'react'
import PropTypes from 'prop-types'

const Tabs = ({ children, fullWidth, sticky }) => {
  const childrenArray = [].concat(children)

  const selectedTab = childrenArray.find(child => child.props.active)

  const content = selectedTab && selectedTab.props.children
  return (
    <div
      className={`vtex-tabs w-100 h-100 flex flex-column ${
        sticky ? 'overflow-y-hidden' : ''
      }`}>
      <div className="vtex-tabs__nav flex flex-row bb b--muted-4">
        {childrenArray.map((child, index) =>
          cloneElement(child, {
            fullWidth,
            key: child.props.key != null ? child.props.key : index,
          })
        )}
      </div>
      <div
        className={`vtex-tabs__content w-100 ${
          sticky ? 'overflow-y-auto' : ''
        }`}>
        {content}
      </div>
    </div>
  )
}

Tabs.defaultProps = {
  fullWidth: false,
  sticky: false,
}

Tabs.propTypes = {
  children: PropTypes.arrayOf(PropTypes.node),
  fullWidth: PropTypes.bool,
  sticky: PropTypes.bool,
}

export default Tabs
