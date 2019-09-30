import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { calcIconSize, baseClassname } from '../utils'

const iconBase = {
  width: 18,
  height: 12,
}

class Trophy extends PureComponent {
  render() {
    const { color, size, block } = this.props
    const newSize = calcIconSize(iconBase, size)

    return (
      <svg
        className={`${baseClassname('trophy')} ${block ? 'db' : ''}`}
        width={newSize.width}
        height={newSize.height}
        viewBox="0 0 64 64"
        fill={color}
        xmlns="http://www.w3.org/2000/svg">
        <path
          fill={color}
          d="M58.5,6H51V3a1,1,0,0,0-1-1H14a1,1,0,0,0-1,1V6H5.5A1.5,1.5,0,0,0,4,7.5v10c0,5.96,3.552,11.973,10.336,12.453a18.973,18.973,0,0,0,35.328,0C56.448,29.473,60,23.46,60,17.5V7.5A1.5,1.5,0,0,0,58.5,6ZM7,17.5V9h6V23a19.012,19.012,0,0,0,.384,3.805C9.015,25.864,7,21.549,7,17.5Zm50,0c0,4.049-2.015,8.364-6.384,9.305A19.012,19.012,0,0,0,51,23V9h6Z" />
        <path
          data-color="color-2"
          d="M36,52H34V44H30v8H28c-10.207,0-11,6.889-11,9a1,1,0,0,0,1,1H46a1,1,0,0,0,1-1C47,58.889,46.207,52,36,52Z" />
      </svg>
    )
  }
}

Trophy.defaultProps = {
  color: 'currentColor',
  size: 20,
  block: false,
}

Trophy.propTypes = {
  color: PropTypes.string,
  size: PropTypes.number,
  block: PropTypes.bool,
}

export default Trophy
