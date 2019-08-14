import React, { FC } from 'react'

import IconDensity from '../../icon/Density/index.js'
import constants from '../constants'
import useTableContext from '../hooks/useTableContext'
import Menu from './Menu/index'

const BOX_HEIGHT =
  constants.DENSITY_OPTIONS.length * constants.FIELDS_BOX_ITEM_HEIGHT

type DensityProps = {
  label: string
  lowOptionLabel: string
  mediumOptionLabel: string
  highOptionLabel: string
  handleCallback: Function
  alignMenu: 'right' | 'left'
  disabled: boolean
}

const ButtonDensity: FC<DensityProps> = ({
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
        id: 'toggleDensity',
        title: label,
        icon: <IconDensity size={constants.MEDIUM_ICON_SIZE} />,
        disabled,
      }}
      box={{ height: BOX_HEIGHT, alignMenu }}>
      {constants.DENSITY_OPTIONS.map((key: Density, index) => {
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
