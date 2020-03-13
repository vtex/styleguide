import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

import { Svg } from '../IconBase'
import { calcIconSize } from '../utils'

const iconBase = {
  width: 14,
  height: 13,
}

class Density extends PureComponent {
  render() {
    const { color, size, block } = this.props
    const newSize = calcIconSize(iconBase, size)

    return (
      <Svg
        name="density"
        size={newSize}
        block={block}
        viewBox="0 0 14 13"
        fill={color}
      >
        <rect
          y="11.1426"
          width={newSize.width}
          height="1.85714"
          rx="0.928571"
          fill={color}
        />
        <rect
          y="7.42871"
          width={newSize.width}
          height="1.85714"
          rx="0.928571"
          fill={color}
        />
        <rect width={newSize.width} height="5.57143" rx="1" fill={color} />
      </Svg>
    )
  }
}

Density.defaultProps = {
  color: 'currentColor',
  size: 16,
  block: false,
}

Density.propTypes = {
  color: PropTypes.string,
  size: PropTypes.number,
  block: PropTypes.bool,
}

export default Density
