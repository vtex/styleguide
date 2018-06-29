import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { calcIconSize, baseClassname } from '../utils'

const iconBase = {
  width: 16,
  height: 16,
}

class Link extends PureComponent {
  render() {
    const { color, size, block } = this.props
    const newSize = calcIconSize(iconBase, size)

    return (
      <svg
        className={`${baseClassname('link')} ${block ? 'db' : ''}`}
        width={newSize.width}
        height={newSize.height}
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M5 0C3.7 0 2.4 0.5 1.5 1.5L0.3 2.6C-0.0999998 3 -0.0999998 3.6 0.3 4C0.7 4.4 1.3 4.4 1.7 4L2.9 2.8C4 1.7 6 1.7 7.1 2.8C7.7 3.4 8 4.2 8 5C8 5.8 7.7 6.6 7.1 7.1L6 8.3C5.6 8.7 5.6 9.3 6 9.7C6.2 9.9 6.5 10 6.7 10C6.9 10 7.2 9.9 7.4 9.7L8.6 8.5C9.5 7.6 10 6.3 10 5C10 3.7 9.5 2.4 8.5 1.5C7.6 0.5 6.3 0 5 0Z"
          transform="translate(6)"
          fill={color}
        />
        <path
          d="M8.3 6L7.1 7.2C6 8.3 4 8.3 2.9 7.2C2.3 6.6 2 5.8 2 5C2 4.2 2.3 3.4 2.9 2.9L4 1.7C4.4 1.3 4.4 0.7 4 0.3C3.6 -0.0999998 3 -0.0999998 2.6 0.3L1.5 1.5C0.5 2.4 0 3.7 0 5C0 6.3 0.5 7.6 1.5 8.5C2.4 9.5 3.7 10 5 10C6.3 10 7.6 9.5 8.5 8.5L9.7 7.3C10.1 6.9 10.1 6.3 9.7 5.9C9.3 5.5 8.7 5.6 8.3 6Z"
          transform="translate(0 6)"
          fill={color}
        />
        <path
          d="M4.5 0.3L0.3 4.5C-0.1 4.9 -0.1 5.5 0.3 5.9C0.5 6.1 0.8 6.2 1 6.2C1.2 6.2 1.5 6.1 1.7 5.9L5.9 1.7C6.3 1.3 6.3 0.7 5.9 0.3C5.5 -0.1 4.9 -0.1 4.5 0.3Z"
          transform="translate(4.8999 4.90002)"
          fill={color}
        />
      </svg>
    )
  }
}

Link.defaultProps = {
  color: 'currentColor',
  size: 16,
  block: false,
}

Link.propTypes = {
  color: PropTypes.string,
  size: PropTypes.number,
  block: PropTypes.bool,
}

export default Link
