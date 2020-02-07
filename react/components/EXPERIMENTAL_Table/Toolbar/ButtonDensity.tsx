import React, { FC } from 'react'

import IconDensity from '../../icon/Density/index.js'
import { NAMESPACES } from '../constants'
import Button, { IconSize } from './Button'
import usePopoverMenu, { Box, Item, Alignment } from './PopoverMenu'
import useTableMeasures, {
  Density,
  DENSITY_OPTIONS,
} from '../hooks/useTableMeasures'
import { useButtonGroupContext } from './context'

const FIELDS_ITEM_HEIGHT = 36
const BOX_HEIGHT = DENSITY_OPTIONS.length * FIELDS_ITEM_HEIGHT

const ButtonDensity: FC<ButtonDensityProps> = ({
  label,
  handleCallback,
  disabled,
  alignMenu,
  density,
  ...options
}) => {
  const { currentDensity, setCurrentDensity } = density
  const { buttonRef, toggleBox, setBoxVisible, boxVisible } = usePopoverMenu()
  const { testId } = useButtonGroupContext()
  const densityTestId = `${testId}__density`

  return (
    <Button
      id={NAMESPACES.TOOLBAR.BUTTON_DENSITY}
      testId={densityTestId}
      title={label}
      ref={buttonRef}
      onClick={toggleBox}
      icon={<IconDensity size={IconSize.Medium} />}
      disabled={disabled}>
      {boxVisible && (
        <Box testId={densityTestId} height={BOX_HEIGHT} alignMenu={alignMenu}>
          {DENSITY_OPTIONS.map((key: Density, index) => {
            const isKeySelected = currentDensity === key
            return (
              <Item
                key={index}
                isSelected={isKeySelected}
                onClick={() => {
                  setCurrentDensity(key)
                  setBoxVisible(false)
                  handleCallback && handleCallback(key)
                }}>
                {options[`${key}Label`]}
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
  compactLabel: string
  regularLabel: string
  comfortableLabel: string
  handleCallback: Function
  alignMenu: Alignment
  disabled: boolean
}

export default ButtonDensity
