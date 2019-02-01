import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { calcIconSize, baseClassname } from '../utils'

const iconBase = {
  width: 44,
  height: 44,
}

class ShoppingCart extends PureComponent {
  render() {
    const { color, size, block } = this.props
    const newSize = calcIconSize(iconBase, size)

    return (
      <svg
        className={`${baseClassname('shopping-cart')} ${block ? 'db' : ''}`}
        width={newSize.width}
        height={newSize.height}
        viewBox="0 0 32 30"
        fill="none"
        xmlns="http://www.w3.org/2000/svg">
        <path
          d="M8 30C9.65685 30 11 28.6569 11 27C11 25.3431 9.65685 24 8 24C6.34315 24 5 25.3431 5 27C5 28.6569 6.34315 30 8 30Z"
          fill={color}
        />
        <path
          d="M27 30C28.6569 30 30 28.6569 30 27C30 25.3431 28.6569 24 27 24C25.3431 24 24 25.3431 24 27C24 28.6569 25.3431 30 27 30Z"
          fill={color}
        />
        <path
          d="M28 22H7C6.505 22 6.084 21.638 6.011 21.148L3.139 2H0V0H4C4.495 0 4.916 0.362 4.989 0.852L5.611 5H31C31.3 5 31.583 5.134 31.773 5.366C31.963 5.597 32.039 5.902 31.98 6.196L28.98 21.196C28.887 21.664 28.477 22 28 22Z"
          fill={color}
        />
      </svg>
    )
  }
}

ShoppingCart.defaultProps = {
  color: 'currentColor',
  size: 20,
  block: false,
}

ShoppingCart.propTypes = {
  color: PropTypes.string,
  size: PropTypes.number,
  block: PropTypes.bool,
}

export default ShoppingCart
