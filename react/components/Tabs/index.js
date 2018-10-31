import React, { Component, cloneElement } from 'react'
import PropTypes from 'prop-types'

class Tabs extends Component {
  render() {
    const { children, fullWidth, direction } = this.props
    const selectedTab = children.find(child => child.props.active)
    const content = selectedTab && selectedTab.props.children
    return (
      <div className="vtex-tabs w-100">
        <div className={`vtex-tabs__nav flex flex-${direction} ${direction === 'row' ? 'bb' : ''} b--muted-4 overflow-y-auto`}>
          {children.map(child =>
            cloneElement(child, { fullWidth, key: child.props.label.toString(), direction })
          )}
        </div>
        <div className="vtex-tabs__content w-100">
          {content}
        </div>
      </div>
    )
  }
}

Tabs.defaultProps = {
  fullWidth: false,
  direction: 'row',
}

Tabs.propTypes = {
  children: PropTypes.arrayOf(PropTypes.node),
  fullWidth: PropTypes.bool,
  direction: PropTypes.oneOf(['row', 'column']),
}

export default Tabs
