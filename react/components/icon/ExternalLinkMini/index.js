import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { calcIconSize, baseClassname } from '../utils'

const iconBase = {
  width: 14,
  height: 14,
}

class ExternalLinkMini extends PureComponent {
  render() {
    const { color, size, block } = this.props
    const newSize = calcIconSize(iconBase, size)

    return (
      <svg
        className={`${baseClassname('external-link-mini')} ${block ? 'db' : ''}`}
        width={newSize.width}
        height={newSize.height}
        viewBox="0 0 14 14"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M12.5567 0H2.45361V2.8866H9.09278L0 11.9794L2.02062 14L11.1134 4.90722V11.5464H14V1.4433C14 0.57732 13.4227 0 12.5567 0Z"
          fill={color}
        />
      </svg>
    )
  }
}

ExternalLinkMini.defaultProps = {
  color: 'currentColor',
  size: 16,
  block: false,
}

ExternalLinkMini.propTypes = {
  color: PropTypes.string,
  size: PropTypes.number,
  block: PropTypes.bool,
}

export default ExternalLinkMini
