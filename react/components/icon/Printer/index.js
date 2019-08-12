import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { calcIconSize, baseClassname } from '../utils'

const iconBase = {
  width: 16,
  height: 15,
}

class Printer extends PureComponent {
  render() {
    const { color, size, block } = this.props
    const newSize = calcIconSize(iconBase, size)

    return (
      <svg
        className={`${baseClassname('Printer')} ${block ? 'db' : ''}`}
        width={newSize.width}
        height={newSize.height}
        viewBox="0 0 16 15"
        fill="none"
        xmlns="http://www.w3.org/2000/svg">
        <path
          d="M13.6 4H2.4C1.072 4 0 5.072 0 6.4V10.2C0 10.7523 0.447715 11.2 1 11.2H3.2V13.4C3.2 13.9523 3.64772 14.4 4.2 14.4H11.8C12.3523 14.4 12.8 13.9523 12.8 13.4V11.2H15C15.5523 11.2 16 10.7523 16 10.2V6.4C16 5.072 14.928 4 13.6 4ZM11.2 12.8H4.8V8.8H11.2V12.8ZM13.6 7.2C13.16 7.2 12.8 6.84 12.8 6.4C12.8 5.96 13.16 5.6 13.6 5.6C14.04 5.6 14.4 5.96 14.4 6.4C14.4 6.84 14.04 7.2 13.6 7.2ZM12.8 1C12.8 0.447716 12.3523 0 11.8 0H4.2C3.64771 0 3.2 0.447715 3.2 1V3.2H12.8V1Z"
          fill={color}
        />
      </svg>
    )
  }
}

Printer.defaultProps = {
  color: 'currentColor',
  size: 16,
  block: false,
}

Printer.propTypes = {
  color: PropTypes.string,
  size: PropTypes.number,
  block: PropTypes.bool,
}

export default Printer
