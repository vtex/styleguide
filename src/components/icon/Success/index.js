import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import config from 'vtex-tachyons/config.json'

class Success extends PureComponent {
  render() {
    const { color, size } = this.props
    return (
      <svg
        viewBox="0 0 14 14"
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
      >
        <g fill={color}>
          <path
            d="M7 0C3.14 0 0 3.14 0 7s3.14 7 7 7 7-3.14 7-7-3.14-7-7-7zm0 12.25A5.255 5.255 0 0 1 1.75 7 5.255 5.255 0 0 1 7 1.75 5.255 5.255 0 0 1 12.25 7 5.255 5.255 0 0 1 7 12.25z"
          />
          <path
            d="M6.125 9.987L3.138 7l1.237-1.237 1.75 1.75 3.5-3.5 1.237 1.237z"
          />
        </g>
      </svg>
    )
  }
}

Success.defaultProps = {
  color: config.colors['serious-black'],
  size: 16,
}

Success.propTypes = {
  color: PropTypes.string,
  size: PropTypes.number,
}

export default Success
