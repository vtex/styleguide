import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { Tooltip } from 'react-tippy'
import 'react-tippy/dist/tippy.css'
import './index.css'

class ToolTip extends Component {
  render() {
    return (
      <Tooltip {...this.props}>
        {this.props.children}
      </Tooltip>
    )
  }
}

ToolTip.defaultProps = {
  disabled: false,
  open: undefined,
  useContext: undefined,
  position: 'top',
  trigger: 'mouseenter focus',
  tabIndex: undefined,
  interactive: false,
  interactiveBorder: 2,
  delay: 0,
  hideDelay: 0,
  animation: 'shift',
  arrow: false,
  arrowSize: 'regular',
  animateFill: true,
  duration: 375,
  distance: 10,
  offset: 0,
  hideOnClick: true,

  multiple: false,
  followCursor: false,
  inertia: false,
  transitionFlip: false,
  html: null,
  unmountHTMLWhenHide: false,
  size: 'regular',
  sticky: false,
  stickyDuration: 200,
  touchHold: false,
  className: '',
}

ToolTip.propTypes = {
  children: PropTypes.node.isRequired,
  /** Show or not show tooltip */
  disabled: PropTypes.bool,
  /**	Just only use it if you want to show/hide it manually. */
  open: PropTypes.bool,
  /** Define that you're using context in your tooltip content (or html props). It's useful when you want your tooltip content can connect to redux store */
  useContext: PropTypes.bool,
  /** This event is fired when you click outside of your tooltip, should be used with the prop interaction to keep your tooltip showing*/
  onRequestClose:	PropTypes.func,
  /** Specifies which direction to position the tooltip on the element. Add the suffix -start or -end to shift the position. top-end is an example. */
  position: PropTypes.oneOf(['top', 'bottom', 'left', 'right']),
  /** Specifies which type of events will trigger a tooltip to show. Separate each by a space. mouseenter is for hovering and touch on mobile, and focus is for keyboard navigation. Use manual if you want to show/hide the tooltip manually/programmatically (see below). */
  trigger: PropTypes.oneOf(['mouseenter', 'focus', 'click', 'manual']),
  /** Set tabIndex so element can receive focus */
  tabIndex: PropTypes.number,
  /** Makes a tooltip interactive, i.e. will not close when the user hovers over or clicks on the tooltip. This lets you create a popover (similar to Bootstrap) when used in conjunction with a click trigger.*/
  interactive: PropTypes.bool,
  /** Specifies the size of the invisible border around an interactive tooltip that will prevent it from closing. Only applies to mouseenter triggered tooltips.*/
  interactiveBorder: PropTypes.number,
  /** Specifies how long it takes after a trigger event is fired for a tooltip to show. */
  delay: PropTypes.number,
  /** Specifies how long it takes after a leave event is fired for a tooltip to hide. Not applicable when clicking on the document to hide tooltips. */
  hideDelay: PropTypes.number,
  /** Specifies the type of transition animation a tooltip has.*/
  animation: PropTypes.oneOf(['shift', 'perspective', 'fade', 'scale', 'none']),
  /** Adds an arrow pointing to the tooltipped element. Setting this to true disables animateFill.*/
  arrow: PropTypes.bool,
  /** Specifies how big the tooltip's arrow is.*/
  arrowSize: PropTypes.oneOf(['small', 'regular', 'big']),
  /** Adds a material design-esque filling animation. This is disabled if you have arrow set to true.*/
  animateFill: PropTypes.bool,
  /** Specifies how long the transition animation takes to complete when showing a tooltip.*/
  duration: PropTypes.number,
  /** Specifies how far away the tooltip is from its element. */
  distance: PropTypes.number,
  /** Offsets the tooltip on its opposite axis. For position top and bottom, it acts as offsetX. For position left and right, it acts as offsetY. */
  offset: PropTypes.number,
  /** Specifies whether to hide a tooltip upon clicking its element after hovering over. */
  hideOnClick: PropTypes.bool,
  /** Specifies whether to allow multiple tooltips open on the page (click trigger only). */
  multiple: PropTypes.bool,
  /** Specifies whether to follow the user's mouse cursor (mouse devices only).*/
  followCursor: PropTypes.bool,
  /** Modifies the transition-timing-function with a cubic bezier to create a "slingshot" intertial effect.*/
  inertia: PropTypes.bool,
  /** Specifies whether to transition between flips or not. Uses the same transition timing as duration*/
  transitionFlip: PropTypes.bool,
  /** Tooltip content. If you don't define html, the title will be used*/
  html: PropTypes.element,
  /** By default, html component will be mounted at first show and unmount only when your tooltip component is unmounted. When you set unmountHTMLWhenHide is true, it will be unmounted whenever tooltip is hidden.*/
  unmountHTMLWhenHide: PropTypes.bool,
  /** Specifies how big the tooltip is.*/
  size: PropTypes.oneOf(['small', 'regular', 'big']),
  /** Specifies whether the tooltip should stick to its element reference when it's showing (for example, if the element is animated/moves).*/
  sticky: PropTypes.bool,
  /** Specifies the 'smoothing' transition when the popper's position updates as its element moves.*/
  stickyDuration: PropTypes.number,
  /** Changes the trigger behavior on touch devices. It will change it from a tap to show and tap off to hide, to a tap and hold to show, and a release to hide.*/
  touchHold: PropTypes.bool,
  /** Callback when the tooltip has been triggered and has started to transition in*/
  onShow: PropTypes.func,
  /** Callback when the tooltip has fully transitioned in and is showing*/
  onShown: PropTypes.func,
  /** Callback when the tooltip has begun to transition out*/
  onHide: PropTypes.func,
  /** Callback when the tooltip has fully transitioned out and is hidden*/
  onHidden: PropTypes.func,
  /** className of container*/
  className: PropTypes.string,
}

export default ToolTip
