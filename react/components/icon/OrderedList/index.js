import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { calcIconSize, baseClassname } from '../utils'

const iconBase = {
  width: 18,
  height: 12,
}

class OrderedList extends PureComponent {
  render() {
    const { color, size, block } = this.props
    const newSize = calcIconSize(iconBase, size)

    return (
      <svg
        className={`${baseClassname('orderedList')} ${block ? 'db' : ''}`}
        width={newSize.width}
        height={newSize.height}
        viewBox="0 0 64 64"
        fill={color}
        xmlns="http://www.w3.org/2000/svg">
        <path d="M3.985,18.909V17.014l2.063-.168c.336-.024.384-.12.384-.481V7.994c0-.288-.073-.432-.312-.5L4.033,7.058,4.3,5.091h5.757V16.365c0,.384.024.457.384.481l1.967.168v1.895Z" />{' '}
        <path
          data-color="color-2"
          d="M2.738,39.088v-2.23l3.214-3.143c2.423-2.351,3.454-3.311,3.454-4.678,0-.887-.432-1.535-1.7-1.535-1.319,0-1.87.431-1.87,2.135L2.57,29.349c.024-3.814,2.927-4.437,5.445-4.437,3.718,0,5.038,1.583,5.038,3.838s-1.56,3.741-3.311,5.421L7.032,36.76h3.525c.241,0,.336-.047.384-.285l.336-1.9H13.82v4.51Z"
        />{' '}
        <path
          data-color="color-2"
          d="M10.834,51.736A3.385,3.385,0,0,1,14,55.43c0,3.166-2.375,4.654-5.8,4.654a7.921,7.921,0,0,1-5.8-2.207l1.919-2.113a4.781,4.781,0,0,0,3.6,1.586c1.343,0,2.494-.481,2.494-2.16,0-1.463-.911-2.063-2.4-2.063a9.691,9.691,0,0,0-1.775.168V50.9L7.4,50.752c1.728-.215,2.663-1.055,2.663-2.59,0-.912-.408-1.656-1.751-1.656-1.3,0-1.92.431-1.92,2.134l-3.286-.287c0-3.789,2.854-4.437,5.373-4.437,3.7,0,5.11,1.414,5.11,3.98a3.756,3.756,0,0,1-2.758,3.743Z"
          fill={color}
        />
        <path d="M61,13H21a1,1,0,0,1,0-2H61a1,1,0,0,1,0,2Z" fill={color} />
        <path d="M46,33H21a1,1,0,0,1,0-2H46a1,1,0,0,1,0,2Z" fill={color} />
        <path d="M61,53H21a1,1,0,0,1,0-2H61a1,1,0,0,1,0,2Z" fill={color} />
      </svg>
    )
  }
}

OrderedList.defaultProps = {
  color: 'currentColor',
  size: 20,
  block: false,
}

OrderedList.propTypes = {
  color: PropTypes.string,
  size: PropTypes.number,
  block: PropTypes.bool,
}

export default OrderedList
