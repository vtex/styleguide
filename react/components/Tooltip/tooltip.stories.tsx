import React from 'react'

import Tooltip from '.'

export default {
  title: 'Tooltip',
  component: Tooltip,
}

export const tooltipTop = () => (
  <Tooltip label="tooltip text">
    <span>oi</span>
  </Tooltip>
)
