import React, { FC } from 'react'

import IconDensity from '../../icon/Density/index.js'
import {
  DENSITY_OPTIONS,
  FIELDS_BOX_ITEM_HEIGHT,
  ICON_SIZE,
  NAMESPACES,
} from '../constants'
import useTableContext from '../hooks/useTableContext'
import Menu from './Menu/index'

const BOX_HEIGHT = DENSITY_OPTIONS.length * FIELDS_BOX_ITEM_HEIGHT

export type ButtonDensityProps = {
  label: string
  lowOptionLabel: string
  mediumOptionLabel: string
  highOptionLabel: string
  handleCallback: Function
  alignMenu: Alignment
  disabled: boolean
}

const ButtonDensity: FC<ButtonDensityProps> = ({
  label,
  handleCallback,
  disabled,
  alignMenu,
  ...options
}) => {
  const { selectedDensity, setSelectedDensity } = useTableContext()
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

export default ButtonDensity
