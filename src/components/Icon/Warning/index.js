import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

class Warning extends PureComponent {
  render() {
    const { fill, width, height } = this.props
    return (
      <svg
        viewBox="0 0 14 14"
        xmlns="http://www.w3.org/2000/svg"
        width={width}
        height={height}
      >
        <g fill={fill}>
          <path d="M3.5 6.125h7v1.75h-7z" />
          <path d="M7 0C3.15 0 0 3.15 0 7s3.15 7 7 7 7-3.15 7-7-3.15-7-7-7zm0 12.25c-2.888 0-5.25-2.363-5.25-5.25 0-2.888 2.362-5.25 5.25-5.25 2.887 0 5.25 2.362 5.25 5.25 0 2.887-2.363 5.25-5.25 5.25z" />
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
