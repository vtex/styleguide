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
          <div
            key={index}
            className={`flex justify-between ph6 pv3 ${
              isKeySelected ? 'b--emphasis' : 'b--transparent'
            } pointer hover-bg-muted-5 bl bw1`}
            onClick={() => {
              setDensity(key)
              density.handleCallback && density.handleCallback(key)
            }}>
            <span className={`w-100 ${isKeySelected ? 'fw5' : ''}`}>
              {density[`${key}OptionLabel`]}
            </span>
          </div>
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
