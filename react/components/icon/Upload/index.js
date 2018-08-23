import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { calcIconSize, baseClassname } from '../utils'

const iconBase = {
  width: 14,
  height: 16,
}

class Upload extends PureComponent {
  render() {
    const { color, size, block } = this.props
    const newSize = calcIconSize(iconBase, size)

    return (
      <svg
        className={`${baseClassname('upload')} ${block ? 'db' : ''}`}
        width={newSize.width}
        height={newSize.height}
        viewBox="0 0 14 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M5.4 3.4V12H7.4V3.4L11.4 7.4L12.8 6L7.1 0.3C6.7 -0.1 6.1 -0.1 5.7 0.3L2.38419e-08 6L1.4 7.4L5.4 3.4Z"
          transform="translate(0.599976)"
          fill={color}
        />
        <path d="M14 0H0V2H14V0Z" transform="translate(0 14)" fill={color} />
      </svg>
    )
  }
}

Upload.defaultProps = {
  color: 'currentColor',
  size: 16,
  block: false,
}

Upload.propTypes = {
  color: PropTypes.string,
  size: PropTypes.number,
  block: PropTypes.bool,
}

export default Upload
