import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Close from '../icon/Close'

export default class Tag extends Component {
  constructor(props) {
    super(props)

    this.state = {
      hover: false,
    }
  }

  handleMouseEnter = () => {
    this.setState({ hover: true })
  }

  handleMouseLeave = () => {
    this.setState({ hover: false })
  }

  render() {
    const { children, disabled, onClick } = this.props
    const classes = disabled
      ? ' c-muted-2 bg-muted-4 '
      : ' pointer bg-action-secondary c-on-action-secondary '
    let hoverClass = ''
    if (!disabled) {
      hoverClass = this.state.hover ? 'c-danger' : 'c-on-action-secondary'
    }
    return (
      <button
        className={`br-pill bn dib t-small pv2 ph4 ${classes}`}
        disabled={disabled}
        onClick={() => {
          onClick && onClick()
        }}
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}>
        <div className="flex items-center justify-center">
          <span className="self-center">{children}</span>{' '}
          <div className={`${hoverClass} ml2 pt2 self-center`}>
            <Close color="currentColor" size={16} />
          </div>
        </div>
      </button>
    )
  }
}

Tag.defaultProps = {
  disabled: false,
}

Tag.propTypes = {
  children: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
}
