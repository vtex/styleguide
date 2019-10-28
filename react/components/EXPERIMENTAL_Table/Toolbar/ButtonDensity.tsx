import React, { FC } from 'react'

import IconDensity from '../../icon/Density/index.js'
import {
  DENSITY_OPTIONS,
  FIELDS_BOX_ITEM_HEIGHT,
  ICON_SIZE,
  NAMESPACES,
} from '../constants'
import Menu from './PopoverMenu'
import useTableMeasures, { Density } from '../stateContainers/measures'

const BOX_HEIGHT = DENSITY_OPTIONS.length * FIELDS_BOX_ITEM_HEIGHT

const ButtonDensity: FC<ButtonDensityProps> = ({
  label,
  handleCallback,
  disabled,
  alignMenu,
  density,
  ...options
}) => {
  const { selectedDensity, setSelectedDensity } = density
  return (
    <Menu
      button={{
        id: NAMESPACES.TOOLBAR.BUTTON_DENSITY,
        title: label,
        icon: <IconDensity size={ICON_SIZE.MEDIUM} />,
        disabled,
      }}
      box={{ height: BOX_HEIGHT, alignMenu }}>
      {DENSITY_OPTIONS.map((key: Density, index) => {
        const isKeySelected = selectedDensity === key
        return (
          <Menu.Item
            key={index}
            isSelected={isKeySelected}
            handleCallback={() => {
              setSelectedDensity(key)
              handleCallback && handleCallback(key)
            }}
            closeMenuOnClick>
            {options[`${key}OptionLabel`]}
          </Menu.Item>
        )
      })}
    </Menu>
  )
}

export type ButtonDensityProps = {
  density: ReturnType<typeof useTableMeasures>
  label: string
  lowOptionLabel: string
  mediumOptionLabel: string
  highOptionLabel: string
  handleCallback: Function
  alignMenu: Alignment
  disabled: boolean
}

export default ButtonDensity
