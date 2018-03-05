import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

class Warning extends PureComponent {
  render() {
    const { fill, width, height } = this.props
    return (
      <svg
        viewBox="0 0 16 16"
        xmlns="http://www.w3.org/2000/svg"
        width={width}
        height={height}
      >
        <g fill={fill}>
          <path d="M8,0C3.6,0,0,3.6,0,8s3.6,8,8,8s8-3.6,8-8S12.4,0,8,0z M8,14c-3.3,0-6-2.7-6-6s2.7-6,6-6s6,2.7,6,6 S11.3,14,8,14z"></path>
          <rect x="7" y="4" width="2" height="5"></rect>
          <circle cx="8" cy="11" r="1"></circle>
        </g>
      </svg>
    )
  }
}

Warning.propTypes = {
  fill: PropTypes.string,
  width: PropTypes.number,
  height: PropTypes.number,
}

export default Warning
