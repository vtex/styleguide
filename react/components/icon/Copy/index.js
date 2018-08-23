import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { calcIconSize, baseClassname } from '../utils'

const iconBase = {
  width: 18,
  height: 18,
}

class Copy extends PureComponent {
  render() {
    const { color, size, block } = this.props
    const newSize = calcIconSize(iconBase, size)

    return (
      <svg
        className={`${baseClassname('copy')} ${block ? 'db' : ''}`}
        width={newSize.width}
        height={newSize.height}
        viewBox="0 0 18 18"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M6.4 0H9.2C10.3046 0 11.2 0.895431 11.2 2V9.2C11.2 10.3046 10.3046 11.2 9.2 11.2H2C0.89543 11.2 0 10.3046 0 9.2V6.4"
          transform="translate(5.80005 12.2) rotate(-90)"
          stroke={color}
          strokeWidth="2"
          strokeMiterlimit="10"
          strokeLinecap="square"
        />
        <path
          d="M9.2 0H2C0.895431 0 0 0.89543 0 2V9.2C0 10.3046 0.89543 11.2 2 11.2H9.2C10.3046 11.2 11.2 10.3046 11.2 9.2V2C11.2 0.895431 10.3046 0 9.2 0Z"
          transform="translate(1 17) rotate(-90)"
          stroke={color}
          strokeWidth="2"
          strokeMiterlimit="10"
          strokeLinecap="square"
        />
      </svg>
    )
  }
}

Copy.defaultProps = {
  color: 'currentColor',
  size: 16,
  block: false,
}

Copy.propTypes = {
  color: PropTypes.string,
  size: PropTypes.number,
  block: PropTypes.bool,
}

export default Copy
