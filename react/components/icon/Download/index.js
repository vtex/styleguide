import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { calcIconSize, baseClassname } from '../utils'

const iconBase = {
  width: 14,
  height: 16,
}

class Download extends PureComponent {
  render() {
    const { color, size, block } = this.props
    const newSize = calcIconSize(iconBase, size)

    return (
      <svg
        className={`${baseClassname('download')} ${block ? 'db' : ''}`}
        width={newSize.width}
        height={newSize.height}
        viewBox="0 0 14 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M6.4 12C6.7 12 6.9 11.9 7.1 11.7L12.8 6L11.4 4.6L7.4 8.6V0H5.4V8.6L1.4 4.6L2.38419e-08 6L5.7 11.7C5.9 11.9 6.1 12 6.4 12Z"
          transform="translate(0.599976)"
          fill={color}
        />
        <path d="M14 0H0V2H14V0Z" transform="translate(0 14)" fill={color} />
      </svg>
    )
  }
}

Download.defaultProps = {
  color: 'currentColor',
  size: 16,
  block: false,
}

Download.propTypes = {
  color: PropTypes.string,
  size: PropTypes.number,
  block: PropTypes.bool,
}

export default Download
