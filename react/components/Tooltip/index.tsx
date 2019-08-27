import classNames from 'classnames'
import PropTypes from 'prop-types'
import { get } from 'lodash'
import React, {
  FC,
  cloneElement,
  Children,
  useRef,
  useEffect,
  useState,
} from 'react'

import TooltipPopup, { Position } from './TooltipPopup'
import { useTooltip, Trigger } from './hooks'


const propTypes = {
  label: PropTypes.string.isRequired,
  position: PropTypes.oneOf<Position>(['top', 'right', 'bottom', 'left']),
  fallbackPosition: PropTypes.oneOf<Position>(['top', 'right', 'bottom', 'left']),
  trigger: PropTypes.oneOf<Trigger>(['click', 'hover', 'focus']),
  children: PropTypes.element.isRequired,
}

const defaultProps: { trigger: Trigger; position: Position } = {
  trigger: 'hover',
  position: 'top',
}

const Tooltip: FC<PropTypes.InferProps<typeof propTypes>> = ({
  trigger,
  label,
  position,
  fallbackPosition,
  children,
}) => {
  const [handleTooltip, tooltip] = useTooltip({ trigger })
  const child = Children.only(children)
  return (
    <>
      <TooltipPopup
        {...tooltip}
        fallbackPosition={fallbackPosition}
        position={position}
        label={label}
      />
      {cloneElement(child, handleTooltip(child))}
    </>
  )
}

Tooltip.propTypes = propTypes
Tooltip.defaultProps = defaultProps

export default Tooltip
