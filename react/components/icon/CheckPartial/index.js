import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

import { Svg } from '../IconBase'
import { calcIconSize } from '../utils'

const iconBase = {
  width: 12,
  height: 12,
}

class CheckPartial extends PureComponent {
  render() {
    const { color, size, block } = this.props
    const newSize = calcIconSize(iconBase, size)

    return (
      <Svg name="check" size={newSize} block={block} viewBox="0 0 12 12">
        <path d="M2 5V7H10V5H2Z" fill={color} />
      </Svg>
    )
  }
}

CheckPartial.defaultProps = {
  color: 'currentColor',
  size: 16,
  block: false,
}

CheckPartial.propTypes = {
  color: PropTypes.string,
  size: PropTypes.number,
  block: PropTypes.bool,
}

export default CheckPartial
