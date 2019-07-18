import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { calcIconSize, baseClassname } from '../utils'

const iconBase = {
  width: 18,
  height: 12,
}

class Text extends PureComponent {
  render() {
    const { color, size, block } = this.props
    const newSize = calcIconSize(iconBase, size)

    return (
      <svg
        className={`${baseClassname('text')} ${block ? 'db' : ''}`}
        width={newSize.width}
        height={newSize.height}
        viewBox="0 0 64 64"
        fill={color}
        xmlns="http://www.w3.org/2000/svg">
        <path
          fill={color}
          d="M58,2H6C5.448,2,5,2.448,5,3v12c0,0.552,0.448,1,1,1h2c0.265,0,0.52-0.105,0.707-0.293L14.414,10H27v42.586 l-5.707,5.707C21.105,58.48,21,58.735,21,59v2c0,0.552,0.448,1,1,1h20c0.552,0,1-0.448,1-1v-2c0-0.265-0.105-0.52-0.293-0.707 L37,52.586V10h12.465l3.703,5.555C53.354,15.833,53.666,16,54,16h4c0.552,0,1-0.448,1-1V3C59,2.448,58.552,2,58,2z"
        />
      </svg>
    )
  }
}

Text.defaultProps = {
  color: 'currentColor',
  size: 20,
  block: false,
}

Text.propTypes = {
  color: PropTypes.string,
  size: PropTypes.number,
  block: PropTypes.bool,
}

export default Text
