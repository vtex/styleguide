import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class Check extends Component {
  render() {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18">
        <path
          d="M6.61 11.89L3.5 8.78 2.44 9.84 6.61 14l8.95-8.95L14.5 4z"
          fill={this.props.fill}
        />
      </svg>
    )
  }
}

Check.defaultProps = {
  fill: '#000',
}

Check.propTypes = {
  fill: PropTypes.string,
}
