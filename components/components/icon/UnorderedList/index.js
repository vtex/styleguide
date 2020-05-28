import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

import { Svg } from '../IconBase'
import { calcIconSize } from '../utils'

const iconBase = {
  width: 18,
  height: 12,
}

class UnorderedList extends PureComponent {
  render() {
    const { color, size, block } = this.props
    const newSize = calcIconSize(iconBase, size)

    return (
      <Svg
        name="unorderedList"
        size={newSize}
        block={block}
        viewBox="0 0 64 64"
        fill={color}>
        <circle fill={color} cx="8" cy="12" r="6" />
        <circle fill={color} cx="8" cy="32" r="6" />
        <circle fill={color} cx="8" cy="52" r="6" />
        <path d="M61,13H21a1,1,0,0,1,0-2H61a1,1,0,0,1,0,2Z" fill={color} />
        <path d="M46,33H21a1,1,0,0,1,0-2H46a1,1,0,0,1,0,2Z" fill={color} />
        <path d="M61,53H21a1,1,0,0,1,0-2H61a1,1,0,0,1,0,2Z" fill={color} />
      </Svg>
    )
  }
}

UnorderedList.defaultProps = {
  color: 'currentColor',
  size: 20,
  block: false,
}

UnorderedList.propTypes = {
  color: PropTypes.string,
  size: PropTypes.number,
  block: PropTypes.bool,
}

export default UnorderedList
