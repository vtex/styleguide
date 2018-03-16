import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { Tooltip } from 'react-tippy'
import 'react-tippy/dist/tippy.css'

class ToolTip extends Component {
  render() {
    const { disabled, position, tabIndex, html, onRequestClose, onShow, onShown, onHide, onHidden } = this.props

    return (
      <Tooltip
        // available props to user
        disabled={disabled}
        html={html}
        position={position}
        tabIndex={tabIndex}

        // functions callbacks
        onRequestClose={onRequestClose}
        onShow={onShow}
        onShown={onShown}
        onHide={onHide}
        onHidden={onHidden}

        // VTEX fixed values
        interactiveBorder={2}
        interactive
        animation="fade"
        duration="200"
        arrow
        hideOnClick={false}
        size="big"
      >
        {this.props.children}
      </Tooltip>
    )
  }
}

ToolTip.defaultProps = {
  disabled: false,
  html: null,
  position: 'top',
  tabIndex: undefined,
}

ToolTip.propTypes = {
  children: PropTypes.node.isRequired,
  disabled: PropTypes.bool,
  /** Specifies which direction to position the tooltip on the element. Add the suffix -start or -end to shift the position. top-end is an example. */
  position: PropTypes.oneOf(['top', 'bottom', 'left', 'right']),
  /** Set tabIndex so element can receive focus */
  tabIndex: PropTypes.number,
  /** Tooltip content. If you don't define html, the title will be used*/
  html: PropTypes.element,
  /** This event is fired when you click outside of your tooltip, should be used with the prop interaction to keep your tooltip showing*/
  onRequestClose: PropTypes.func,
  /** Callback when the tooltip has been triggered and has started to transition in*/
  onShow: PropTypes.func,
  /** Callback when the tooltip has fully transitioned in and is showing*/
  onShown: PropTypes.func,
  /** Callback when the tooltip has begun to transition out*/
  onHide: PropTypes.func,
  /** Callback when the tooltip has fully transitioned out and is hidden*/
  onHidden: PropTypes.func,
}

export default ToolTip
