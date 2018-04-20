import React, { Component } from 'react'
import PropTypes from 'prop-types'

import ReactTooltip from 'react-tooltip'

class Tooltip extends Component {
  render() {
    const { id, position, children } = this.props

    return (
      <ReactTooltip id={id} place={position} className="mw5" effect="solid">
        {children}
      </ReactTooltip>
    )
  }
}

Tooltip.defaultProps = {
  position: 'top',
}

Tooltip.propTypes = {
  id: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  position: PropTypes.oneOf(['top', 'right', 'bottom', 'left']),
}

export default Tooltip
