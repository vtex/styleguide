import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

import { calcIconSize, baseClassname } from '../utils'

const iconBase = {
  width: 12,
  height: 12,
}

class Check extends PureComponent {
  render() {
    const { color, size, block } = this.props
    const newSize = calcIconSize(iconBase, size)

    return (
      <svg
        className={`${baseClassname('check')} ${block ? 'db' : ''}`}
        width={newSize.width}
        height={newSize.height}
        viewBox="0 0 12 12"
        fill="none"
        xmlns="http://www.w3.org/2000/svg">
        <path
          d="M10.8 4.4L9.4 3L5.4 7L3.4 5L2 6.4L5.4 9.8L10.8 4.4Z"
          fill={color}
        />
      </svg>
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
