import React, { useState, useRef, useMemo } from 'react'
import PropTypes from 'prop-types'

import Toggle from '../../Toggle'
import ButtonToolbar from './ButtonToolbar'
import IconColumns from '../../icon/Columns'
import useOutsideClick from '../hooks/useOutsideCick'
import { constants } from '../util'
import useTableContext from '../hooks/useTableContext'
import Box from './Box'

const ButtonFields = ({ fields, disabled }) => {
  const {
    state,
    staticSchema,
    hideAllColumns,
    showAllColumns,
    toggleColumn,
  } = useTableContext()

  const [isFieldsBoxVisible, setFieldsBoxVisible] = useState(false)
  const fieldsBtnRef = useRef(null)

  useOutsideClick(
    fieldsBtnRef,
    () => setFieldsBoxVisible(false),
    isFieldsBoxVisible
  )

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
    <ButtonToolbar
      id="toggleFieldsBtn"
      title={fields.label}
      ref={fieldsBtnRef}
      icon={<IconColumns size={constants.MEDIUM_ICON_SIZE} />}
      disabled={disabled}
      onClick={() => setFieldsBoxVisible(!isFieldsBoxVisible)}>
      {isFieldsBoxVisible && (
        <Box
          height={height}
          alignMenu={fields.alignMenu}
          width={constants.FIELDS_BOX_WIDTH}
          groupActions={[
            { id: 1, label: fields.showAllLabel, handleClick: showAllColumns },
            { id: 2, label: fields.hideAllLabel, handleClick: hideAllColumns },
          ]}>
          {Object.keys(staticSchema.properties).map((field, index) => (
            <div
              key={index}
              className="flex justify-between ph6 pv3 pointer hover-bg-muted-5"
              onClick={() => toggleColumn(field)}>
              <span className="w-70 truncate">
                {staticSchema.properties[field].title || field}
              </span>
              <Toggle checked={!state.hiddenFields.includes(field)} />
            </div>
          ))}
        </Box>
      )}
    </ButtonToolbar>
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
