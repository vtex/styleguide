import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import config from 'vtex-tachyons/config.json'
import { calcIconSize, baseClassname } from '../utils'

const iconBase = {
  width: 18,
  height: 18,
}

class Close extends PureComponent {
  render() {
    const { color, size } = this.props
    const newSize = calcIconSize(iconBase, size)

    return (
      <svg
        className={baseClassname('close')}
        width={newSize.width} height={newSize.height} viewBox="0 0 18 18">
        <g fill={color}>
          <path d="M14.53 4.53l-1.06-1.06L9 7.94 4.53 3.47 3.47 4.53 7.94 9l-4.47 4.47 1.06 1.06L9 10.06l4.47 4.47 1.06-1.06L10.06 9z" />
        </g>
      </svg>
    )
  }
}

Close.defaultProps = {
  color: config.colors['serious-black'],
  size: 16,
}

Close.propTypes = {
  color: PropTypes.string,
  size: PropTypes.number,
}

export default Close
