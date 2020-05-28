import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

import { Svg } from '../IconBase'
import { calcIconSize } from '../utils'

const iconBase = {
  width: 10,
  height: 14,
}

class CaretRight extends PureComponent {
  render() {
    const { color, size, block } = this.props
    const newSize = calcIconSize(iconBase, size)

    return (
      <Svg name="caret-right" size={newSize} block={block} viewBox="0 0 10 14">
        <path
          d="M7.72356 8.48154C7.32958 8.89452 6.67042 8.89452 6.27644 8.48154L0 1.90235L1.81481 0L7 5.43529L12.1852 0L14 1.90235L7.72356 8.48154Z"
          transform="translate(0 14) rotate(-90)"
          fill={color}
        />
      </Svg>
    )
  }
}

CaretRight.defaultProps = {
  color: 'currentColor',
  size: 16,
  block: false,
}

CaretRight.propTypes = {
  color: PropTypes.string,
  size: PropTypes.number,
  block: PropTypes.bool,
}

export default CaretRight
