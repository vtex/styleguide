import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

import { Svg } from '../IconBase'
import { calcIconSize } from '../utils'

const iconBase = {
  width: 17,
  height: 16,
}

class ArrowUp extends PureComponent {
  render() {
    const { color, size, block } = this.props
    const newSize = calcIconSize(iconBase, size)

    return (
      <Svg name="arrow-up" size={newSize} block={block} viewBox="0 0 17 16">
        <path
          d="M8.39162 16C8.78498 16 9.04721 15.8667 9.30945 15.6L16.7832 8L14.9476 6.13333L9.70281 11.4667V0H7.08043V11.4667L1.83567 6.13333L3.12612e-08 8L7.47379 15.6C7.73602 15.8667 7.99826 16 8.39162 16Z"
          transform="translate(16.7832 16) rotate(-180)"
          fill={color}
        />
      </Svg>
    )
  }
}

ArrowUp.defaultProps = {
  color: 'currentColor',
  size: 16,
  block: false,
}

ArrowUp.propTypes = {
  color: PropTypes.string,
  size: PropTypes.number,
  block: PropTypes.bool,
}

export default ArrowUp
