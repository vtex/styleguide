import React, { useRef, useState } from 'react'
import PropTypes from 'prop-types'

import ActionMenu from '../ActionMenu'
import Button from '../Button'
import ButtonWithIcon from '../ButtonWithIcon'
import ButtonGroup from '../ButtonGroup'
import Toggle from '../Toggle'
import IconColumns from '../icon/Columns'
import IconDownload from '../icon/Download'
import IconPlus from '../icon/Plus'
import IconUpload from '../icon/Upload'
import IconOptionsDots from '../icon/OptionsDots'
import useOutsideClick from './useOutsideCick'
import ToolbarInput from './ToolbarInput'
import DensityBtn from './DensityBtn'

const MAX_FIELDS_BOX_HEIGHT = 192
const FIELDS_BOX_ITEM_HEIGHT = 36
const FIELDS_BOX_WIDTH = 292
const BOX_SHADOW_STYLE = { boxShadow: '0px 1px 18px rgba(0, 0, 0, 0.14)' }
const ICON_OPTICAL_COMPENSATION = { marginTop: '1.5px' }
const LIGHT_ICON_SIZE = 16
const MEDIUM_ICON_SIZE = 14
const HEAVY_ICON_SIZE = 13

// TODO : HandleOutsideClicks
const Toolbar = ({
  actions: {
    inputSearch,
    download,
    upload,
    fields,
    extraActions,
    newLine,
    density,
  },
  hiddenFields,
  schema,
  handleHideAllColumns,
  handleShowAllColumns,
  toggleColumn,
  handleToggleDensity,
  selectedDensity,
  loading,
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

  const handleInputSearchSubmit = e => {
    !!inputSearch.onSubmit && inputSearch.onSubmit(e)
  }

  const isDownloadVisible = download && download.handleCallback
  const isUploadVisible = upload && upload.handleCallback
  const isFieldsVisible = fields && fields.showAllLabel && fields.hideAllLabel
  const isExtraActionsVisible =
    extraActions && extraActions.label && extraActions.actions.length > 0
  const isNewLineVisible = newLine && newLine.label
  const isSearchBarVisible = !!inputSearch
  const isDensityVisible =
    density &&
    density.buttonLabel &&
    density.lowOptionLabel &&
    density.mediumOptionLabel &&
    density.highOptionLabel

  const newLineButtonProps = {
    disabled: loading || (newLine && newLine.disabled),
    isLoading: newLine && newLine.isLoading,
    variation: 'primary',
    size: 'small',
  }

  return (
    <div
      id="toolbar"
      className={`mb5 flex flex-row w-100 ${
        isSearchBarVisible ? 'justify-between' : 'justify-end'
      }`}>
      {inputSearch && (
        <ToolbarInput
          onSubmit={handleInputSearchSubmit}
          disabled={loading}
          inputSearch={inputSearch}
        />
      )}
      <div className="flex flex-row items-center">
        {isDensityVisible && (
          <DensityBtn
            density={density}
            disabled={loading}
            handleToggleDensity={handleToggleDensity}
            selectedDensity={selectedDensity}
          />
        )}
        {isFieldsVisible && (
          <div
            id="toggleFieldsBtn"
            title={fields.label}
            ref={fieldsBtnRef}
            className="relative mh2">
            <ButtonWithIcon
              icon={
                <span
                  className="c-on-base mh2"
                  style={ICON_OPTICAL_COMPENSATION}>
                  <IconColumns size={MEDIUM_ICON_SIZE} />
                </span>
              }
              disabled={loading}
              variation="tertiary"
              size="small"
              // TODO: REVIEW
              onClick={() => setFieldsBoxVisible(!isFieldsBoxVisible)}
            />
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
                  <div
                    // TODO: MEMO
                    style={{ height: calculateFieldsBoxHeight() }}
                    className="overflow-auto">
                    {Object.keys(schema.properties).map((field, index) => (
                      <div
                        key={index}
                        className="flex justify-between ph6 pv3 pointer hover-bg-muted-5"
                        onClick={() => toggleColumn(field)}>
                        <span className="w-70 truncate">
                          {schema.properties[field].title || field}
                        </span>
                        <Toggle
                          size="small"
                          checked={!hiddenFields.includes(field)}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
        {isDownloadVisible && (
          <div title={download.label} className="mh2">
            <ButtonWithIcon
              icon={
                <span className="c-on-base mh2">
                  <IconDownload size={MEDIUM_ICON_SIZE} />
                </span>
              }
              disabled={loading}
              variation="tertiary"
              isLoading={download.isLoading}
              size="small"
              onClick={download.handleCallback}>
              {download.label && (
                <span className="c-on-base">{download.label}</span>
              )}
            </ButtonWithIcon>
          </div>
        )}
        {isUploadVisible && (
          <div title={upload.label} className="mh2">
            <ButtonWithIcon
              icon={
                <span
                  className="c-on-base mh2"
                  style={ICON_OPTICAL_COMPENSATION}>
                  <IconUpload size={HEAVY_ICON_SIZE} />
                </span>
              }
              disabled={loading}
              isLoading={upload.isLoading}
              variation="tertiary"
              size="small"
              onClick={upload.handleCallback}>
              {upload.label && (
                <span className="c-on-base">{upload.label}</span>
              )}
            </ButtonWithIcon>
          </div>
        )}
        {isExtraActionsVisible && (
          <div title={extraActions.label} className="mh2">
            <ActionMenu
              hideCaretIcon
              buttonProps={{
                variation: 'tertiary',
                icon: (
                  <span className="c-on-base">
                    <IconOptionsDots />
                  </span>
                ),
                size: 'small',
              }}
              options={extraActions.actions.map(action => {
                return {
                  label: action.label,
                  onClick: action.handleCallback,
                }
              })}
            />
          </div>
        )}
        {isNewLineVisible &&
          (newLine.actions ? (
            <ButtonGroup
              buttons={[
                <ButtonWithIcon
                  isActiveOfGroup
                  key="new-line-button"
                  icon={<IconPlus solid size={LIGHT_ICON_SIZE} />}
                  onClick={newLine.handleCallback}
                  {...newLineButtonProps}>
                  {newLine.label}
                </ButtonWithIcon>,
                <ActionMenu
                  isActiveOfGroup
                  key="actions-button"
                  buttonProps={newLineButtonProps}
                  options={newLine.actions}
                />,
              ]}
            />
          ) : (
            <ButtonWithIcon
              icon={<IconPlus solid size={LIGHT_ICON_SIZE} />}
              onClick={newLine.handleCallback}
              {...newLineButtonProps}>
              {newLine.label}
            </ButtonWithIcon>
          ))}
      </div>
    </div>
  )
}

Toolbar.defaultProps = {
  actions: {
    extraActions: {
      actions: [],
    },
  },
}

Toolbar.propTypes = {
  actions: PropTypes.shape({
    inputSearch: PropTypes.shape({
      onSubmit: PropTypes.func,
    }),
    density: PropTypes.shape({
      buttonLabel: PropTypes.string,
      lowOptionLabel: PropTypes.string,
      mediumOptionLabel: PropTypes.string,
      highOptionLabel: PropTypes.string,
      alignMenu: PropTypes.oneOf(['right', 'left']),
    }),
    fields: PropTypes.shape({
      label: PropTypes.string,
      showAllLabel: PropTypes.string,
      hideAllLabel: PropTypes.string,
      alignMenu: PropTypes.oneOf(['right', 'left']),
    }),
    download: PropTypes.shape({
      label: PropTypes.string,
      handleCallback: PropTypes.func,
      isLoading: PropTypes.bool,
    }),
    upload: PropTypes.shape({
      label: PropTypes.string,
      handleCallback: PropTypes.func,
      isLoading: PropTypes.bool,
    }),
    extraActions: PropTypes.shape({
      label: PropTypes.string,
      actions: PropTypes.arrayOf(
        PropTypes.shape({
          label: PropTypes.string,
          handleCallback: PropTypes.func,
        })
      ),
      alignMenu: PropTypes.oneOf(['right', 'left']),
      isLoading: PropTypes.bool,
    }),
    newLine: PropTypes.shape({
      label: PropTypes.string.isRequired,
      handleCallback: PropTypes.func.isRequired,
      disabled: PropTypes.bool,
      actions: PropTypes.arrayOf(
        PropTypes.shape({
          label: PropTypes.string,
          handleCallback: PropTypes.func,
          toggle: PropTypes.shape({
            checked: PropTypes.bool,
            semantic: PropTypes.bool,
          }),
        })
      ),
    }),
  }),
  schema: PropTypes.object.isRequired,
  hiddenFields: PropTypes.array,
  toggleColumn: PropTypes.func,
  handleHideAllColumns: PropTypes.func,
  handleShowAllColumns: PropTypes.func,
  handleToggleDensity: PropTypes.func,
  selectedDensity: PropTypes.string,
  loading: PropTypes.bool,
}

export default Toolbar
