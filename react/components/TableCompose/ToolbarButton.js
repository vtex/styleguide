import React, { forwardRef } from 'react'
import PropTypes from 'prop-types'

import ButtonWithIcon from '../ButtonWithIcon'

const ICON_OPTICAL_COMPENSATION = { marginTop: '1.5px' }

const ToolbarButton = forwardRef(
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

ToolbarButton.displayName = 'ToolbarButton'

ToolbarButton.defaultProps = {
  variation: 'tertiary',
  isActiveOfGroup: false,
}

ToolbarButton.propTypes = {
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

export default ToolbarButton
