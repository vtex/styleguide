import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { calcIconSize, baseClassname } from '../utils'

const iconBase = {
  width: 16,
  height: 16,
}

class Help extends PureComponent {
  render() {
    const { color, size, solid, block } = this.props
    const newSize = calcIconSize(iconBase, size)

    if (solid) {
      return (
        <svg
          className={`${baseClassname('help', 'solid')} ${block ? 'db' : ''}`}
          width={newSize.width}
          height={newSize.height}
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M8 0C3.6 0 0 3.6 0 8C0 12.4 3.6 16 8 16C12.4 16 16 12.4 16 8C16 3.6 12.4 0 8 0ZM8 13C7.4 13 7 12.6 7 12C7 11.4 7.4 11 8 11C8.6 11 9 11.4 9 12C9 12.6 8.6 13 8 13ZM9.5 8.4C9 8.7 9 8.8 9 9V10H7V9C7 7.7 7.8 7.1 8.4 6.7C8.9 6.4 9 6.3 9 6C9 5.4 8.6 5 8 5C7.6 5 7.3 5.2 7.1 5.5L6.6 6.4L4.9 5.4L5.4 4.5C5.9 3.6 6.9 3 8 3C9.7 3 11 4.3 11 6C11 7.4 10.1 8 9.5 8.4Z"
            fill={color}
          />
        </svg>
      )
    }
    return (
      <svg
        className={baseClassname('help')}
        width={newSize.width}
        height={newSize.height}
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M8 0C3.6 0 0 3.6 0 8C0 12.4 3.6 16 8 16C12.4 16 16 12.4 16 8C16 3.6 12.4 0 8 0ZM8 14C4.7 14 2 11.3 2 8C2 4.7 4.7 2 8 2C11.3 2 14 4.7 14 8C14 11.3 11.3 14 8 14Z"
          fill={color}
        />
        <path
          d="M1 2C1.55228 2 2 1.55228 2 1C2 0.447715 1.55228 0 1 0C0.447715 0 0 0.447715 0 1C0 1.55228 0.447715 2 1 2Z"
          transform="translate(7 11)"
          fill={color}
        />
        <path
          d="M2.2 2.5C2.4 2.2 2.7 2 3.1 2C3.7 2 4.1 2.4 4.1 3C4.1 3.3 4 3.4 3.5 3.7C2.9 4.1 2.1 4.7 2.1 6V7H4.1V6C4.1 5.8 4.1 5.7 4.6 5.4C5.2 5 6.1 4.4 6.1 3C6.1 1.3 4.8 0 3.1 0C2 0 1 0.6 0.5 1.5L9.53674e-08 2.4L1.7 3.4L2.2 2.5Z"
          transform="translate(4.90002 3)"
          fill={color}
        />
      </svg>
    )
  }
}

Help.defaultProps = {
  color: 'currentColor',
  size: 16,
  solid: false,
  block: false,
}

Help.propTypes = {
  color: PropTypes.string,
  size: PropTypes.number,
  solid: PropTypes.bool,
  block: PropTypes.bool,
}

export default Help
