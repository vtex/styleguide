import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { calcIconSize, baseClassname } from '../utils'

const iconBase = {
  width: 14,
  height: 16,
}

class Ban extends PureComponent {
  render() {
    const { color, size, block } = this.props
    const newSize = calcIconSize(iconBase, size)

    return (
      <svg
        className={`${baseClassname('ban')} ${block ? 'db' : ''}`}
        width={newSize.width}
        height={newSize.height}
        viewBox="0 0 64 64"
        fill={color}
        xmlns="http://www.w3.org/2000/svg">
        <path
          d="M32,2A30,30,0,1,0,62,32,30.034,30.034,0,0,0,32,2ZM8,32A23.98,23.98,0,0,1,46.705,13.053L13.053,46.705A23.871,23.871,0,0,1,8,32ZM32,56a23.871,23.871,0,0,1-14.7-5.053L50.947,17.3A23.98,23.98,0,0,1,32,56Z"
          fill={color}
        />
      </svg>
    )
  }
}

Ban.defaultProps = {
  color: 'currentColor',
  size: 16,
  block: false,
}

Ban.propTypes = {
  color: PropTypes.string,
  size: PropTypes.number,
  block: PropTypes.bool,
}

export default Ban
