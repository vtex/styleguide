import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { calcIconSize, baseClassname } from '../utils'

const iconBase = {
  width: 16,
  height: 16,
}

class Save extends PureComponent {
  render() {
    const { color, size, block } = this.props
    const newSize = calcIconSize(iconBase, size)

    return (
      <svg
        className={`${baseClassname('save')} ${block ? 'db' : ''}`}
        width={newSize.width}
        height={newSize.height}
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M11.7 0.3C11.5 0.1 11.3 0 11 0H10V3C10 3.6 9.6 4 9 4H4C3.4 4 3 3.6 3 3V0H1C0.4 0 0 0.4 0 1V15C0 15.6 0.4 16 1 16H15C15.6 16 16 15.6 16 15V5C16 4.7 15.9 4.5 15.7 4.3L11.7 0.3ZM13 14H3V11C3 10.4 3.4 10 4 10H12C12.6 10 13 10.4 13 11V14Z"
          fill={color}
        />
        <path d="M2 0H0V3H2V0Z" transform="translate(7)" fill={color} />
      </svg>
    )
  }
}

Save.defaultProps = {
  color: 'currentColor',
  size: 16,
  block: false,
}

Save.propTypes = {
  color: PropTypes.string,
  size: PropTypes.number,
  block: PropTypes.bool,
}

export default Save
