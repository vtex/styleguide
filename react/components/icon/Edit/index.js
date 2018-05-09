import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import config from 'vtex-tachyons/config.json'

class Edit extends PureComponent {
  render() {
    const { color, size } = this.props
    return (
      <svg
        className="vtex-icon__edit"
        viewBox="0 0 16 16"
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
      >
        <path
          d="M11.7.3c-.4-.4-1-.4-1.4 0l-10 10c-.2.2-.3.4-.3.7v4c0 .6.4 1 1 1h4c.3 0 .5-.1.7-.3l10-10c.4-.4.4-1 0-1.4l-4-4zM4.6 14H2v-2.6l6-6L10.6 8l-6 6zM12 6.6L9.4 4 11 2.4 13.6 5 12 6.6z"
          fill={color}
        />
      </svg>
    )
  }
}

Edit.defaultProps = {
  color: config.colors['serious-black'],
  size: 16,
}

Edit.propTypes = {
  color: PropTypes.string,
  size: PropTypes.number,
}

export default Edit
