import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

export class Tab extends PureComponent {
  constructor() {
    super()
    this.state = {
      isVisible: false,
    }
  }

  render() {
    const { children, label } = this.props
    return (
      <div>
        <button type="button">{label}</button>
        {this.state.isVisible && children}
      </div>
    )
  }
}

Tab.propTypes = {
  children: PropTypes.node,
  label: PropTypes.string,
}

export class Tabs extends PureComponent {
  render() {
    const { children } = this.props
    return <div>{children}</div>
  }
}

Tabs.propTypes = {
  children: PropTypes.node,
}
