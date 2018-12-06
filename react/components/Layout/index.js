import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import PageHeader from '../PageHeader'

class Layout extends PureComponent {
  render() {
    const { fullWidth, pageHeader, children } = this.props

    return (
      <div className="vtex-layout-base flex justify-center pb7 bg-near-white">
        <div style={{ maxWidth: fullWidth ? 'none' : '400px' }}>
          <PageHeader {...pageHeader} />
          <div className="vtex-layout-app-container ph7">{children}</div>
        </div>
      </div>
    )
  }
}

Layout.defaultProps = { fullWidth: false }

Layout.propTypes = {
  /** Content of the Layout */
  children: PropTypes.node.isRequired,
  /** If the content fills the whole width */
  fullWidth: PropTypes.bool,
  /** PageHeader properties */
  pageHeader: PropTypes.shape({
    title: PropTypes.string.isRequired,
    linkLabel: PropTypes.string,
    onLinkClick: PropTypes.func,
    children: PropTypes.node,
  }),
}

export default Layout
