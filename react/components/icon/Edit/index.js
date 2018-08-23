import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { calcIconSize, baseClassname } from '../utils'

const iconBase = {
  width: 16,
  height: 16,
}

class Edit extends PureComponent {
  render() {
    const { color, size, solid, block } = this.props
    const newSize = calcIconSize(iconBase, size)

    if (solid) {
      return (
        <svg
          className={`${baseClassname('edit', 'solid')} ${block ? 'db' : ''}`}
          width={newSize.width}
          height={newSize.height}
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M8.1 0L0.3 7.8C0.1 8 0 8.2 0 8.5V11.5C0 12.1 0.4 12.5 1 12.5H4C4.3 12.5 4.5 12.4 4.7 12.2L12.5 4.4L8.1 0Z"
            transform="translate(0 3.5)"
            fill={color}
          />
          <path
            d="M6.2 3.3L3.2 0.3C2.8 -0.1 2.2 -0.1 1.8 0.3L0 2.1L4.4 6.5L6.2 4.7C6.6 4.3 6.6 3.7 6.2 3.3Z"
            transform="translate(9.5)"
            fill={color}
          />
        </svg>
      )
    }
    return (
      <svg
        className={baseClassname('edit')}
        width={newSize.width}
        height={newSize.height}
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M11.7 0.3C11.3 -0.1 10.7 -0.1 10.3 0.3L0.3 10.3C0.1 10.5 0 10.7 0 11V15C0 15.6 0.4 16 1 16H5C5.3 16 5.5 15.9 5.7 15.7L15.7 5.7C16.1 5.3 16.1 4.7 15.7 4.3L11.7 0.3ZM4.6 14H2V11.4L8 5.4L10.6 8L4.6 14ZM12 6.6L9.4 4L11 2.4L13.6 5L12 6.6Z"
          fill={color}
        />
      </svg>
    )
  }
}

Edit.defaultProps = {
  color: 'currentColor',
  size: 16,
  solid: false,
  block: false,
}

Edit.propTypes = {
  color: PropTypes.string,
  size: PropTypes.number,
  solid: PropTypes.bool,
  block: PropTypes.bool,
}

export default Edit
