import React from 'react'

import IconDensity from '../icon/Density'
import Box, { usePopoverMenu, Alignment } from './PopoverMenu'
import Button, { IconSize } from './Button'

const FIELDS_ITEM_HEIGHT = 36

export enum Density {
  Compact = 'compact',
  Regular = 'regular',
  Comfortable = 'comfortable',
}

interface Props {
  density: string
  setDensity: React.Dispatch<React.SetStateAction<string>>
  densityOptions?: string[]
  label?: string
  compactLabel?: string
  regularLabel?: string
  comfortableLabel?: string
  handleCallback?: Function
  alignMenu?: Alignment
  disabled?: boolean
  testId?: string
}

function ButtonDensity({
  label,
  handleCallback,
  disabled,
  alignMenu,
  densityOptions = ['compact', 'regular', 'comfortable'],
  density,
  setDensity,
  testId,
  ...options
}: Props) {
  const { buttonRef, toggleBox, setBoxVisible, boxVisible } = usePopoverMenu()
  const boxHeight = densityOptions.length * FIELDS_ITEM_HEIGHT
  return (
    <Button
      title={label}
      ref={buttonRef}
      testId={testId}
      onClick={toggleBox}
      icon={<IconDensity size={IconSize.Medium} />}
      disabled={disabled}>
      {boxVisible && (
        <Box testId={testId} height={boxHeight} alignMenu={alignMenu}>
          {densityOptions.map((key, index) => {
            const isKeySelected = density === key
            return (
              <Box.Item
                key={index}
                isSelected={isKeySelected}
                onClick={() => {
                  setDensity(key)
                  setBoxVisible(false)
                  handleCallback && handleCallback(key)
                }}>
                {options[`${key}Label`]}
              </Box.Item>
            )
          })}
        </Box>
      )}
    </Button>
  )
}

export default ButtonDensity
