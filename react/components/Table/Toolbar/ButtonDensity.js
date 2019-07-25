import React from 'react'
import PropTypes from 'prop-types'

import IconDensity from '../../icon/Density'
import { constants } from '../util'

import useTableContext from '../hooks/useTableContext'
import Menu from './Menu'

const BOX_HEIGHT =
  constants.DENSITY_OPTIONS.length * constants.FIELDS_BOX_ITEM_HEIGHT

const ButtonDensity = ({ density, disabled }) => {
  const { state, setDensity } = useTableContext()

  return (
    <Menu
      button={{
        id: 'toggleDensity',
        title: density.buttonLabel,
        icon: <IconDensity size={constants.MEDIUM_ICON_SIZE} />,
        disabled: disabled,
      }}
      box={{ height: BOX_HEIGHT, alignMenu: density.alignMenu }}>
      {constants.DENSITY_OPTIONS.map((key, index) => {
        const isKeySelected = state.selectedDensity === key
        return (
          <Menu.Item
            key={index}
            isSelected={isKeySelected}
            handleCallBack={() => {
              setDensity(key)
              density.handleCallback && density.handleCallback(key)
            }}
            closeMenuOnClick>
            {density[`${key}OptionLabel`]}
          </Menu.Item>
        )
      })}
    </Menu>
  )
}

ButtonDensity.propTypes = {
  density: PropTypes.shape({
    buttonLabel: PropTypes.string,
    lowOptionLabel: PropTypes.string,
    mediumOptionLabel: PropTypes.string,
    highOptionLabel: PropTypes.string,
    handleCallback: PropTypes.func,
    alignMenu: PropTypes.oneOf(['right', 'left']),
  }),
  disabled: PropTypes.bool,
}

export default ButtonDensity
