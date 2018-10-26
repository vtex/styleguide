import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { calcIconSize } from '../utils'

const iconBase = {
  width: 16,
  height: 16,
}

class VisibilityOn extends PureComponent {
  render() {
    const { color, size, solid } = this.props
    const newSize = calcIconSize(iconBase, size)

    if (solid) {
      return (
        <svg
          width={newSize.width}
          height={newSize.height}
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg">
          <path
            d="M7.975 14C11.575 14 14.375 10.9 15.575 9.1C16.075 8.4 16.075 7.5 15.575 6.8C14.375 5.1 11.575 2 7.975 2C4.375 2 1.575 5.1 0.375 6.9C-0.125 7.6 -0.125 8.5 0.375 9.1C1.575 10.9 4.375 14 7.975 14ZM7.975 5C9.675 5 10.975 6.3 10.975 8C10.975 9.7 9.675 11 7.975 11C6.275 11 4.975 9.7 4.975 8C4.975 6.3 6.275 5 7.975 5Z"
            fill={color}
          />
        </svg>
      )
    }
    return (
      <svg
        width={newSize.width}
        height={newSize.height}
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg">
        <g clipPath="url(#clip0)">
          <path
            d="M8.00013 14C12.7071 14 15.7441 8.716 15.8711 8.492C16.0421 8.188 16.0431 7.816 15.8721 7.512C15.7461 7.287 12.7311 2 8.00013 2C3.24513 2 0.251127 7.289 0.126127 7.514C-0.0428725 7.817 -0.0418725 8.186 0.128127 8.489C0.254127 8.713 3.26913 14 8.00013 14ZM8.00013 4C10.8391 4 13.0361 6.835 13.8181 8C13.0341 9.166 10.8371 12 8.00013 12C5.15913 12 2.96213 9.162 2.18113 7.999C2.95813 6.835 5.14613 4 8.00013 4Z"
            fill={color}
          />
          <path
            d="M8.00013 10C9.1047 10 10.0001 9.10457 10.0001 8C10.0001 6.89543 9.1047 6 8.00013 6C6.89556 6 6.00013 6.89543 6.00013 8C6.00013 9.10457 6.89556 10 8.00013 10Z"
            fill={color}
          />
        </g>
        <defs>
          <clipPath id="clip0">
            <rect width="16" height="16" fill="none" />
          </clipPath>
        </defs>
      </svg>
    )
  }
}

VisibilityOn.defaultProps = {
  color: 'currentColor',
  size: 16,
  solid: false,
}

VisibilityOn.propTypes = {
  color: PropTypes.string,
  size: PropTypes.number,
  solid: PropTypes.bool,
}

export default VisibilityOn
