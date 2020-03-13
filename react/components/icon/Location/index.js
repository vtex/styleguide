import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

import { Svg } from '../IconBase'
import { calcIconSize } from '../utils'

const iconBase = {
  width: 16,
  height: 16,
}

const VARIATIONS = {
  SOLID:
    'M15.3 4L1.30001 3.72529e-09C0.500006 -0.2 -0.199994 0.5 5.72577e-06 1.3L4.00001 15.3C4.30001 16.2 5.50001 16.3 5.90001 15.4L8.70001 8.8L15.3 6C16.3 5.5 16.2 4.3 15.3 4Z',
  OUTLINE:
    'M4.00001 15.3L5.72577e-06 1.3C-0.199994 0.5 0.500006 -0.2 1.30001 3.72529e-09L15.3 4C16.2 4.3 16.3 5.5 15.4 5.9L8.80001 8.8L6.00001 15.4C5.50001 16.3 4.30001 16.2 4.00001 15.3ZM2.50001 2.5L5.20001 12L7.10001 7.6C7.20001 7.4 7.40001 7.2 7.60001 7.1L12 5.2L2.50001 2.5Z',
}

class Location extends PureComponent {
  render() {
    const { color, size, solid, block } = this.props
    const newSize = calcIconSize(iconBase, size)

    return (
      <Svg
        name="location"
        variation={solid ? 'solid' : null}
        size={newSize}
        block={block}
      >
        <path d={solid ? VARIATIONS.SOLID : VARIATIONS.OUTLINE} fill={color} />
      </Svg>
    )
  }
}

Location.defaultProps = {
  color: 'currentColor',
  size: 16,
  solid: false,
  block: false,
}

Location.propTypes = {
  color: PropTypes.string,
  size: PropTypes.number,
  solid: PropTypes.bool,
  block: PropTypes.bool,
}

export default Location
