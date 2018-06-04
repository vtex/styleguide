import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import config from 'vtex-tachyons/config.json'
import { calcIconSize } from '../utils'

const iconBase = {
  width: 18,
  height: 18,
}

class ArrowLeft extends PureComponent {
  render() {
    const { color, size } = this.props
    const newSize = calcIconSize(iconBase, size)

    return (
      <svg width={newSize.width} height={newSize.height} viewBox="0 0 18 18">
        <g fill={color}>
          <path d="M15 8.25H5.87l4.19-4.19L9 3 3 9l6 6 1.06-1.06-4.19-4.19H15v-1.5z" />
        </g>
      </svg>
    )
  }
}

ArrowLeft.defaultProps = {
  color: config.colors['serious-black'],
  size: 16,
}

ArrowLeft.propTypes = {
  color: PropTypes.string,
  size: PropTypes.number,
}

export default ArrowLeft
