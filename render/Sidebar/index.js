import React, { Component, PropTypes } from 'react'
import map from 'lodash/map'
import Link from 'render/components/Link'
import NavSection from './NavSection.js'
import NavItem from './NavItem.js'
import tableOfContents from '../Routes/tableOfContents.js'
import logoSVG from '../assets/svg/logo.svg'

//eslint-disable-next-line
class Sidebar extends Component {
  generateSections (content) {
    return content.map((section) => {
      const {href: sectionHref, name: sectionName, children: sectionChildren} = section
      const regex = new RegExp(`^${sectionHref}`)
      const path = global.__pathname__ || window.location.pathname
      return (
        <NavSection
          href={sectionHref}
          current={regex.test(path)}
          name={sectionName}
          key={sectionName}>
          {
            map(sectionChildren, (sectionItem) => {
              const {href: itemHref, name: itemName} = sectionItem
              return (
                <NavItem
                  hash={itemHref ? itemHref : '#'}
                  disabled={!itemHref}
                  name={itemName}
                  key={itemName}
                />
              )
            }
          )}
        </NavSection>
      )
    })
  }

  render () {
    const {content: contentFromProps, locale} = this.props
    const content = contentFromProps[locale]
    const navStyle = {
      padding: 0.5,
    }

    return (
      <aside className="fl w-20 h-100-ns">
        <nav style={navStyle}>
          <div className="dn db-ns w-20 h-100-ns fixed overflow-y-scroll b--light-silver br">
            <Link className="db pa4 pb0" to="/">
              <img src={logoSVG} alt="VTEX" />
            </Link>
            <div className="pv3 pv4-l">
              {this.generateSections(content)}
            </div>
          </div>
        </nav>
      </aside>
    )
  }
}

Sidebar.defaultProps = {
  content: tableOfContents,
  locale: 'pt',
}

Sidebar.propTypes = {
  content: PropTypes.object.isRequired,
  locale: PropTypes.string.isRequired,
}

export default Sidebar
