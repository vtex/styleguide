import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import config from 'vtex-tachyons/config.json'

class Warning extends PureComponent {
  render() {
    const { color, size } = this.props
    return (
      <svg
        viewBox="0 0 16 16"
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
      >
        <g fill={color}>
          <path
            d="M8,0C3.6,0,0,3.6,0,8s3.6,8,8,8s8-3.6,8-8S12.4,0,8,0z M8,14c-3.3,0-6-2.7-6-6s2.7-6,6-6s6,2.7,6,6 S11.3,14,8,14z"
          />
          <rect x="7" y="4" width="2" height="5" />
          <circle cx="8" cy="11" r="1" />
        </g>
      </svg>
    )
  }
}

Warning.defaultProps = {
  color: config.colors['serious-black'],
  size: 16,
}

Warning.propTypes = {
  color: PropTypes.string,
  size: PropTypes.number,
}

export default Warning
