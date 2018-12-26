import React from 'react'
import PropTypes from 'prop-types'
import Hoverable from './Hoverable'
import TheTooltip from './Tooltip'

function Tooltip({ hoverable, ...props }) {
  return hoverable ? <Hoverable {...props} /> : <TheTooltip {...props} />
}

Tooltip.defaultProps = {
  hoverable: true,
}

Tooltip.propTypes = {
  /** If is visible on hover */
  hoverable: PropTypes.bool,
  /** Text inside of the tooltip */
  label: PropTypes.node.isRequired,
  /** Content that the tooltip is aligned centered by */
  children: PropTypes.node.isRequired,
}

export default Tooltip
