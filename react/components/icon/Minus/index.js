import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { calcIconSize, baseClassname } from '../utils'

const iconBase = {
  width: 14,
  height: 14,
}

class Minus extends PureComponent {
  render() {
    const { color, size, block } = this.props
    const newSize = calcIconSize(iconBase, size)

    return (
      <svg
        className={`${baseClassname('minus')} ${block ? 'db' : ''}`}
        width={newSize.width}
        height={newSize.height}
        viewBox={`0 0 16 16`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg">
        <circle cx="8" cy="8" r="7" stroke={color} strokeWidth="2" />
        <path
          d="M4 8.5V7.5C4 7.22386 4.22386 7 4.5 7H11.5C11.7761 7 12 7.22386 12 7.5V8.5C12 8.77614 11.7761 9 11.5 9H4.5C4.22386 9 4 8.77614 4 8.5Z"
          fill={color}
        />
      </svg>
    )
  }
}

Minus.defaultProps = {
  color: 'currentColor',
  size: 16,
  block: false,
}

Minus.propTypes = {
  color: PropTypes.string,
  size: PropTypes.number,
  block: PropTypes.bool,
}

export default Minus
