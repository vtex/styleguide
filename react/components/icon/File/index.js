import React from 'react'
import PropTypes from 'prop-types'

import { calcIconSize, baseClassname } from '../utils'

const iconBase = {
  width: 16,
  height: 16,
}

const File = ({ color, size, block }) => {
  const newSize = calcIconSize(iconBase, size)

  return (
    <svg
      className={`${baseClassname('info')} ${block ? 'db' : ''}`}
      width={newSize.width}
      height={newSize.height}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <path
        d="M4.50146 11.2872H10.9989"
        stroke={color}
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M4.50146 8.50256H10.9989"
        stroke={color}
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M4.50146 5.7179H6.35788"
        stroke={color}
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9.43534 1.3698C9.2478 1.18226 8.99345 1.0769 8.72823 1.0769H2.7168C2.16451 1.0769 1.7168 1.52462 1.7168 2.0769V14C1.7168 14.5523 2.16451 15 2.7168 15H12.7835C13.3358 15 13.7835 14.5523 13.7835 14V6.13215C13.7835 5.86693 13.6781 5.61258 13.4906 5.42504L9.43534 1.3698Z"
        stroke={color}
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9 2V6H13"
        stroke={color}
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

File.defaultProps = {
  color: 'currentColor',
  size: 16,
  block: false,
}

File.propTypes = {
  color: PropTypes.string,
  size: PropTypes.number,
  block: PropTypes.bool,
}

export default File
