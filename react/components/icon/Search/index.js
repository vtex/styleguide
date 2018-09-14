import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { calcIconSize, baseClassname } from '../utils'

const iconBase = {
  width: 16,
  height: 16,
}

class Search extends PureComponent {
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
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M12.7 11.2298C13.6 10.0373 14.1 8.64596 14.1 7.0559C14.1 3.18012 11 0 7.1 0C3.2 0 0 3.18012 0 7.0559C0 10.9317 3.2 14.1118 7.1 14.1118C8.7 14.1118 10.2 13.6149 11.3 12.7205L14.3 15.7019C14.5 15.9006 14.8 16 15 16C15.2 16 15.5 15.9006 15.7 15.7019C16.1 15.3043 16.1 14.7081 15.7 14.3106L12.7 11.2298ZM7.1 12.0248C4.3 12.0248 2 9.83851 2 7.0559C2 4.27329 4.3 1.98758 7.1 1.98758C9.9 1.98758 12.2 4.27329 12.2 7.0559C12.2 9.83851 9.9 12.0248 7.1 12.0248Z" fill="#979899"
          fill={color}
        />
      </svg>
    )
  }
}

Search.defaultProps = {
  color: 'currentColor',
  size: 16,
  block: false,
}

Search.propTypes = {
  color: PropTypes.string,
  size: PropTypes.number,
  block: PropTypes.bool,
}

export default Search
