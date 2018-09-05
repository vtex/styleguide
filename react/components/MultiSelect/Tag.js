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
    return (
      <div
        className="pointer br-pill dib f6 fw5 pv2 ph3 mr2 mt2 bg-action-secondary c-on-action-secondary"
        onClick={() => {
          this.props.onClick && this.props.onClick(this.props.tag)
        }}
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
      >
        <div className="flex items-center">
          <span>{this.props.tag}</span>{' '}
          <div
            className={this.state.hover ? 'c-danger' : 'c-on-action-secondary'}
          >
            <Close className="mt2" color="currentColor" />
          </div>
        </div>
      </div>
    )
  }
}

Tag.defaultProps = {
  selected: [],
}

Tag.propTypes = {
  onClick: PropTypes.func,
  selected: PropTypes.array,
  tag: PropTypes.string.isRequired,
}
