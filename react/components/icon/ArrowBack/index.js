import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { calcIconSize, baseClassname } from '../utils'

const iconBase = {
  width: 16,
  height: 11,
}

class ArrowBack extends PureComponent {
  render() {
    const { color, size, block } = this.props
    const newSize = calcIconSize(iconBase, size)

    return (
      <svg
        className={`${baseClassname('arrow-back')} ${block ? 'db' : ''}`}
        width={newSize.width}
        height={newSize.height}
        viewBox="0 0 16 11"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M5.5 15.5002C5.75781 15.5002 5.92969 15.4169 6.10156 15.2502L11 10.5002L9.79687 9.33356L6.35938 12.6669L6.35938 0H4.64063L4.64062 12.6669L1.20312 9.33356L0 10.5002L4.89844 15.2502C5.07031 15.4169 5.24219 15.5002 5.5 15.5002Z"
          transform="translate(16.0002) rotate(90)"
          fill={color}
        />
      </svg>
    )
  }
}

ArrowBack.defaultProps = {
  color: 'currentColor',
  size: 16,
  block: false,
}

ArrowBack.propTypes = {
  color: PropTypes.string,
  size: PropTypes.number,
  block: PropTypes.bool,
}

export default ArrowBack
