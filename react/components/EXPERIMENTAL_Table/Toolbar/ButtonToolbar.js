import React, { forwardRef } from 'react'
import PropTypes from 'prop-types'

import ButtonWithIcon from '../../ButtonWithIcon'

const ICON_OPTICAL_COMPENSATION = { marginTop: 1.5 }

const ButtonToolbar = forwardRef(
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

ButtonToolbar.displayName = 'ButtonToolbar'
ButtonToolbar.name = 'ButtonToolbar'

ButtonToolbar.defaultProps = {
  variation: 'tertiary',
  isActiveOfGroup: false,
}

ButtonToolbar.propTypes = {
  id: PropTypes.string,
  children: PropTypes.any,
  label: PropTypes.string,
  onClick: PropTypes.func,
  isLoading: PropTypes.bool,
  disabled: PropTypes.bool,
  icon: PropTypes.element,
  title: PropTypes.string,
  variation: PropTypes.oneOf(['primary', 'tertiary']),
  isActiveOfGroup: PropTypes.bool,
}

export default ButtonToolbar
