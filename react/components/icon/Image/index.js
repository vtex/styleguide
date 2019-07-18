import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { calcIconSize, baseClassname } from '../utils'

const iconBase = {
  width: 18,
  height: 12,
}

class Image extends PureComponent {
  render() {
    const { color, size, block } = this.props
    const newSize = calcIconSize(iconBase, size)

    return (
      <svg
        className={`${baseClassname('image')} ${block ? 'db' : ''}`}
        width={newSize.width}
        height={newSize.height}
        viewBox="0 0 64 64"
        fill={color}
        xmlns="http://www.w3.org/2000/svg">
        <path d="M52,10H12V6a2,2,0,0,1,2-2H50a2,2,0,0,1,2,2Z" fill={color} />
        <path
          d="M59,12H5a2,2,0,0,0-2,2V58a2,2,0,0,0,2,2H59a2,2,0,0,0,2-2V14A2,2,0,0,0,59,12ZM21,20a4,4,0,1,1-4,4A4,4,0,0,1,21,20ZM52.87,49.493A1,1,0,0,1,52,50H12a1,1,0,0,1-.832-1.555l8-12a1,1,0,0,1,1.539-.152l7.185,7.185L39.2,28.4a.973.973,0,0,1,.852-.4,1,1,0,0,1,.8.484l12,20A1,1,0,0,1,52.87,49.493Z"
          fill={color}
        />
      </svg>
    )
  }
}

Image.defaultProps = {
  color: 'currentColor',
  size: 20,
  block: false,
}

Image.propTypes = {
  color: PropTypes.string,
  size: PropTypes.number,
  block: PropTypes.bool,
}

export default Image
