import PropTypes from 'prop-types'
import React, { FC, cloneElement, Children } from 'react'

import TooltipPopup, { Position, Size } from './TooltipPopup'
import { useTooltip, Trigger } from './hooks'

const propTypes = {
  /** Label to be shown. As element, can be a string, number...*/
  label: PropTypes.node.isRequired,
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
}

type Props = PropTypes.InferProps<typeof propTypes>

const defaultProps: Props = {
  trigger: 'hover',
  position: 'top',
  size: 'small',
  delay: 0,
  duration: 200,
  timmingFn: 'ease-in-out',
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

Tooltip.propTypes = propTypes
Tooltip.defaultProps = defaultProps

export default Tooltip
