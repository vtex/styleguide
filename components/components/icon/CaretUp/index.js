import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

import { Svg } from '../IconBase'
import { calcIconSize } from '../utils'

const iconBase = {
  width: 14,
  height: 10,
}

class CaretUp extends PureComponent {
  render() {
    const { color, size, block } = this.props
    const newSize = calcIconSize(iconBase, size)

    return (
      <Svg name="caret-up" size={newSize} block={block} viewBox="0 0 14 10">
        <path
          d="M7.72356 8.48154C7.32958 8.89452 6.67042 8.89452 6.27644 8.48154L0 1.90235L1.81481 0L7 5.43529L12.1852 0L14 1.90235L7.72356 8.48154Z"
          transform="translate(14 10) rotate(-180)"
          fill={color}
        />
      </Svg>
    )
  }
}

CaretUp.defaultProps = {
  color: 'currentColor',
  size: 16,
  block: false,
}

CaretUp.propTypes = {
  color: PropTypes.string,
  size: PropTypes.number,
  block: PropTypes.bool,
}

export default CaretUp
