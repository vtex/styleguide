import React, { Component } from 'react'
import PropTypes from 'prop-types'
import config from 'vtex-tachyons/config.json'

class IconArrowLeft extends Component {
  render() {
    return (
      <svg
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        x="0px"
        y="0px"
        viewBox="0 0 16 16"
        xmlSpace="preserve"
        width="16"
        height="16"
      >
        <g className="nc-icon-wrapper" fill={this.props.fill}>
          <polygon
            fill={this.props.fill}
            points="6,13.4 4.6,12 8.6,8 4.6,4 6,2.6 11.4,8 "
          />
        </g>
      </svg>
    )
  }
}

IconArrowLeft.defaultProps = {
  fill: config.colors.blue,
}

IconArrowLeft.propTypes = {
  fill: PropTypes.string,
}

export default IconArrowLeft
