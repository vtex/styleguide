import React from 'react'

import Toggle from '../Toggle'
import IconColumns from '../icon/Columns'
import Box, { usePopoverMenu, Alignment } from './PopoverMenu'
import Button, { IconSize } from './Button'

const COLUMNS_BOX = {
  MAX_HEIGHT: 192,
  WIDTH: 292,
  ITEM_HEIGHT: 36,
}

interface Props {
  label: string
  showAllLabel: string
  hideAllLabel: string
  alignMenu?: Alignment
  disabled?: boolean
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  visibility: any // useTableVisibility
  testId?: string
}

function ButtonColumns({
  label,
  showAllLabel,
  hideAllLabel,
  alignMenu,
  disabled,
  visibility,
  testId,
}: Props) {
  const { buttonRef, boxVisible, toggleBox } = usePopoverMenu()

  const {
    hiddenColumns,
    hideAllColumns,
    showAllColumns,
    toggleColumn,
    columns,
  } = visibility

  const height = Math.min(
    columns.length * COLUMNS_BOX.ITEM_HEIGHT,
    COLUMNS_BOX.MAX_HEIGHT
  )

  const boxProps = {
    height,
    alignMenu,
    width: COLUMNS_BOX.WIDTH,
    groupActions: [
      { id: 1, label: showAllLabel, onClick: showAllColumns },
      { id: 2, label: hideAllLabel, onClick: hideAllColumns },
    ],
  }

  return (
    <Button
      title={label}
      ref={buttonRef}
      testId={testId}
      onClick={toggleBox}
      icon={<IconColumns size={IconSize.Medium} />}
      disabled={disabled}>
      {boxVisible && (
        <Box {...boxProps} testId={testId}>
          {columns.map((column, index) => {
            const { id, title } = column
            const togglerFn = () => toggleColumn(id)
            const isVisible = !hiddenColumns.includes(id)
            return (
              <Box.Item key={index} onClick={togglerFn}>
                {title}
                <Toggle checked={isVisible} onChange={togglerFn} />
              </Box.Item>
            )
          })}
        </Box>
      )}
    </Button>
  )
}

export default ButtonColumns
