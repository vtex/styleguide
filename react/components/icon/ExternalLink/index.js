import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { calcIconSize, baseClassname } from '../utils'

const iconBase = {
  width: 16,
  height: 16,
}

class ExternalLink extends PureComponent {
  render() {
    const { color, size, block } = this.props
    const newSize = calcIconSize(iconBase, size)

    return (
      <svg
        className={`${baseClassname('external-link')} ${block ? 'db' : ''}`}
        width={newSize.width}
        height={newSize.height}
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M8.7 0H1.7V2H6.3L1.90735e-07 8.3L1.4 9.7L7.7 3.4V8H9.7V1C9.7 0.4 9.3 0 8.7 0Z"
          transform="translate(6.30005)"
          fill={color}
        />
        <path
          d="M14 15H1C0.4 15 0 14.6 0 14V1C0 0.4 0.4 0 1 0H5V2H2V13H13V10H15V14C15 14.6 14.6 15 14 15Z"
          transform="translate(0 1)"
          fill={color}
        />
      </svg>
    )
  }
}

ExternalLink.defaultProps = {
  color: 'currentColor',
  size: 16,
  block: false,
}

ExternalLink.propTypes = {
  color: PropTypes.string,
  size: PropTypes.number,
  block: PropTypes.bool,
}

export default ExternalLink
