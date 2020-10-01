import React from 'react'
import PropTypes from 'prop-types'

import { baseClassname } from '../icon/utils'
import { rotate } from './styles.css'

const radius = 40
const circ = 2 * radius * Math.PI

class Spinner extends React.Component {
  render() {
    const { color, size, block } = this.props

    return (
      <svg
        className={`${rotate} ${baseClassname('spinner')} ${
          !color ? 'c-action-primary' : ''
        } ${block ? 'db' : 'dib'}`}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 100 100"
        preserveAspectRatio="xMidYMid"
        height={size}
        width={size}>
        <circle
          className="vtex-spinner_circle"
          cx="50"
          cy="50"
          fill="none"
          r={radius}
          stroke={color || 'currentColor'}
          strokeWidth="10"
          strokeDasharray={`0 0 ${circ * 0.65} ${circ}`}
          strokeLinecap="round"
          strokeDashoffset="1"
        />
      </svg>
    )
  }
}

Spinner.propTypes = {
  /** Color of the spinner */
  color: PropTypes.string,
  /** Size (diameter) of the spinner */
  size: PropTypes.number,
  /** Sets the display to block */
  block: PropTypes.bool,
}

Spinner.defaultProps = {
  block: false,
  size: 40,
}

export default Spinner
