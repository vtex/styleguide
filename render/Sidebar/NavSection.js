import React, { Component, PropTypes } from 'react'
import Link from 'render/components/Link'
import NavList from './NavList'

//eslint-disable-next-line
class NavSection extends Component {
  render () {
    const {current, disabled, href, name, children} = this.props
    const activeClasses = current
      ? 'db pv2 ph3 ph4-l link lh-copy ffmark f5 fw4 blue'
      : 'db pv2 ph3 ph4-l link lh-copy ffmark f5 fw4 black'

    const sectionClasses = disabled
      ? 'db pv2 ph3 ph4-l link lh-copy ffmark f5 fw4 silver'
      : activeClasses

    return (
      <div className="NavSection">
        <h4 className="ma0">
          {
            href ? (
              <Link
                className={sectionClasses + ' hover-bg-light-silver'}
                to={href}
              >
                {name}
              </Link>
            ) : <span className={sectionClasses}>{name}</span>
          }
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
