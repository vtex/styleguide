import React, { forwardRef, ReactNode } from 'react'
import classNames from 'classnames'

import ButtonWithIcon from '../../ButtonWithIcon/index.js'
import { E2ETestable } from '../types'

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
      testId,
    },
    ref
  ) => {
    const isTertiary = variation === ButtonVariation.Tertiary

    const iconClass = classNames('mh2', {
      'c-on-base': isTertiary && !disabled,
      'c-muted-2': disabled,
    })

    const labelClass = classNames({
      'c-on-base': isTertiary && !disabled,
      'c-muted-2': disabled,
    })

    return (
      <div
        id={`${id}__container`}
        data-testid={`${testId}__container`}
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

export type ButtonProps = E2ETestable & {
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
}

Button.defaultProps = {
  variation: ButtonVariation.Tertiary,
  isActiveOfGroup: false,
  isGrouped: false,
  isFirstOfGroup: false,
  size: ButtonSize.Small,
}

export default Button
