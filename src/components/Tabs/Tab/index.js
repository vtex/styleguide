import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

class Tab extends PureComponent {
  render() {
    return <div className="vtex-tab_content">{this.props.children}</div>
  }
}

Tab.propTypes = {
  children: PropTypes.node,
}

export default Tab
