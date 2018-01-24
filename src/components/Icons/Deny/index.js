import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class Deny extends Component {
  render() {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18">
        <path
          d="M14.53 4.53l-1.06-1.06L9 7.94 4.53 3.47 3.47 4.53 7.94 9l-4.47 4.47 1.06 1.06L9 10.06l4.47 4.47 1.06-1.06L10.06 9z"
          fill={this.props.fill}
        />
      </svg>
    )
  }
}

Deny.defaultProps = {
  fill: '#fff',
}

Deny.propTypes = {
  fill: PropTypes.string,
}
