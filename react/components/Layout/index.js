import React, { Component } from 'react'
import PropTypes from 'prop-types'

class Layout extends Component {
  render() {
    const { fullWidth, pageHeader, children } = this.props

    return (
      <div className="vtex-layout-base flex justify-center pb7 bg-muted-5">
        <div style={{ maxWidth: fullWidth ? 'none' : '400px' }}>
          {pageHeader}
          <div className="vtex-layout-app-container ph7">{children}</div>
        </div>
      </div>
    )
  }
}

Layout.defaultProps = {
  fullWidth: false,
}

Layout.propTypes = {
  /** Content of the Layout */
  children: PropTypes.node.isRequired,
  /** If the content fills the whole width */
  fullWidth: PropTypes.bool,
  /** A PageHeader component slot */
  pageHeader: PropTypes.node.isRequired,
}

export default Layout
