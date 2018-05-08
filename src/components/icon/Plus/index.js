import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import config from 'vtex-tachyons/config.json'

class Plus extends PureComponent {
  render() {
    const { color, size } = this.props
    return (
      <svg
        className="vtex-icon__plus"
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
      >
        <path
          d="M8 0C3.6 0 0 3.6 0 8s3.6 8 8 8 8-3.6 8-8-3.6-8-8-8zm4 9H9v3H7V9H4V7h3V4h2v3h3v2z"
          fill={color}
        />
      </svg>
    )
  }
}

Plus.defaultProps = {
  color: config.colors['serious-black'],
  size: 16,
}

Plus.propTypes = {
  color: PropTypes.string,
  size: PropTypes.number,
}

export default Plus
