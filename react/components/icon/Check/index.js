import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import config from 'vtex-tachyons/config.json'

class Check extends PureComponent {
  render() {
    const { color, size } = this.props

    return (
      <svg
        className="vtex-icon__check"
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
            points="12.4,6 11,4.6 7,8.6 5,6.6 3.6,8 7,11.4 "
          />
        </g>
      </svg>
    )
  }
}

Check.defaultProps = {
  color: config.colors['serious-black'],
  size: '1.3rem',
}

Check.propTypes = {
  color: PropTypes.string,
  size: PropTypes.string,
}

export default Check
