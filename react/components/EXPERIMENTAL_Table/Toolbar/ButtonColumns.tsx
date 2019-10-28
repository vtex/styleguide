import React, { FC } from 'react'

import Toggle from '../../../Toggle'
import IconColumns from '../../icon/Columns/index'
import usePopoverMenu, { Item, Box } from './PopoverMenu'
import Button from './Button'

import { ICON_SIZE, COLUMNS_BOX, NAMESPACES } from '../constants'
import useTableVisibility from '../stateContainers/visibility'

export type ButtonColumnsProps = {
  label: string
  showAllLabel: string
  hideAllLabel: string
  alignMenu: Alignment
  disabled: boolean
  visibility: ReturnType<typeof useTableVisibility>
}

const ButtonColumns: FC<ButtonColumnsProps> = ({
  label,
  showAllLabel,
  hideAllLabel,
  alignMenu,
  disabled,
  visibility,
}) => {
  const { buttonRef, isBoxVisible, toggleBox } = usePopoverMenu()

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
      title={label}
      ref={buttonRef}
      onClick={toggleBox}
      icon={<IconColumns size={ICON_SIZE.MEDIUM} />}
      disabled={disabled}>
      {isBoxVisible && (
        <Box {...boxProps}>
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

export default ButtonColumns
