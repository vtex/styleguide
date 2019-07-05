import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { calcIconSize, baseClassname } from '../utils'

const iconBase = {
  width: 18,
  height: 12,
}

class Bold extends PureComponent {
  render() {
    const { color, size, block } = this.props
    const newSize = calcIconSize(iconBase, size)

    return (
      <svg
        className={`${baseClassname('bold')} ${block ? 'db' : ''}`}
        width={newSize.width}
        height={newSize.height}
        viewBox="0 0 64 64"
        fill={color}
        xmlns="http://www.w3.org/2000/svg">
        <path
          fill={color}
          d="M43.06677,30.83765v-0.24634c5.05432-1.65662,10.10852-6.04956,10.10852-13.92456 C53.17529,8.4646,49.19739,2,35.02649,2H8v6l3.26491,1.0883C12.89828,9.63276,14,11.16131,14,12.88304v38.23392 c0,1.72172-1.10172,3.25028-2.73509,3.79473L8,56v6h26.28088c13.01013,0,22.62268-4.22766,22.62268-16.49219 C56.90356,37.22119,52.51404,31.91736,43.06677,30.83765z M26,10h7c4.97058,0,9,4.02942,9,9s-4.02942,9-9,9h-7V10z M35,54h-9V36h9 c4.97058,0,9,4.02942,9,9S39.97058,54,35,54z"
        />
      </svg>
    )
  }
}

Bold.defaultProps = {
  color: 'currentColor',
  size: 20,
  block: false,
}

Bold.propTypes = {
  color: PropTypes.string,
  size: PropTypes.number,
  block: PropTypes.bool,
}

export default Bold
