import React, { forwardRef, ReactNode } from 'react'

import ButtonWithIcon from '../../ButtonWithIcon/index.js'
import { BUTTON } from '../constants'
const ICON_OPTICAL_COMPENSATION = { marginTop: 1.5 }

export type ButtonProps = {
  id?: string
  label?: string
  onClick?: Function
  isLoading?: boolean
  disabled?: boolean
  size?: Size
  icon?: any
  title?: string
  variation?: Variation
  isActiveOfGroup?: boolean
  children?: ReactNode
}

type Ref = HTMLDivElement

const Button = forwardRef<Ref, ButtonProps>(
  (
    {
      id,
      title,
      disabled,
      onClick,
      icon,
      isLoading,
      children,
      label,
      variation,
      isActiveOfGroup,
      size,
    },
    ref
  ) => {
    const isTertiary = variation === BUTTON.VARIATION.TERTIARY
    return (
      <div id={id} title={title} ref={ref} className="relative mh2">
        <ButtonWithIcon
          icon={
            <span
              className={`${isTertiary ? 'c-on-base mh2' : ''}`}
              style={ICON_OPTICAL_COMPENSATION}>
              {icon}
            </span>
          }
          isActiveOfGroup={isActiveOfGroup}
          disabled={disabled}
          isLoading={isLoading}
          variation={variation}
          size={size}
          onClick={onClick}>
          {label && (
            <span className={isTertiary ? 'c-on-base' : ''}>{label}</span>
          )}
        </ButtonWithIcon>
        {children}
      </div>
    )
  }
)

Button.defaultProps = {
  variation: BUTTON.VARIATION.TERTIARY,
  isActiveOfGroup: false,
  size: BUTTON.SIZE.SMALL,
}

export default Button
