import React, { forwardRef, ReactNode } from 'react'
import csx from 'classnames'

import ButtonWithIcon from '../../ButtonWithIcon/index.js'
const ICON_OPTICAL_COMPENSATION = { marginTop: 1.5 }

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
      isGrouped,
      isFirstOfGroup,
      size,
    },
    ref
  ) => {
    const isTertiary = variation === ButtonVariation.Tertiary
    return (
      <div
        id={id}
        title={title}
        ref={ref}
        className={csx('relative', { mh2: isTertiary })}>
        <ButtonWithIcon
          icon={
            <span
              className={`${isTertiary ? 'c-on-base mh2' : ''}`}
              style={ICON_OPTICAL_COMPENSATION}>
              {icon}
            </span>
          }
          isGrouped={isGrouped}
          isFirstOfGroup={isFirstOfGroup}
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

export enum ButtonVariation {
  Primary = 'primary',
  Secondary = 'secondary',
  Tertiary = 'tertiary',
}

export enum ButtonSize {
  Small = 'small',
  Regular = 'regular',
  Large = 'large',
}

export enum IconSize {
  Heavy = 13,
  Medium = 14,
  Light = 16,
}

export type ButtonProps = {
  id?: string
  label?: string
  onClick?: Function
  isLoading?: boolean
  disabled?: boolean
  size?: ButtonSize
  icon?: any
  title?: string
  variation?: ButtonVariation
  isActiveOfGroup?: boolean
  isGrouped?: boolean
  isFirstOfGroup?: boolean
  children?: ReactNode
}

Button.defaultProps = {
  variation: ButtonVariation.Tertiary,
  isActiveOfGroup: false,
  isGrouped: false,
  isFirstOfGroup: false,
  size: ButtonSize.Small,
}

export default Button
