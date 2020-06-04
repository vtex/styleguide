import PropTypes from 'prop-types'
import React, { FC, cloneElement, Children, ReactElement } from 'react'

import TooltipPopup, { Position, Size } from './TooltipPopup'
import { useTooltip, Trigger } from './hooks'

interface Props {
  children: ReactElement
  label: ReactElement | string
  position?: Position
  size?: Size
  fallbackPosition?: Position
  trigger?: Trigger
  delay?: number
  duration?: number
  timmingFn?: string
  wordBreak?: 'normal' | 'break-all' | 'keep-all' | 'break-word'
}

const Tooltip: FC<Props> = ({ trigger, children, ...popupProps }) => {
  const [handleTooltip, tooltip] = useTooltip({ trigger })
  const child = Children.only(children)
  return (
    <>
      <TooltipPopup {...tooltip} {...popupProps} />
      {cloneElement(child, handleTooltip(child))}
    </>
  )
}

Tooltip.propTypes = {
  /** Label to be shown. As element, can be a string, number... */
  label: PropTypes.element.isRequired,
  /** Tooltip position */
  position: PropTypes.oneOf<Position>(['top', 'right', 'bottom', 'left']),
  /** Tooltip font size */
  size: PropTypes.oneOf<Size>(['mini', 'small']),
  /** Fallback position. Used when the tooltip cannot be shown in the original position */
  fallbackPosition: PropTypes.oneOf<Position>([
    'top',
    'right',
    'bottom',
    'left',
  ]),
  /** Event to trigger the tooltip */
  trigger: PropTypes.oneOf<Trigger>(['click', 'hover', 'focus']),
  /** Element that will trigger the event */
  children: PropTypes.element.isRequired,
  /** Delay to show and hide the tooltip (ms) */
  delay: PropTypes.number,
  /** Tooltip animation duration (ms) */
  duration: PropTypes.number,
  /** Tooltip timming function used to animate the tooltip */
  timmingFn: PropTypes.string,
  /** Element that inserts line break style in the word. Used to prevent width overflow */
  wordBreak: PropTypes.oneOf(['normal', 'break-all', 'keep-all', 'break-word']),
}

Tooltip.defaultProps = {
  trigger: 'hover',
  position: 'top',
  size: 'small',
  delay: 0,
  duration: 200,
  timmingFn: 'ease-in-out',
  wordBreak: 'normal',
}

export default Tooltip
