import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { calcIconSize, baseClassname } from '../utils'

const iconBase = {
  width: 16,
  height: 16,
}

class InlineGrid extends PureComponent {
  render() {
    const { color, size, block } = this.props
    const newSize = calcIconSize(iconBase, size)

    return (
      <svg
        className={`${baseClassname('caret-left')} ${block ? 'db' : ''}`}
        width={newSize.width}
        height={newSize.height}
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M1 0C0.447715 0 0 0.447715 0 1V6C0 6.55228 0.447715 7 1 7H15C15.5523 7 16 6.55228 16 6V1C16 0.447715 15.5523 0 15 0H1ZM1 9C0.447715 9 0 9.44771 0 10V15C0 15.5523 0.447715 16 1 16H15C15.5523 16 16 15.5523 16 15V10C16 9.44772 15.5523 9 15 9H1Z"
          fill={color}
        />
      </svg>
    )
  }
}

InlineGrid.defaultProps = {
  color: 'currentColor',
  size: 16,
  block: false,
}

InlineGrid.propTypes = {
  color: PropTypes.string,
  size: PropTypes.number,
  block: PropTypes.bool,
}

export default InlineGrid
