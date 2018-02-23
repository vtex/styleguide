import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

class Deny extends PureComponent {
  render() {
    const { fill, width, height } = this.props
    return (
      <svg
        viewBox="0 0 18 18"
        xmlns="http://www.w3.org/2000/svg"
        width={width}
        height={height}
      >
        <path
          d="M14.53 4.53l-1.06-1.06L9 7.94 4.53 3.47 3.47 4.53 7.94 9l-4.47 4.47 1.06 1.06L9 10.06l4.47 4.47 1.06-1.06L10.06 9z"
          fill={fill}
        />
      </svg>
    )
  }
}

Deny.propTypes = {
  fill: PropTypes.string,
  width: PropTypes.number,
  height: PropTypes.number,
}

export default Deny
