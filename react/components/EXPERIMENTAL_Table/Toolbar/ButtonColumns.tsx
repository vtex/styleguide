import React, { FC } from 'react'

import Toggle from '../../Toggle/index'
import IconColumns from '../../icon/Columns/index'
import usePopoverMenu, { Item, Box, Alignment } from './PopoverMenu'
import Button, { IconSize } from './Button'
import { NAMESPACES } from '../constants'
import useTableVisibility from '../hooks/useTableVisibility'
import { useButtonGroupContext } from './context'

const COLUMNS_BOX = {
  MAX_HEIGHT: 192,
  WIDTH: 292,
  ITEM_HEIGHT: 36,
}

const ButtonColumns: FC<ButtonColumnsProps> = ({
  label,
  showAllLabel,
  hideAllLabel,
  alignMenu,
  disabled,
  visibility,
}) => {
  const { buttonRef, boxVisible, toggleBox } = usePopoverMenu()
  const { testId } = useButtonGroupContext()
  const columnsTestId = `${testId}__columns`

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
      id={NAMESPACES.TOOLBAR.BUTTON_COLUMNS}
      testId={columnsTestId}
      title={label}
      ref={buttonRef}
      onClick={toggleBox}
      icon={<IconColumns size={IconSize.Medium} />}
      disabled={disabled}>
      {boxVisible && (
        <Box {...boxProps} testId={columnsTestId}>
          {columns.map((column, index) => {
            const { id, title } = column
            const togglerFn = () => toggleColumn(id)
            const isVisible = !hiddenColumns.includes(id)
            return (
              <Item key={index} onClick={togglerFn}>
                {title}
                <Toggle checked={isVisible} onChange={togglerFn} />
              </Item>
            )
          })}
        </Box>
      )}
    </Button>
  )
}

export type ButtonColumnsProps = {
  label: string
  showAllLabel: string
  hideAllLabel: string
  alignMenu: Alignment
  disabled: boolean
  visibility: ReturnType<typeof useTableVisibility>
}

export default ButtonColumns
