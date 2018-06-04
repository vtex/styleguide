import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import config from 'vtex-tachyons/config.json'
import { calcIconSize } from '../utils'

const iconBase = {
  width: 10,
  height: 14,
}

class CarretLeft extends PureComponent {
  render() {
    const { color, size } = this.props
    const newSize = calcIconSize(iconBase, size)

    return (
      <svg
        width={newSize.width}
        height={newSize.height}
        viewBox="0 0 10 14"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M7.72356 8.48154C7.32958 8.89452 6.67042 8.89452 6.27644 8.48154L0 1.90235L1.81481 0L7 5.43529L12.1852 0L14 1.90235L7.72356 8.48154Z"
          transform="translate(9.23999) rotate(90)"
          fill={color}
        />
      </svg>
    )
  }
}

CarretLeft.defaultProps = {
  color: config.colors['serious-black'],
  size: 16,
}

CarretLeft.propTypes = {
  color: PropTypes.string,
  size: PropTypes.number,
}

export default CarretLeft
