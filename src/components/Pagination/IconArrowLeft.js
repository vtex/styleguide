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
        <g className="nc-icon-wrapper" fill="#368df7">
          <polygon
            fill={this.props.fill}
            points="10,13.4 4.6,8 10,2.6 11.4,4 7.4,8 11.4,12 "
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
