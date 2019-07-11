import React from 'react'
import PropTypes from 'prop-types'

import ButtonWithIcon from '../ButtonWithIcon'

const ICON_OPTICAL_COMPENSATION = { marginTop: '1.5px' }

const ToolbarButton = React.forwardRef(
  ({ id, title, disabled, onClick, icon, isLoading, children, label }, ref) => (
    <div id={id} title={title} ref={ref} className="relative mh2">
      <ButtonWithIcon
        icon={
          <span className="c-on-base mh2" style={ICON_OPTICAL_COMPENSATION}>
            {icon}
          </span>
        }
        disabled={disabled}
        isLoading={isLoading}
        variation="tertiary"
        size="small"
        onClick={onClick}>
        {label && <span className="c-on-base">{label}</span>}
      </ButtonWithIcon>
      {children}
    </div>
  )
)

ToolbarButton.displayName = 'ToolbarButton'

ToolbarButton.propTypes = {
  id: PropTypes.string,
  children: PropTypes.any,
  label: PropTypes.string,
  onClick: PropTypes.func,
  isLoading: PropTypes.bool,
  disabled: PropTypes.bool,
  icon: PropTypes.element,
  title: PropTypes.string,
}

export default ToolbarButton
