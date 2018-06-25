import React, { Component } from 'react'
import PropTypes from 'prop-types'

class Tabs extends Component {
  render() {
    const { children } = this.props
    const selectedTab = children.find(child => child.props.active)
    const content = selectedTab && selectedTab.props.children
    return (
      <div className="w-100">
        <div className="flex flex-row bb b--light-gray mid-gray overflow-y-auto">
          {children.map(child => child)}
        </div>
        <div className="w-100">
          {content}
        </div>
      </div>
    )
  }
}

Tabs.propTypes = {
  children: PropTypes.arrayOf(PropTypes.node),
}

export default Tabs
