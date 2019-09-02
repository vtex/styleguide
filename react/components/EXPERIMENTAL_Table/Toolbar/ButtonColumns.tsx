import React, { useMemo, FC } from 'react'

import Toggle from '../../../Toggle'
import IconColumns from '../../icon/Columns/index'
import Menu from './Menu/index'

import { ICON_SIZE, COLUMNS_BOX, NAMESPACES } from '../constants'
import useTableContext from '../hooks/useTableContext'

export type ButtonColumnsProps = {
  label: string
  showAllLabel: string
  hideAllLabel: string
  alignMenu: Alignment
  disabled: boolean
}

const ButtonColumns: FC<ButtonColumnsProps> = ({
  label,
  showAllLabel,
  hideAllLabel,
  alignMenu,
  disabled,
}) => {
  const {
    hiddenColumns,
    columns,
    hideAllColumns,
    showAllColumns,
    toggleColumn,
  } = useTableContext()

  const calculateFieldsBoxHeight = () => {
    const estimate = Object.keys(columns).length * COLUMNS_BOX.ITEM_HEIGHT
    return estimate > COLUMNS_BOX.MAX_HEIGHT ? COLUMNS_BOX.MAX_HEIGHT : estimate
  }

  const height = useMemo(() => calculateFieldsBoxHeight(), [
    Object.keys(columns).length,
  ])

  return (
    <Menu
      button={{
        id: NAMESPACES.TOOLBAR.BUTTON_COLUMNS,
        title: label,
        icon: <IconColumns size={ICON_SIZE.MEDIUM} />,
        disabled: disabled,
      }}
      box={{
        height,
        alignMenu,
        width: COLUMNS_BOX.WIDTH,
        groupActions: [
          { id: 1, label: showAllLabel, onClick: showAllColumns },
          { id: 2, label: hideAllLabel, onClick: hideAllColumns },
        ],
      }}>
      {columns.map((column, index) => {
        const { id, title } = column
        const togglerFn = () => toggleColumn(id)
        const isVisible = !hiddenColumns.includes(id)
        return (
          <Menu.Item key={index} handleCallback={togglerFn}>
            {title}
            <Toggle checked={isVisible} onChange={togglerFn} />
          </Menu.Item>
        )
      })}
    </Menu>
  )
}

export default ButtonColumns
