import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

import { calcIconSize, baseClassname, IconBase } from '../utils'

const iconBaseDimensions = {
  width: 16,
  height: 18,
}

class Columns extends PureComponent {
  render() {
    const { color, size, block } = this.props
    const newSize = calcIconSize(iconBaseDimensions, size)

    return (
      <IconBase size={newSize} block={block} id="icon-columns">
        <path d="M1 4H15V15H1V4Z" stroke={color} strokeWidth="2" />
        <path
          d="M0 1C0 0.447715 0.447715 0 1 0H15C15.5523 0 16 0.447715 16 1V5H0V1Z"
          fill={color}
        />
        <line
          x1="8.11133"
          y1="4.70586"
          x2="8.11133"
          y2="14.1176"
          stroke={color}
          strokeWidth="2"
        />
      </IconBase>
    )
  }
}

Columns.defaultProps = {
  color: 'currentColor',
  size: 16,
  block: false,
}

Columns.propTypes = {
  color: PropTypes.string,
  size: PropTypes.number,
  block: PropTypes.bool,
}

export default Columns
