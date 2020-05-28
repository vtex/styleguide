import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

import { Svg } from '../IconBase'
import { calcIconSize } from '../utils'

const iconBase = {
  width: 12,
  height: 12,
}

class Check extends PureComponent {
  render() {
    const { color, size, block } = this.props
    const newSize = calcIconSize(iconBase, size)

    return (
      <Svg name="check" size={newSize} block={block} viewBox="0 0 12 12">
        <path
          d="M10.8 4.4L9.4 3L5.4 7L3.4 5L2 6.4L5.4 9.8L10.8 4.4Z"
          fill={color}
        />
      </Svg>
    )
  }
}

Check.defaultProps = {
  color: 'currentColor',
  size: 16,
  block: false,
}

Check.propTypes = {
  color: PropTypes.string,
  size: PropTypes.number,
  block: PropTypes.bool,
}

export default Check
