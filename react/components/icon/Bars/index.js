import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

import { Svg } from '../IconBase'
import { calcIconSize } from '../utils'

const iconBase = {
  width: 18,
  height: 12,
}

class Bars extends PureComponent {
  render() {
    const { color, size, block } = this.props
    const newSize = calcIconSize(iconBase, size)

    return (
      <Svg name="bars" size={newSize} block={block} viewBox="0 0 18 12">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M0 12H18V10H0V12ZM0 7H18V5H0V7ZM0 0V2H18V0H0Z"
          fill={color}
        />
      </Svg>
    )
  }
}

Bars.defaultProps = {
  color: 'currentColor',
  size: 20,
  block: false,
}

Bars.propTypes = {
  color: PropTypes.string,
  size: PropTypes.number,
  block: PropTypes.bool,
}

export default Bars
