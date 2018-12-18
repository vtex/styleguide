import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { calcIconSize, baseClassname } from '../utils'

const iconBase = {
  width: 16,
  height: 16,
}

class Calendar extends PureComponent {
  render() {
    const { color, size, block } = this.props
    const newSize = calcIconSize(iconBase, size)

    return (
      <svg
        className={`${baseClassname('search')} ${block ? 'db' : ''}`}
        width={newSize.width}
        height={newSize.height}
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg">
        <path
          d="M4.66667 7.2H3.11111V8.8H4.66667V7.2ZM7.77778 7.2H6.22222V8.8H7.77778V7.2ZM10.8889 7.2H9.33333V8.8H10.8889V7.2ZM12.4444 1.6H11.6667V0H10.1111V1.6H3.88889V0H2.33333V1.6H1.55556C0.692222 1.6 0.00777777 2.32 0.00777777 3.2L0 14.4C0 15.28 0.692222 16 1.55556 16H12.4444C13.3 16 14 15.28 14 14.4V3.2C14 2.32 13.3 1.6 12.4444 1.6ZM12.4444 14.4H1.55556V5.6H12.4444V14.4Z"
          fill={color}
        />
      </svg>
    )
  }
}

Calendar.defaultProps = {
  color: 'currentColor',
  size: 16,
  block: false,
}

Calendar.propTypes = {
  color: PropTypes.string,
  size: PropTypes.number,
  block: PropTypes.bool,
}

export default Calendar
