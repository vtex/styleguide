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

  render() {
    const classes =
      'pointer br-pill dib f6 fw5 pv2 ph3 mr2 mt2 bg-action-secondary c-on-action-secondary hover-c-danger'
    return (
      <div
        /*  Issue: we only want to change the color of the close button for hovering
            In order to fix this, we might need to handle a hover event */
        className={classes}
        onClick={() => {
          this.props.onClick && this.props.onClick(this.props.tag)
        }}
      >
        <div className="flex items-center">
          <span>{this.props.tag}</span>{' '}
          <Close className="mt2" color="currentColor" />
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
