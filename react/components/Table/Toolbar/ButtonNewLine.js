import React from 'react'
import PropTypes from 'prop-types'

import ActionMenu from '../../ActionMenu'
import ButtonGroup from '../../ButtonGroup'
import IconPlus from '../../icon/Plus'
import ButtonToolbar from './ButtonToolbar'
import { constants } from '../util'

const ButtonNewLine = ({ newLine, disabled }) => {
  const buttonProps = {
    disabled: disabled || newLine.disabled,
    isLoading: newLine.isLoading,
    variation: 'primary',
    size: 'small',
  }

  return newLine.actions ? (
    <ButtonGroup
      buttons={[
        <ButtonToolbar
          isActiveOfGroup
          key="new-line-button"
          icon={<IconPlus solid size={constants.LIGHT_ICON_SIZE} />}
          onClick={newLine.handleCallback}
          label={newLine.label}
          {...buttonProps}
        />,
        <ActionMenu
          isActiveOfGroup
          key="actions-button"
          buttonProps={buttonProps}
          options={newLine.actions}
        />,
      ]}
    />
  ) : (
    <ButtonToolbar
      icon={<IconPlus solid size={constants.LIGHT_ICON_SIZE} />}
      onClick={newLine.handleCallback}
      label={newLine.label}
      {...buttonProps}
    />
  )
}

ButtonNewLine.propTypes = {
  newLine: PropTypes.shape({
    label: PropTypes.string.isRequired,
    handleCallback: PropTypes.func.isRequired,
    disabled: PropTypes.bool,
    actions: PropTypes.arrayOf(
      PropTypes.shape({
        label: PropTypes.string,
        handleCallback: PropTypes.func,
        toggle: PropTypes.shape({
          checked: PropTypes.bool,
          semantic: PropTypes.bool,
        }),
      })
    ),
  }),
  disabled: PropTypes.bool,
}

export default ButtonNewLine
