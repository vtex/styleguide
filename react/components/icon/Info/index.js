import React from 'react'
import PropTypes from 'prop-types'

import { Svg } from '../IconBase'
import { calcIconSize } from '../utils'

const iconBase = {
  width: 16,
  height: 16,
}

const Info = ({ color, size, block }) => {
  const newSize = calcIconSize(iconBase, size)

  return (
    <Svg name="info" size={newSize} block={block}>
      <path
        d="M8 16C12.4 16 16 12.4 16 8C16 3.6 12.4 0 8 0C3.6 0 0 3.6 0 8C0 12.4 3.6 16 8 16ZM8 2C11.3 2 14 4.7 14 8C14 11.3 11.3 14 8 14C4.7 14 2 11.3 2 8C2 4.7 4.7 2 8 2Z"
        fill={color}
      />
      <path d="M7 12H9V7H7L7 12Z" fill={color} />
      <path
        d="M8 4C7.44772 4 7 4.44772 7 5C7 5.55228 7.44772 6 8 6C8.55228 6 9 5.55228 9 5C9 4.44772 8.55228 4 8 4Z"
        fill={color}
      />
    </Svg>
  )
}

Info.defaultProps = {
  color: 'currentColor',
  size: 16,
  block: false,
}

Info.propTypes = {
  color: PropTypes.string,
  size: PropTypes.number,
  block: PropTypes.bool,
}

export default Info
