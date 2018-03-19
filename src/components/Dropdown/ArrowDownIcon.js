import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import config from 'vtex-tachyons/config'

class ArrowDownIcon extends PureComponent {
  render() {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={this.props.size}
        height={this.props.size}
        viewBox="0 0 24 24"
      >
        <g fill={this.props.fill}>
          <path d="M7.41 7.84L12 12.42l4.59-4.58L18 9.25l-6 6-6-6z" />
        </g>
      </svg>
    )
  }
}

ArrowDownIcon.defaultProps = {
  size: 16,
  fill: config.colors.blue,
}

ArrowDownIcon.propTypes = {
  size: PropTypes.number.isRequired,
  fill: PropTypes.string.isRequired,
}

export default ArrowDownIcon
