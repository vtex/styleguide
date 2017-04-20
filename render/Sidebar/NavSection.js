import React, { Component, PropTypes } from 'react'
import Link from 'vtex.render-runtime/components/Link'
import NavList from './NavList'

//eslint-disable-next-line
class NavSection extends Component {
  render () {
    const {current, disabled, href, name, children} = this.props
    const activeClasses = current
      ? 'db pv2 ph3 ph4-l link lh-copy ffmark f5 fw4 blue hover-bg-light-silver'
      : 'db pv2 ph3 ph4-l link lh-copy ffmark f5 fw4 black hover-bg-light-silver'

    const sectionClasses = disabled
      ? 'db pv2 ph3 ph4-l link lh-copy ffmark f5 fw4 silver hover-bg-light-silver'
      : activeClasses

    return (
      <div className="NavSection">
        <h4 className="ma0">
          <Link
            className={sectionClasses}
            to={href}
          >
            {name}
          </Link>
        </h4>
        {
          children
          ? <NavList>
            {children}
          </NavList>
          : null
        }
      </div>
    )
  }
}

NavSection.propTypes = {
  current: PropTypes.bool,
  disabled: PropTypes.bool,
  href: PropTypes.string,
  name: PropTypes.string,
  children: PropTypes.node,
}

export default NavSection
