import React, { FC, useRef } from 'react'

import IconDensity from '../../icon/Density/index.js'
import {
  DENSITY_OPTIONS,
  FIELDS_BOX_ITEM_HEIGHT,
  ICON_SIZE,
  NAMESPACES,
} from '../constants'
import Button from './Button'
import usePopoverMenu, { Box, Item } from './PopoverMenu'
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
  const { buttonRef, toggleBox, setBoxVisible, isBoxVisible } = usePopoverMenu()
  return (
    <Button
      id={NAMESPACES.TOOLBAR.BUTTON_DENSITY}
      title={label}
      ref={buttonRef}
      onClick={toggleBox}
      icon={<IconDensity size={ICON_SIZE.MEDIUM} />}
      disabled={disabled}>
      {isBoxVisible && (
        <Box height={BOX_HEIGHT} alignMenu={alignMenu}>
          {DENSITY_OPTIONS.map((key: Density, index) => {
            const isKeySelected = selectedDensity === key
            return (
              <Item
                key={index}
                isSelected={isKeySelected}
                onClick={() => {
                  setSelectedDensity(key)
                  setBoxVisible(false)
                  handleCallback && handleCallback(key)
                }}>
                {options[`${key}OptionLabel`]}
              </Item>
            )
          })}
        </Box>
      )}
    </Button>
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
