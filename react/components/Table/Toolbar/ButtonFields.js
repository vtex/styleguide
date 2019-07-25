import React, { useMemo } from 'react'
import PropTypes from 'prop-types'

import Toggle from '../../Toggle'
import IconColumns from '../../icon/Columns'
import Menu from './Menu'

import { constants } from '../util'
import useTableContext from '../hooks/useTableContext'

const ButtonFields = ({ fields, disabled }) => {
  const {
    state,
    staticSchema,
    hideAllColumns,
    showAllColumns,
    toggleColumn,
  } = useTableContext()

  const calculateFieldsBoxHeight = () => {
    const estimate =
      Object.keys(staticSchema.properties).length *
      constants.FIELDS_BOX_ITEM_HEIGHT
    return estimate > constants.MAX_FIELDS_BOX_HEIGHT
      ? constants.MAX_FIELDS_BOX_HEIGHT
      : estimate
  }

  const height = useMemo(() => calculateFieldsBoxHeight(), [
    Object.keys(staticSchema.properties).length,
  ])

  return (
    <Menu
      button={{
        id: 'toggleFieldsBtn',
        title: fields.label,
        icon: <IconColumns size={constants.MEDIUM_ICON_SIZE} />,
        disabled: disabled,
      }}
      box={{
        height: height,
        alignMenu: fields.alignMenu,
        width: constants.FIELDS_BOX_WIDTH,
        groupActions: [
          { id: 1, label: fields.showAllLabel, handleClick: showAllColumns },
          { id: 2, label: fields.hideAllLabel, handleClick: hideAllColumns },
        ],
      }}>
      {Object.keys(staticSchema.properties).map((field, index) => (
        <Menu.Item key={index} handleCallBack={() => toggleColumn(field)}>
          {staticSchema.properties[field].title || field}
          <Toggle checked={!state.hiddenFields.includes(field)} />
        </Menu.Item>
      ))}
    </Menu>
  )
}

ButtonFields.propTypes = {
  fields: PropTypes.shape({
    label: PropTypes.string,
    showAllLabel: PropTypes.string,
    hideAllLabel: PropTypes.string,
    alignMenu: PropTypes.oneOf(['right', 'left']),
  }),
  disabled: PropTypes.bool,
}

export default ButtonFields
