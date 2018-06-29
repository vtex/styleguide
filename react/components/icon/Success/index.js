import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { calcIconSize, baseClassname } from '../utils'

const iconBase = {
  width: 16,
  height: 16,
}

class Success extends PureComponent {
  render() {
    const { color, size, solid, block } = this.props
    const newSize = calcIconSize(iconBase, size)

    if (solid) {
      return (
        <svg
          className={baseClassname('upload', 'solid')}
          width={newSize.width}
          height={newSize.height}
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M8 0C3.6 0 0 3.6 0 8C0 12.4 3.6 16 8 16C12.4 16 16 12.4 16 8C16 3.6 12.4 0 8 0ZM7 11.4L3.6 8L5 6.6L7 8.6L11 4.6L12.4 6L7 11.4Z"
            fill={color}
          />
        </svg>
      )
    }
    return (
      <svg
        className={`${baseClassname('success')} ${block ? 'db' : ''}`}
        width={newSize.width}
        height={newSize.height}
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M8 0C3.589 0 0 3.589 0 8C0 12.411 3.589 16 8 16C12.411 16 16 12.411 16 8C16 3.589 12.411 0 8 0ZM8 14C4.691 14 2 11.309 2 8C2 4.691 4.691 2 8 2C11.309 2 14 4.691 14 8C14 11.309 11.309 14 8 14Z"
          fill={color}
        />
        <path
          d="M3.414 6.828L-3.43323e-08 3.414L1.414 2L3.414 4L7.414 -3.43323e-08L8.828 1.414L3.414 6.828Z"
          transform="translate(3.58606 4.586)"
          fill={color}
        />
      </svg>
    )
  }
}

Success.defaultProps = {
  color: 'currentColor',
  size: 16,
  solid: false,
  block: false,
}

Success.propTypes = {
  color: PropTypes.string,
  size: PropTypes.number,
  solid: PropTypes.bool,
  block: PropTypes.bool,
}

export default Success
