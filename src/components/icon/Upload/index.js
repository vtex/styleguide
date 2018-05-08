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
        <g
          fill="none"
          stroke={color}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeMiterlimit="10"
        >
          <path d="M8.5 11.5V.5M13.5 5.5l-5-5-5 5" />
          <path data-color="color-2" d="M15.5 15.5h-14" />
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
