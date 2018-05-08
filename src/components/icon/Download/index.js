import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import config from 'vtex-tachyons/config.json'

class Download extends PureComponent {
  render() {
    const { color, size } = this.props
    return (
      <svg
        className="vtex-icon__download"
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
      >
        <g fill={color}>
          <path d="M8 12c.3 0 .5-.1.7-.3L14.4 6 13 4.6l-4 4V0H7v8.6l-4-4L1.6 6l5.7 5.7c.2.2.4.3.7.3z" />
          <path data-color="color-2" d="M1 14h14v2H1z" />
        </g>
      </svg>
    )
  }
}

Download.defaultProps = {
  color: config.colors['serious-black'],
  size: 16,
}

Download.propTypes = {
  color: PropTypes.string,
  size: PropTypes.number,
}

export default Download
