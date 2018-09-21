import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { calcIconSize, baseClassname } from '../utils'

const iconBase = {
  width: 44,
  height: 44,
}

class ShoppingCart extends PureComponent {
  render() {
    const { color, size, block, solid } = this.props
    const newSize = calcIconSize(iconBase, size)

    if (solid) {
      return (
        <svg
          className={`${baseClassname('shopping-cart')} ${block ? 'db' : ''}`}
          width={newSize.width}
          height={newSize.height}
          viewBox="0 0 32 30"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
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

    return (
      <svg
        className={`${baseClassname('shopping-cart')} ${block ? 'db' : ''}`}
        width={newSize.width}
        height={newSize.height}
        viewBox="0 0 44 44"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M0 0H8L10.6667 24H34.6667L40 8H16" transform="translate(2 2)" stroke={color} strokeWidth="3" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M8 4C8 6.20914 6.20914 8 4 8C1.79086 8 0 6.20914 0 4C0 1.79086 1.79086 0 4 0C6.20914 0 8 1.79086 8 4Z" transform="translate(10 34)" stroke={color} strokeWidth="3" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M8 4C8 6.20914 6.20914 8 4 8C1.79086 8 0 6.20914 0 4C0 1.79086 1.79086 0 4 0C6.20914 0 8 1.79086 8 4Z" transform="translate(31.3335 34)" stroke={color} strokeWidth="3" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    )
  }
}

ShoppingCart.defaultProps = {
  color: 'currentColor',
  size: 20,
  block: false,
  solid: false,
}

ShoppingCart.propTypes = {
  color: PropTypes.string,
  size: PropTypes.number,
  block: PropTypes.bool,
  solid: PropTypes.bool,
}

export default ShoppingCart
