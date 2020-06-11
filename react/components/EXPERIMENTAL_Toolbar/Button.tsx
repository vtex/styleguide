import React, { forwardRef, ReactNode, Ref } from 'react'
import classNames from 'classnames'

import ButtonWithIcon from '../ButtonWithIcon'

const ICON_OPTICAL_COMPENSATION = { marginTop: 1.5 }

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

export interface ButtonProps {
  id?: string
  label?: string
  onClick?: Function
  isLoading?: boolean
  disabled?: boolean
  size?: ButtonSize
  icon?: unknown
  title?: string
  variation?: ButtonVariation
  isActiveOfGroup?: boolean
  isGrouped?: boolean
  isFirstOfGroup?: boolean
  children?: ReactNode
  testId?: string
}

function Button(
  {
    title,
    disabled,
    onClick,
    icon,
    isLoading,
    children,
    label,
    variation = ButtonVariation.Tertiary,
    isActiveOfGroup = false,
    isGrouped = false,
    isFirstOfGroup = false,
    size = ButtonSize.Small,
    testId,
  }: ButtonProps,
  ref: Ref<HTMLDivElement>
) {
  const isTertiary = variation === ButtonVariation.Tertiary

  const iconClass = classNames('mh1', {
    'c-on-base': isTertiary && !disabled,
    'c-muted-2': disabled,
  })

  const labelClass = classNames({
    'c-on-base': isTertiary && !disabled,
    'c-muted-2': disabled,
  })

  return (
    <div
      data-testid={testId}
      title={title}
      ref={ref}
      className={classNames('relative', { mh2: isTertiary })}>
      <ButtonWithIcon
        icon={
          <span className={iconClass} style={ICON_OPTICAL_COMPENSATION}>
            {icon}
          </span>
        }
        testId={testId}
        isGrouped={isGrouped}
        isFirstOfGroup={isFirstOfGroup}
        isActiveOfGroup={isActiveOfGroup}
        disabled={disabled}
        isLoading={isLoading}
        variation={variation}
        size={size}
        onClick={onClick}>
        {label && <span className={labelClass}>{label}</span>}
      </ButtonWithIcon>

      {children}
    </div>
  )
}

export default forwardRef(Button)
