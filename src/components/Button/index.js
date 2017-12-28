import React, { Component } from 'react'
import PropTypes from 'prop-types'

class Button extends Component {
  render() {
    return <button className="h5 bg-blue" />
  }
}

Button.propTypes = {
  primary: PropTypes.bool,
  children: PropTypes.node.isRequired,
}

export default Button
