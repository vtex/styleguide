import React, { Component, cloneElement } from 'react'
import PropTypes from 'prop-types'

class Tabs extends Component {
  render() {
    const { children, fullWidth } = this.props
    const selectedTab = children.find(child => child.props.active)
    const content = selectedTab && selectedTab.props.children
    return (
      <div className="vtex-tabs w-100">
        <div className="vtex-tabs__nav flex flex-row bb b--muted-4 overflow-y-auto">
          {children.map(child =>
            cloneElement(child, { fullWidth, key: child.props.label.toString() })
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
}

Tabs.propTypes = {
  children: PropTypes.arrayOf(PropTypes.node),
  fullWidth: PropTypes.bool,
}

export default Tabs
