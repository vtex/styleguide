import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

class ArrowDownIcon extends PureComponent {
  render() {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={this.props.size}
        height={this.props.size}
        viewBox="0 0 24 24">
        <g fill={this.props.color}>
          <path d="M7.41 7.84L12 12.42l4.59-4.58L18 9.25l-6 6-6-6z" />
        </g>
      </svg>
    )
  }
}

ArrowDownIcon.defaultProps = {
  size: 16,
  color: 'currentColor',
}

ArrowDownIcon.propTypes = {
  size: PropTypes.number.isRequired,
  color: PropTypes.string.isRequired,
}

export default ArrowDownIcon
