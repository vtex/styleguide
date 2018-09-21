import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { calcIconSize, baseClassname } from '../utils'

const iconBase = {
  width: 44,
  height: 44,
}

class User extends PureComponent {
  render() {
    const { color, size, block, solid } = this.props
    const newSize = calcIconSize(iconBase, size)

    if (solid) {
      return (
        <svg
          className={`${baseClassname('user')} ${block ? 'db' : ''}`}
          width={newSize.width}
          height={newSize.height}
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M16 0C7.17733 0 0 7.17733 0 16C0 24.8227 7.17733 32 16 32C24.8227 32 32 24.8227 32 16C32 7.17733 24.8227 0 16 0ZM24.9307 25.872C24.0453 23.2413 21.5973 21.3333 18.6667 21.3333H13.3333C10.4027 21.3333 7.95733 23.2427 7.072 25.8733C4.37467 23.432 2.66667 19.916 2.66667 16C2.66667 8.648 8.648 2.66667 16 2.66667C23.352 2.66667 29.3333 8.648 29.3333 16C29.3333 19.9147 27.6267 23.4307 24.9307 25.872Z"
            fill={color}
          />
          <path
            d="M15.9998 6.66699C13.0545 6.66699 10.6665 9.05499 10.6665 12.0003V13.3337C10.6665 16.279 13.0545 18.667 15.9998 18.667C18.9452 18.667 21.3332 16.279 21.3332 13.3337V12.0003C21.3332 9.05499 18.9452 6.66699 15.9998 6.66699Z"
            fill={color}
          />
        </svg>
      )
    }

    return (
      <svg
        className={`${baseClassname('user')} ${block ? 'db' : ''}`}
        width={newSize.width}
        height={newSize.height}
        viewBox="0 0 44 44"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M13.3333 6.66667C13.3333 10.3486 10.3486 13.3333 6.66667 13.3333C2.98477 13.3333 0 10.3486 0 6.66667C0 2.98477 2.98477 0 6.66667 0C10.3486 0 13.3333 2.98477 13.3333 6.66667Z"
          transform="translate(15.333 10)"
          stroke={color}
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M26.416 8.32156C25.2235 5.82988 23.3506 3.72634 21.0134 2.25385C18.6763 0.781363 15.9703 -5.20651e-07 13.208 -5.20651e-07C10.4457 -5.20651e-07 7.7397 0.781363 5.40256 2.25385C3.06542 3.72634 1.19247 5.82988 -1.83105e-07 8.32156"
          transform="translate(8.79199 28.6678)"
          stroke={color}
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M40 20C40 31.0457 31.0457 40 20 40C8.95431 40 0 31.0457 0 20C0 8.95431 8.95431 0 20 0C31.0457 0 40 8.95431 40 20Z"
          transform="translate(2 2)"
          stroke={color}
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    )
  }
}

User.defaultProps = {
  color: 'currentColor',
  size: 20,
  block: false,
  solid: false,
}

User.propTypes = {
  color: PropTypes.string,
  size: PropTypes.number,
  block: PropTypes.bool,
  solid: PropTypes.bool,
}

export default User
