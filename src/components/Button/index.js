import React, { Component } from 'react'
import PropTypes from 'prop-types'

class Button extends Component {
  render() {
    const { primary, secondary, disabled } = this.props

    if (secondary && primary) {
      throw new Error('Button component cannot be primary AND secondary')
    }

    let classes = 'fw5 ph5 pv3 ttu br2 fw4 f7 '

    if (!secondary && !primary && !disabled) {
      classes += 'bw1 ba b--white blue hover-bg-light-silver hover-b--light-silver bg-animate '
    }

    if (secondary && !disabled) {
      classes += 'bw1 ba b--blue blue hover-bg-blue hover-white bg-animate '
    }

    if (primary && !disabled) {
      classes += 'bw1 ba b--blue bg-blue white hover-bg-heavy-blue hover-b--heavy-blue bg-animate '
    }

    if (disabled) {
      classes += 'bw1 ba b--light-gray bg-light-gray gray '
    } else {
      classes += 'pointer '
    }

    return (
      <button className={`${classes}`}>
        {this.props.children}
      </button>
    )
  }
}

Button.defaultProps = {
  primary: false,
  secondary: false,
  disabled: false,
  htmlProps: {},
}

Button.propTypes = {
  primary: PropTypes.bool,
  secondary: PropTypes.bool,
  disabled: PropTypes.bool,
  htmlProps: PropTypes.object,
  children: PropTypes.node.isRequired,
}

export default Button
