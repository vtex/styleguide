import React, { useState, useRef, useMemo } from 'react'
import PropTypes from 'prop-types'

import Toggle from '../../Toggle'
import ButtonToolbar from './ButtonToolbar'
import IconColumns from '../../icon/Columns'
import Button from '../../Button'
import useOutsideClick from '../hooks/useOutsideCick'
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

  const height = useMemo(() => calculateFieldsBoxHeight, [
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
        <div
          className={`absolute ${
            fields.alignMenu === 'right' ? 'right-0' : 'left-0'
          } z-999 ba b--muted-4 br2 mt2 mh2`}>
          <div
            className="w-100 b2 br2 bg-base"
            style={{
              ...constants.BOX_SHADOW_STYLE,
              width: constants.FIELDS_BOX_WIDTH,
            }}>
            <div className="flex inline-flex bb b--muted-4 w-100 pl6 pv4">
              <Button
                variation="secondary"
                size="small"
                onClick={showAllColumns}>
                {fields.showAllLabel}
              </Button>
              <div className="mh4">
                <Button
                  variation="secondary"
                  size="small"
                  onClick={hideAllColumns}>
                  {fields.hideAllLabel}
                </Button>
              </div>
            </div>
            <div style={{ height: height }} className="overflow-auto">
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
            </div>
          </div>
        </div>
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
  toggleColumn: PropTypes.func,
}

export default ButtonFields
