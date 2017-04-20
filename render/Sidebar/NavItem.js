import React, { Component, PropTypes } from 'react'
import Link from 'vtex.render-runtime/components/Link'

//eslint-disable-next-line
class NavItem extends Component {

  render () {
    const {disabled, hash, name} = this.props
    const activeClasses = disabled ? 'silver' : 'black'

    return (
      <li className="NavItem">
        <Link
          className={'db pv2 ph3 ph4-l link acumin lh-copy hover-bg-light-silver ' + activeClasses}
          to={hash}
          disabled={disabled}
        >
          <span className="ph3">{name}</span>
        </Link>
      </li>
    )
  }
}

NavItem.propTypes = {
  disabled: PropTypes.bool,
  name: PropTypes.string,
  hash: PropTypes.string,
}

export default NavItem
