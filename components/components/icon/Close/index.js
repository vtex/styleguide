import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

import { Svg } from '../IconBase'
import { calcIconSize } from '../utils'

const iconBase = {
  width: 18,
  height: 18,
}

class Close extends PureComponent {
  render() {
    const { color, size, block, title } = this.props
    const newSize = calcIconSize(iconBase, size)

    return (
      <Svg name="close" size={newSize} block={block} viewBox="0 0 18 18">
        {title && <title>{title}</title>}
        <g fill={color}>
          <path d="M14.53 4.53l-1.06-1.06L9 7.94 4.53 3.47 3.47 4.53 7.94 9l-4.47 4.47 1.06 1.06L9 10.06l4.47 4.47 1.06-1.06L10.06 9z" />
        </g>
      </Svg>
    )
  }
}

Close.defaultProps = {
  color: 'currentColor',
  size: 16,
  block: false,
}

Close.propTypes = {
  color: PropTypes.string,
  size: PropTypes.number,
  block: PropTypes.bool,
  title: PropTypes.string,
}

export default Close
