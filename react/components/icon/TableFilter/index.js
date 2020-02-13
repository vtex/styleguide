import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

import { Svg } from '../IconBase'
import { calcIconSize } from '../utils'

const iconBase = {
  width: 13,
  height: 12,
}

class TableFilter extends PureComponent {
  render() {
    const { color, size, block } = this.props
    const newSize = calcIconSize(iconBase, size)

    return (
      <Svg name="table-filter" size={newSize} block={block} viewBox="0 0 13 12">
        <path
          d="M10.7042 0H8.56339V2H6.42255V4H12.8451V2H10.7042V0Z"
          fill={color}
        />
        <path d="M10.7042 5H8.56335V12H10.7042V5Z" fill={color} />
        <path d="M0 10H2.14085V12H4.28169V10H6.42253V8H0V10Z" fill={color} />
        <path d="M4.28171 0H2.14087V7H4.28171V0Z" fill={color} />
      </Svg>
    )
  }
}

TableFilter.defaultProps = {
  color: 'currentColor',
  size: 16,
  block: false,
}

TableFilter.propTypes = {
  color: PropTypes.string,
  size: PropTypes.number,
  block: PropTypes.bool,
}

export default TableFilter
