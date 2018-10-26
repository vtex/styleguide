import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { calcIconSize, baseClassname } from '../utils'

const iconBase = {
  width: 20,
  height: 20,
}

class Plus extends PureComponent {
  render() {
    const { color, size, solid, block } = this.props
    const newSize = calcIconSize(iconBase, size)

    if (solid) {
      return (
        <svg
          className={`${baseClassname('plus', 'solid')} ${block ? 'db' : ''}`}
          width={newSize.width}
          height={newSize.height}
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg">
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M13.6569 13.6569C16.7811 10.5326 16.7811 5.46735 13.6569 2.34316C10.5327 -0.781032 5.46739 -0.781075 2.34316 2.34316C-0.781075 5.46739 -0.781032 10.5327 2.34316 13.6569C5.46735 16.7811 10.5326 16.7811 13.6569 13.6569ZM8.00006 6.58567L10.8285 3.75724L12.2427 5.17159L9.41423 8.00001L12.2427 10.8284L10.8285 12.2425L8.00001 9.41423L5.15726 12.257L3.74309 10.8426L6.58576 7.99997L3.74313 5.15734L5.15747 3.74309L8.00006 6.58567Z"
            transform="translate(10.1006 -1.31372) rotate(45)"
            fill={color}
          />
        </svg>
      )
    }
    return (
      <svg
        width={newSize.width}
        height={newSize.height}
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg">
        <circle cx="8" cy="8" r="7" stroke="#3F3F40" strokeWidth="2" />
        <path
          d="M4.5 7H7V4.5C7 4.22386 7.22386 4 7.5 4H8.5C8.77614 4 9 4.22386 9 4.5V7H11.5C11.7761 7 12 7.22386 12 7.5V8.5C12 8.77614 11.7761 9 11.5 9H9V11.5C9 11.7761 8.77614 12 8.5 12H7.5C7.22386 12 7 11.7761 7 11.5V9H4.5C4.22386 9 4 8.77614 4 8.5V7.5C4 7.22386 4.22386 7 4.5 7Z"
          fill={color}
        />
      </svg>
    )
  }
}

Plus.defaultProps = {
  color: 'currentColor',
  size: 20,
  solid: false,
  block: false,
}

Plus.propTypes = {
  color: PropTypes.string,
  size: PropTypes.number,
  solid: PropTypes.bool,
  block: PropTypes.bool,
}

export default Plus
