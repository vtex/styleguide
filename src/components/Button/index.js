import React, { Component } from 'react'
import PropTypes from 'prop-types'

class Button extends Component {
  render() {
    return (
      <button className={`bg-black ${this.props.primary ? 'red' : 'silver'}`}>
        XAU {this.props.children}
      </button>
    )
  }
}

Button.propTypes = {
  primary: PropTypes.bool,
  children: PropTypes.node.isRequired,
}

export default Button
