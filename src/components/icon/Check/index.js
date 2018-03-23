import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import config from 'vtex-tachyons/config.json'

class Check extends PureComponent {
  render() {
    const { color, size } = this.props
    return (
      <svg
        viewBox="0 0 18 18"
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
      >
        <path
          d="M6.61 11.89L3.5 8.78 2.44 9.84 6.61 14l8.95-8.95L14.5 4z"
          fill={color}
        />
      </svg>
    )
  }
}

Check.defaultProps = {
  color: config.colors['serious-black'],
  size: 16,
}

Check.propTypes = {
  color: PropTypes.string,
  size: PropTypes.number,
}

export default Check
