import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { calcIconSize } from '../utils'

const iconBase = {
  width: 16,
  height: 16,
}

class OptionsDots extends PureComponent {
  render() {
    const { color, size, block, radius } = this.props
    const newSize = calcIconSize(iconBase, size)

    return (
      <svg
        viewBox="0 0 32 32"
        className={`${block ? 'db' : ''}`}
        width={newSize.width}
        height={newSize.height}>
        <g className="nc-icon-wrapper" fill={color}>
          <g
            className="nc-interact_dots-close-o-32"
            transform="rotate(90 16 16)">
            {' '}
            <g className="nc-dot_left" transform="translate(0)">
              {' '}
              <circle
                cx="6"
                cy="16"
                r={radius}
                fill={color}
                data-cap="butt"
                data-stroke="none"
                strokeLinecap="butt"
                strokeLinejoin="miter"
              />{' '}
              <circle
                cx="6"
                cy="16"
                r={radius}
                fill="none"
                stroke={color}
                strokeLinecap="square"
                strokeLinejoin="miter"
                strokeWidth="2"
              />{' '}
            </g>{' '}
            <g className="nc-dot_right" transform="translate(-0)">
              {' '}
              <circle
                cx="26"
                cy="16"
                r={radius}
                fill={color}
                data-cap="butt"
                data-stroke="none"
                strokeLinecap="butt"
                strokeLinejoin="miter"
              />{' '}
              <circle
                cx="26"
                cy="16"
                r={radius}
                fill="none"
                stroke={color}
                strokeLinecap="square"
                strokeLinejoin="miter"
                strokeWidth="2"
              />{' '}
            </g>{' '}
            <g className="nc-dot_center">
              {' '}
              <circle
                cx="16"
                cy="16"
                r={radius}
                fill={color}
                data-cap="butt"
                data-stroke="none"
                strokeLinecap="butt"
                strokeLinejoin="miter"
              />{' '}
              <circle
                cx="16"
                cy="16"
                r={radius}
                fill="none"
                stroke={color}
                strokeLinecap="square"
                strokeLinejoin="miter"
                strokeWidth="2"
              />{' '}
            </g>{' '}
            <path
              className="nc-line_top-right"
              data-cap="none"
              fill="none"
              stroke={color}
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M16 16L27 5"
              strokeDasharray="15.56 15.56"
              strokeDashoffset="15.56"
              opacity="0"
            />{' '}
            <path
              className="nc-line_bottom-left"
              data-cap="none"
              fill="none"
              stroke={color}
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M5 27l11-11"
              strokeDasharray="15.56 15.56"
              strokeDashoffset="-15.56"
              opacity="0"
            />{' '}
            <path
              className="nc-line_bottom-right"
              data-cap="none"
              fill="none"
              stroke={color}
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M16 16l11 11"
              strokeDasharray="15.56 15.56"
              strokeDashoffset="15.56"
              opacity="0"
            />{' '}
            <path
              className="nc-line_top-left"
              data-cap="none"
              fill="none"
              stroke={color}
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M5 5l11 11"
              strokeDasharray="15.56 15.56"
              strokeDashoffset="-15.56"
              opacity="0"
            />{' '}
          </g>
        </g>
      </svg>
    )
  }
}

OptionsDots.defaultProps = {
  color: '#444444',
  size: 16,
  radius: 2,
  block: false,
}

OptionsDots.propTypes = {
  color: PropTypes.string,
  radius: PropTypes.number,
  size: PropTypes.number,
  block: PropTypes.bool,
}

export default OptionsDots
