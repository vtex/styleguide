import React, { forwardRef, ReactNode } from 'react'

import ButtonWithIcon from '../../ButtonWithIcon/index.js'
const ICON_OPTICAL_COMPENSATION = { marginTop: 1.5 }

export type ButtonProps = {
  id?: string
  label?: string
  onClick?: Function
  isLoading?: boolean
  disabled?: boolean
  icon?: any
  title?: string
  variation?: 'primary' | 'secondary' | 'tertiary'
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
    },
    ref
  ) => (
    <div id={id} title={title} ref={ref} className="relative mh2">
      <ButtonWithIcon
        icon={
          <span
            className={`${variation === 'tertiary' ? 'c-on-base mh2' : ''}`}
            style={ICON_OPTICAL_COMPENSATION}>
            {icon}
          </span>
        }
        isActiveOfGroup={isActiveOfGroup}
        disabled={disabled}
        isLoading={isLoading}
        variation={variation}
        size="small"
        onClick={onClick}>
        {label && (
          <span className={variation === 'tertiary' ? 'c-on-base' : ''}>
            {label}
          </span>
        )}
      </ButtonWithIcon>
      {children}
    </div>
  )
)

Button.defaultProps = {
  variation: 'tertiary',
  isActiveOfGroup: false,
}

export default Button
