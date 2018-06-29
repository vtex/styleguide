import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { calcIconSize, baseClassname } from '../utils'

const iconBase = {
  width: 14,
  height: 14,
}

class Deny extends PureComponent {
  render() {
    const { color, size, block } = this.props
    const newSize = calcIconSize(iconBase, size)

    return (
      <svg
        className={`${baseClassname('deny')} ${block ? 'db' : ''}`}
        width={newSize.width}
        height={newSize.height}
        viewBox="0 0 14 14"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M11.9071 0.707107C11.5166 0.316582 10.8834 0.316582 10.4929 0.707107L7 4.2L3.50711 0.707107C3.11658 0.316582 2.48342 0.316583 2.09289 0.707107L0.707107 2.09289C0.316582 2.48342 0.316583 3.11658 0.707107 3.50711L4.2 7L0.707107 10.4929C0.316582 10.8834 0.316583 11.5166 0.707107 11.9071L2.09289 13.2929C2.48342 13.6834 3.11658 13.6834 3.50711 13.2929L7 9.8L10.4929 13.2929C10.8834 13.6834 11.5166 13.6834 11.9071 13.2929L13.2929 11.9071C13.6834 11.5166 13.6834 10.8834 13.2929 10.4929L9.8 7L13.2929 3.50711C13.6834 3.11658 13.6834 2.48342 13.2929 2.09289L11.9071 0.707107Z"
          fill={color}
        />
      </svg>
    )
  }
}

Deny.defaultProps = {
  color: 'currentColor',
  size: 16,
  block: false,
}

Deny.propTypes = {
  color: PropTypes.string,
  size: PropTypes.number,
  block: PropTypes.bool,
}

export default Deny
