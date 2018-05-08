import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import config from 'vtex-tachyons/config.json'

class Upload extends PureComponent {
  render() {
    const { color, size } = this.props
    return (
      <svg
        className="vtex-icon__upload"
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
      >
        <g fill={color}>
          <path d="M7 3.4V12h2V3.4l4 4L14.4 6 8.7.3c-.4-.4-1-.4-1.4 0L1.6 6 3 7.4l4-4z" />
          <path data-color="color-2" d="M1 14h14v2H1z" />
        </g>
      </svg>
    )
  }
}

Upload.defaultProps = {
  color: config.colors['serious-black'],
  size: 16,
}

Upload.propTypes = {
  color: PropTypes.string,
  size: PropTypes.number,
}

export default Upload
