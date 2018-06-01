import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import config from 'vtex-tachyons/config.json'

class Deny extends PureComponent {
  render() {
    const { color, size } = this.props

    return (
      <svg
        className="vtex-icon__deny"
        height={size}
        width={size}
        version="1.1"
        viewBox="0 0 16 16"
        xmlns="http://www.w3.org/2000/svg"
        x="0px"
        y="0px"
        xmlSpace="preserve"
      >
        <g className="nc-icon-wrapper" fill={color}>
          <polygon
            fill={color}
            points="12.2,0.9 8,5.2 3.8,0.9 0.9,3.8 5.2,8 0.9,12.2 3.8,15.1 8,10.8 12.2,15.1 15.1,12.2 10.8,8 15.1,3.8 "
          />
        </g>
      </svg>
    )
  }
}

Deny.defaultProps = {
  color: config.colors['serious-black'],
  size: '0.7rem',
}

Deny.propTypes = {
  color: PropTypes.string,
  size: PropTypes.string,
}

export default Deny
