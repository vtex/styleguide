import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { calcIconSize, baseClassname } from '../utils'

const iconBase = {
  width: 20,
  height: 20,
}

class Plus extends PureComponent {
  render() {
    const { color, size, block } = this.props
    const newSize = calcIconSize(iconBase, size)

    return (
      <svg
        className={`${baseClassname('plus')} ${block ? 'db' : ''}`}
        width={newSize.width}
        height={newSize.height}
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
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
}

Plus.defaultProps = {
  color: 'currentColor',
  size: 16,
  block: false,
}

Plus.propTypes = {
  color: PropTypes.string,
  size: PropTypes.number,
  block: PropTypes.bool,
}

export default Plus
