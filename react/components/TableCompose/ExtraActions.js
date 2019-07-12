import React from 'react'
import PropTypes from 'prop-types'

import ActionMenu from '../ActionMenu'
import IconOptionsDots from '../icon/OptionsDots'

const ExtraActions = ({ extraActions }) => {
  return (
    <div title={extraActions.label} className="mh2">
      <ActionMenu
        hideCaretIcon
        buttonProps={{
          variation: 'tertiary',
          icon: (
            <span className="c-on-base">
              <IconOptionsDots />
            </span>
          ),
          size: 'small',
        }}
        options={extraActions.actions.map(action => {
          return {
            label: action.label,
            onClick: action.handleCallback,
          }
        })}
      />
    </div>
  )
}

ExtraActions.propTypes = {
  extraActions: PropTypes.shape({
    label: PropTypes.string,
    actions: PropTypes.arrayOf(
      PropTypes.shape({
        label: PropTypes.string,
        handleCallback: PropTypes.func,
      })
    ),
    alignMenu: PropTypes.oneOf(['right', 'left']),
    isLoading: PropTypes.bool,
  }),
}

export default ExtraActions
