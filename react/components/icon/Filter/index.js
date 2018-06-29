import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { calcIconSize, baseClassname } from '../utils'

class Filter extends PureComponent {
  render() {
    const { color, size, solid, block } = this.props
    const iconBase = {
      width: solid ? 16 : 18,
      height: solid ? 16 : 21,
    }
    const newSize = calcIconSize(iconBase, size)

    if (solid) {
      return (
        <svg
          className={`${baseClassname('filter', 'solid')} ${block ? 'db' : ''}`}
          width={newSize.width}
          height={newSize.height}
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M15 0H1C0.4 0 0 0.4 0 1V3C0 3.3 0.1 3.6 0.4 3.8L6 8.5V15C6 15.4 6.2 15.8 6.6 15.9C6.7 16 6.9 16 7 16C7.3 16 7.5 15.9 7.7 15.7L9.7 13.7C9.9 13.5 10 13.3 10 13V8.5L15.6 3.8C15.9 3.6 16 3.3 16 3V1C16 0.4 15.6 0 15 0Z"
            fill={color}
          />
        </svg>
      )
    }
    return (
      <svg
        className={baseClassname('filter')}
        width={newSize.width}
        height={newSize.height}
        viewBox="0 0 18 21"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M16 3.16441C16 3.45327 15.8751 3.72803 15.6574 3.91794L10.1204 8.74873C9.90269 8.93864 9.77778 9.21339 9.77778 9.50226V16.5773C9.77778 16.9536 9.56663 17.2979 9.23135 17.4686L7.67579 18.2602C7.0105 18.5988 6.22222 18.1155 6.22222 17.369V9.50226C6.22222 9.21339 6.09731 8.93864 5.87964 8.74873L0.342585 3.91794C0.124915 3.72803 0 3.45327 0 3.16441V1C0 0.447715 0.447715 0 1 0H15C15.5523 0 16 0.447715 16 1V3.16441Z"
          transform="translate(1 1)"
          stroke={color}
          strokeWidth="2"
          strokeMiterlimit="10"
          strokeLinecap="square"
        />
      </svg>
    )
  }
}

Filter.defaultProps = {
  color: 'currentColor',
  size: 16,
  solid: false,
  block: false,
}

Filter.propTypes = {
  color: PropTypes.string,
  size: PropTypes.number,
  solid: PropTypes.bool,
  block: PropTypes.bool,
}

export default Filter
