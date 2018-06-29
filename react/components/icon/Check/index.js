import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { calcIconSize, baseClassname } from '../utils'

const iconBase = {
  width: 16,
  height: 13,
}

class Check extends PureComponent {
  render() {
    const { color, size, block } = this.props
    const newSize = calcIconSize(iconBase, size)

    return (
      <svg
        className={`${baseClassname('check')} ${block ? 'db' : ''}`}
        width={newSize.width}
        height={newSize.height}
        viewBox="0 0 16 13"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M5.6 8L3.10711 5.50711C2.71658 5.11658 2.08342 5.11658 1.69289 5.50711L0.707107 6.49289C0.316583 6.88342 0.316583 7.51658 0.707107 7.90711L4.89289 12.0929C5.28342 12.4834 5.91658 12.4834 6.30711 12.0929L15.2929 3.10711C15.6834 2.71658 15.6834 2.08342 15.2929 1.69289L14.3071 0.707107C13.9166 0.316583 13.2834 0.316583 12.8929 0.707107L5.6 8Z"
          fill={color}
        />
      </svg>
    )
  }
}

Check.defaultProps = {
  color: 'currentColor',
  size: 16,
  block: false,
}

Check.propTypes = {
  color: PropTypes.string,
  size: PropTypes.number,
  block: PropTypes.bool,
}

export default Check
