import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import config from 'vtex-tachyons/config.json'

class Failure extends PureComponent {
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
            d="M8.838 3.938L7 5.774 5.162 3.937 3.938 5.162 5.774 7 3.937 8.838l1.225 1.225L7 8.224l1.838 1.838 1.225-1.226L8.224 7l1.838-1.838z"
          />
          <path
            d="M7 0C3.15 0 0 3.15 0 7s3.15 7 7 7 7-3.15 7-7-3.15-7-7-7zm0 12.25c-2.888 0-5.25-2.363-5.25-5.25 0-2.888 2.362-5.25 5.25-5.25 2.887 0 5.25 2.362 5.25 5.25 0 2.887-2.363 5.25-5.25 5.25z"
          />
        </g>
      </svg>
    )
  }
}

Failure.defaultProps = {
  color: config.colors['serious-black'],
  size: 16,
}

Failure.propTypes = {
  color: PropTypes.string,
  size: PropTypes.number,
}

export default Failure
