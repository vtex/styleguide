import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { calcIconSize, baseClassname } from '../utils'

const iconBase = {
  width: 18,
  height: 12,
}

class Underline extends PureComponent {
  render() {
    const { color, size, block } = this.props
    const newSize = calcIconSize(iconBase, size)

    return (
      <svg
        className={`${baseClassname('underline')} ${block ? 'db' : ''}`}
        width={newSize.width}
        height={newSize.height}
        viewBox="0 0 64 64"
        fill={color}
        xmlns="http://www.w3.org/2000/svg">
        <path
          d="M55,4H37V8h4a2,2,0,0,1,2,2V34.51c0,5.742-4.187,10.879-9.9,11.436A11.012,11.012,0,0,1,21,35V10a2,2,0,0,1,2-2h4V4H9V8h4a2,2,0,0,1,2,2V34.4c0,9.046,6.811,16.957,15.836,17.561A17.018,17.018,0,0,0,49,35V10a2,2,0,0,1,2-2h4Z"
          fill={color}
        />
        <path fill={color} d="M62,60H2a1,1,0,0,1,0-2H62a1,1,0,0,1,0,2Z" />
      </svg>
    )
  }
}

Underline.defaultProps = {
  color: 'currentColor',
  size: 20,
  block: false,
}

Underline.propTypes = {
  color: PropTypes.string,
  size: PropTypes.number,
  block: PropTypes.bool,
}

export default Underline
