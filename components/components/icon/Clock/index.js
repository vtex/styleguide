import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

import { Svg } from '../IconBase'
import { calcIconSize } from '../utils'

const iconBase = {
  width: 16,
  height: 16,
}

class Clock extends PureComponent {
  render() {
    const { color, size, block } = this.props
    const newSize = calcIconSize(iconBase, size)

    return (
      <Svg name="clock" size={newSize} block={block}>
        <path
          d="M8 0C3.6 0 0 3.6 0 8C0 12.4 3.6 16 8 16C12.4 16 16 12.4 16 8C16 3.6 12.4 0 8 0ZM8 14C4.7 14 2 11.3 2 8C2 4.7 4.7 2 8 2C11.3 2 14 4.7 14 8C14 11.3 11.3 14 8 14Z"
          fill={color}
        />
        <path d="M2 0H0V5H5V3H2V0Z" transform="translate(7 4)" fill={color} />
      </Svg>
    )
  }
}

Clock.defaultProps = {
  color: 'currentColor',
  size: 16,
  block: false,
}

Clock.propTypes = {
  color: PropTypes.string,
  size: PropTypes.number,
  block: PropTypes.bool,
}

export default Clock
