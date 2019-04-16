/* eslint-disable camelcase */
import React from 'react'
import PropTypes from 'prop-types'

import ActionMenu from '../ActionMenu'
import ButtonWithIcon from '../ButtonWithIcon'

/**
 * @visibleName ButtonWithAction
 */
function EXPERIMENTAL_ButtonWithAction(props) {
  console.warn(
    `Experimental component warning:

      ButtonWithAction is in an experimental state.
      This component may suffer breaking changes in a near future, even in minor or patch versions.
      It may even cease to exist without further notice 👻`
  )

  const { actions, ...buttonProps } = props
  /* eslint-disable-next-line no-unused-vars */
  const { icon: _, ...actionMenuButtonProps } = buttonProps
  return (
    <div className="flex">
      <ButtonWithIcon {...buttonProps} groupRight />
      <ActionMenu
        buttonProps={actionMenuButtonProps}
        options={actions}
        groupLeft
      />
    </div>
  )
}

EXPERIMENTAL_ButtonWithAction.propTypes = {
  actions: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      handleCallback: PropTypes.func,
      toggle: PropTypes.shape({
        checked: PropTypes.bool,
        semantic: PropTypes.bool,
      }),
    })
  ).isRequired,
}

export default EXPERIMENTAL_ButtonWithAction
