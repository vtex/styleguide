import classNames from 'classnames'
import PropTypes from 'prop-types'
import React, { FC, useEffect, useRef, useState } from 'react'

import Portal from './Portal'
import { useRect } from './hooks'
import zIndex from '../utils/zIndex'
import style from './tooltip.css'

export type Position = 'top' | 'right' | 'bottom' | 'left'
export type Size = 'mini' | 'small'

const OFFSET = 8
const hasComputedDimensions = rect => rect && rect.width && rect.height

function getChildRefPropType() {
  if (typeof HTMLElement !== 'undefined') {
    return PropTypes.shape({ current: PropTypes.instanceOf(HTMLElement) })
  }
  return PropTypes.shape({ current: PropTypes.elementType })
}

const propTypes = {
  /** Tooltip content */
  label: PropTypes.node.isRequired,
  /** Tooltip position */
  position: PropTypes.oneOf<Position>(['top', 'bottom', 'left', 'right']),
  /** Tooltip font size */
  size: PropTypes.oneOf<Size>(['mini', 'small']),
  /** Fallback position (when the tooltip cannot appear in the original position) */
  fallbackPosition: PropTypes.oneOf<Position>([
    'top',
    'bottom',
    'left',
    'right',
  ]),
  /** Boolean to see if the popup should appear */
  visible: PropTypes.bool,
  /** Delay to show the tooltip */
  delay: PropTypes.number,
  /** Tooltip animation duration */
  duration: PropTypes.number,
  /** Tooltip timming function used to animate the tooltip */
  timmingFn: PropTypes.string,
  /** Child ref. Used to correctly position the tooltip */
  childRef: getChildRefPropType(),
}

const defaultProps = {
  visible: false,
}

const TooltipPopup: FC<PropTypes.InferProps<typeof propTypes>> = ({
  position,
  size,
  fallbackPosition,
  label,
  visible,
  delay,
  duration,
  timmingFn,
  childRef,
}) => {
  const [showPopup, setShowPopup] = useState(visible)
  const popupRef = useRef<HTMLDivElement>()
  const childRect = useRect(childRef, visible)
  const popupRect = useRect(popupRef, visible)

  useEffect(() => {
    if (visible) {
      setShowPopup(true)
    }
  }, [visible])

  const popupClasses = classNames(
    'absolute pv3 ph4 bg-base--inverted c-on-base--inverted br2 shadow-4 mw5 overflow-hidden',
    style.popup,
    {
      dn: !visible || !showPopup || !childRect || !popupRect,
      'o-0': !visible || !hasComputedDimensions(popupRect),
      'o-100': visible && hasComputedDimensions(popupRect),
      't-mini': size === 'mini',
      't-small': size === 'small',
    }
  )

  const positionStyle = getStyles(
    childRect,
    popupRect,
    position,
    fallbackPosition
  )

  return (
    <Portal>
      <div
        role="tooltip"
        className={popupClasses}
        style={{
          ...positionStyle,
          zIndex: zIndex.tooltip,
          transition: `opacity ${duration}ms ${timmingFn} ${delay}ms`,
        }}
        ref={popupRef}
        onTransitionEnd={() => setShowPopup(visible)}>
        {label}
      </div>
    </Portal>
  )
}

const getStyles = (childRect, popupRect, position, fallbackPosition) => {
  return childRect && popupRect && window && hasComputedDimensions(popupRect)
    ? getPopupPosition(childRect, popupRect, position, fallbackPosition)
    : { top: 0, left: 0 }
}

const FALLBACK_POSITION = {
  top: 'right',
  right: 'bottom',
  bottom: 'left',
  left: 'top',
}

const getFallbackPosition = (position, fallback) =>
  fallback || FALLBACK_POSITION[position]

const getPopupPosition = (childRect, popupRect, position, fallbackPosition) =>
  getPopupPositionRecursively(
    childRect,
    popupRect,
    position,
    fallbackPosition,
    position
  )
const getPopupPositionRecursively = (
  childRect,
  popupRect,
  position,
  fallbackPosition,
  originalPosition
) => {
  const horizontalMax = window.innerWidth + window.pageXOffset
  const verticalMax = window.innerHeight + window.pageYOffset
  const styles = {
    left:
      childRect.left +
      window.pageXOffset +
      (childRect.width - popupRect.width) / 2 +
      (position === 'right'
        ? (childRect.width + popupRect.width) / 2 + OFFSET
        : 0) -
      (position === 'left'
        ? (childRect.width + popupRect.width) / 2 + OFFSET
        : 0),
    top:
      childRect.top +
      window.pageYOffset -
      (position === 'top' ? popupRect.height + OFFSET : 0) +
      (position === 'bottom' ? childRect.height + OFFSET : 0) +
      (position === 'right' || position === 'left'
        ? (childRect.height - popupRect.height) / 2
        : 0),
  }

  const collisions = {
    top: styles.top < window.pageYOffset,
    right: styles.left + popupRect.width > horizontalMax,
    bottom: styles.top + popupRect.height > verticalMax,
    left: styles.left < window.pageXOffset,
  }

  if (collisions[position]) {
    fallbackPosition = getFallbackPosition(position, fallbackPosition)
    // If there is no place without collisions, it will not be shown
    return fallbackPosition === originalPosition
      ? null
      : getPopupPositionRecursively(
          childRect,
          popupRect,
          fallbackPosition,
          null,
          originalPosition
        )
  }

  const top = Math.max(
    window.pageYOffset + 1,
    Math.min(styles.top, verticalMax - popupRect.height - 1)
  )
  const left = Math.max(
    window.pageXOffset + 1,
    Math.min(styles.left, horizontalMax - popupRect.width - 1)
  )

  const transform = `translate3d(${Math.round(left)}px, ${Math.round(
    top - document.body.offsetHeight
  )}px, 0)`

  return {
    transform,
    WebkitTransform: transform,
  }
}

TooltipPopup.propTypes = propTypes
TooltipPopup.defaultProps = defaultProps

export default TooltipPopup
