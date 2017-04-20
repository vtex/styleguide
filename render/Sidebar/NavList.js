import React, { Component, PropTypes } from 'react'

//eslint-disable-next-line
class NavList extends Component {
  render () {
    const {children} = this.props
    return (
      <div className="NavList">
        <ul className="ma0 pa0 list f5 fw1">
          {children}
        </ul>
      </div>
    )
  }
}

NavList.propTypes = {
  children: PropTypes.node,
}

export default NavList
