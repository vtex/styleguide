import React, { Component } from 'react'
import PropTypes from 'prop-types'

class Layout extends Component {
  render() {
    const { fullWidth, pageHeader, children } = this.props

    return (
      <div className="styleguide__layout flex justify-center pb7 bg-muted-5 min-h-100">
        <div className={`w-100 ${fullWidth && 'mw8'}`}>
          {pageHeader}
          <div className="layout__container ph7-ns">{children}</div>
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
