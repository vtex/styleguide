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
    const hoverClass = this.state.hover ? 'c-danger' : 'c-on-action-secondary'
    return (
      <button
        className="pointer br-pill bn dib f7 fw4 pv2 pl4 mh3 mv3 bg-action-secondary c-on-action-secondary"
        onClick={() => {
          this.props.onClick && this.props.onClick()
        }}
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
      >
        <div className="flex items-center justify-center">
          <span className="self-center">{this.props.tag}</span>{' '}
          <div className={`${hoverClass} pl3 pt1 self-center`}>
            <Close color="currentColor" size="14" />
          </div>
        </div>
      </button>
    )
  }
}

Tag.propTypes = {
  onClick: PropTypes.func,
  tag: PropTypes.string.isRequired,
}
