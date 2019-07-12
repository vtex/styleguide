import React, { useState, useRef, useMemo } from 'react'
import PropTypes from 'prop-types'

import Toggle from '../Toggle'
import ToolbarButton from './ToolbarButton'
import IconColumns from '../icon/Columns'
import Button from '../Button'
import useOutsideClick from './useOutsideCick'

const MAX_FIELDS_BOX_HEIGHT = 192
const FIELDS_BOX_ITEM_HEIGHT = 36
const FIELDS_BOX_WIDTH = 292
const BOX_SHADOW_STYLE = { boxShadow: '0px 1px 18px rgba(0, 0, 0, 0.14)' }
const MEDIUM_ICON_SIZE = 14

const FieldsBtn = ({
  fields,
  hiddenFields,
  schema,
  handleHideAllColumns,
  handleShowAllColumns,
  toggleColumn,
  disabled,
}) => {
  const [isFieldsBoxVisible, setFieldsBoxVisible] = useState(false)
  const fieldsBtnRef = useRef(null)

  useOutsideClick(
    fieldsBtnRef,
    () => setFieldsBoxVisible(false),
    isFieldsBoxVisible
  )

  const calculateFieldsBoxHeight = () => {
    const estimate =
      Object.keys(schema.properties).length * FIELDS_BOX_ITEM_HEIGHT
    return estimate > MAX_FIELDS_BOX_HEIGHT ? MAX_FIELDS_BOX_HEIGHT : estimate
  }

  const height = useMemo(() => calculateFieldsBoxHeight, [
    Object.keys(schema.properties).length,
  ])

  return (
    <ToolbarButton
      id="toggleFieldsBtn"
      title={fields.label}
      ref={fieldsBtnRef}
      icon={<IconColumns size={MEDIUM_ICON_SIZE} />}
      disabled={disabled}
      onClick={() => setFieldsBoxVisible(!isFieldsBoxVisible)}>
      {isFieldsBoxVisible && (
        <div
          className={`absolute ${
            fields.alignMenu === 'right' ? 'right-0' : 'left-0'
          } z-999 ba b--muted-4 br2 mt2 mh2`}>
          <div
            className="w-100 b2 br2 bg-base"
            style={{
              ...BOX_SHADOW_STYLE,
              width: FIELDS_BOX_WIDTH,
            }}>
            <div className="flex inline-flex bb b--muted-4 w-100 pl6 pv4">
              <Button
                variation="secondary"
                size="small"
                onClick={handleShowAllColumns}>
                {fields.showAllLabel}
              </Button>
              <div className="mh4">
                <Button
                  variation="secondary"
                  size="small"
                  onClick={handleHideAllColumns}>
                  {fields.hideAllLabel}
                </Button>
              </div>
            </div>
            <div style={{ height: height }} className="overflow-auto">
              {Object.keys(schema.properties).map((field, index) => (
                <div
                  key={index}
                  className="flex justify-between ph6 pv3 pointer hover-bg-muted-5"
                  onClick={() => toggleColumn(field)}>
                  <span className="w-70 truncate">
                    {schema.properties[field].title || field}
                  </span>
                  <Toggle checked={!hiddenFields.includes(field)} />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </ToolbarButton>
  )
}

FieldsBtn.propTypes = {
  fields: PropTypes.shape({
    label: PropTypes.string,
    showAllLabel: PropTypes.string,
    hideAllLabel: PropTypes.string,
    alignMenu: PropTypes.oneOf(['right', 'left']),
  }),
  disabled: PropTypes.bool,
  schema: PropTypes.object.isRequired,
  hiddenFields: PropTypes.array,
  toggleColumn: PropTypes.func,
  handleHideAllColumns: PropTypes.func,
  handleShowAllColumns: PropTypes.func,
}

export default FieldsBtn
