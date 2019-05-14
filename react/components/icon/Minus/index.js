import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { calcIconSize, baseClassname } from '../utils'

const iconBase = {
  width: 14,
  height: 14,
}

class Minus extends PureComponent {
  render() {
    const { color, size, block, solid } = this.props
    const newSize = calcIconSize(iconBase, size)

    return solid ? (
      <svg
        className={`${baseClassname('minus')} ${block ? 'db' : ''}`}
        width={newSize.width}
        height={newSize.height}
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg">
        <path
          xmlns="http://www.w3.org/2000/svg"
          fillRule="evenodd"
          clipRule="evenodd"
          d="M8 16C12.418 16 16 12.4185 16 8C16 3.58154 12.418 0 8 0C3.58203 0 0 3.58154 0 8C0 12.4185 3.58203 16 8 16ZM5 7C4.44727 7 4 7.44775 4 8C4 8.55225 4.44727 9 5 9H11C11.5527 9 12 8.55225 12 8C12 7.44775 11.5527 7 11 7H5Z"
          fill={color}
        />
      </svg>
    ) : (
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
  solid: false,
}

Minus.propTypes = {
  color: PropTypes.string,
  solid: PropTypes.bool,
  size: PropTypes.number,
  block: PropTypes.bool,
}

export default Minus
