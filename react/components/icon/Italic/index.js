import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { calcIconSize, baseClassname } from '../utils'

const iconBase = {
  width: 18,
  height: 12,
}

class Italic extends PureComponent {
  render() {
    const { color, size, block } = this.props
    const newSize = calcIconSize(iconBase, size)

    return (
      <svg
        className={`${baseClassname('italic')} ${block ? 'db' : ''}`}
        width={newSize.width}
        height={newSize.height}
        viewBox="0 0 64 64"
        fill={color}
        xmlns="http://www.w3.org/2000/svg">
        <path
          fill={color}
          d="M18,62v-4l5.25626-0.64264c1.16066-0.08098,1.32598-0.41163,1.49131-1.65664l6.62993-47.40145 c0.16533-1.24501,0.08435-1.57566-1.07631-1.66001L26,6V2h20v4l-5.58691,0.72361c-1.24501,0.16533-1.32936,0.33065-1.49469,1.57566 l-6.7109,47.32048c-0.16533,1.32598-0.16533,1.49131,1.07631,1.65664L38,58v4H18z"
        />
      </svg>
    )
  }
}

Italic.defaultProps = {
  color: 'currentColor',
  size: 20,
  block: false,
}

Italic.propTypes = {
  color: PropTypes.string,
  size: PropTypes.number,
  block: PropTypes.bool,
}

export default Italic
