import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Spinner from '../Spinner'

class Button extends Component {
  handleClick = () => {
    this.props.onClick && this.props.onClick()
  }

  render() {
    const { primary, secondary, disabled, isLoading } = this.props

    if (secondary && primary) {
      throw new Error('Button component cannot be primary AND secondary')
    }

    let classes = 'fw5 ph5 pv3 ttu br2 fw4 f7 '

    if (!secondary && !primary && !disabled) {
      classes +=
        'bw1 ba b--white blue hover-bg-light-silver hover-b--light-silver '
    }

    if (secondary && !disabled) {
      classes += 'bw1 ba b--blue blue hover-white '
    }
    if (secondary && !isLoading) {
      classes += 'hover-bg-blue '
    }

    if (primary && !disabled) {
      classes +=
        'bw1 ba b--blue bg-blue white hover-bg-heavy-blue hover-b--heavy-blue '
    }

    if (disabled) {
      classes += 'bw1 ba b--light-gray bg-light-gray gray '
    } else {
      classes += 'pointer '
    }

    return (
      <button
        type="button"
        className={`${classes}`}
        {...this.props.htmlProps}
        disabled={disabled}
        onClick={this.handleClick}
      >
        {isLoading ? (
          <Spinner width={11} height={11} secondary={primary} />
        ) : (
          this.props.children
        )}
      </button>
    )
  }
}

Button.defaultProps = {
  primary: false,
  secondary: false,
  disabled: false,
  isLoading: false,
  htmlProps: {},
}

Button.propTypes = {
  primary: PropTypes.bool,
  secondary: PropTypes.bool,
  disabled: PropTypes.bool,
  htmlProps: PropTypes.object,
  children: PropTypes.node.isRequired,
  isLoading: PropTypes.bool,
  onClick: PropTypes.func,
}

export default Button
