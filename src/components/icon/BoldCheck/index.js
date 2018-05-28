import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import config from 'vtex-tachyons/config.json'

class BoldCheck extends PureComponent {
  render() {
    const { color, size } = this.props
    return (
      <svg
        className="vtex-icon__boxcheck"
        viewBox="0 0 14 14"
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
      >
        <g fill={color}>
          <path
            d="M6.125 9.987L3.138 7l1.237-1.237 1.75 1.75 3.5-3.5 1.237 1.237z"
          />
        </g>
      </svg>
    )
  }
}

BoldCheck.defaultProps = {
  color: config.colors['serious-black'],
  size: 16,
}

BoldCheck.propTypes = {
  color: PropTypes.string,
  size: PropTypes.number,
}

export default BoldCheck
