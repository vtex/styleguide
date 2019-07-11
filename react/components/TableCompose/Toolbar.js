import React from 'react'
import PropTypes from 'prop-types'

import ActionMenu from '../ActionMenu'
import ButtonWithIcon from '../ButtonWithIcon'
import ButtonGroup from '../ButtonGroup'
import IconDownload from '../icon/Download'
import IconPlus from '../icon/Plus'
import IconUpload from '../icon/Upload'
import IconOptionsDots from '../icon/OptionsDots'
import ToolbarInput from './ToolbarInput'
import DensityBtn from './DensityBtn'
import FieldsBtn from './FieldsBtn'

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
        <ToolbarInput disabled={loading} inputSearch={inputSearch} />
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
          <FieldsBtn
            fields={fields}
            hiddenFields={hiddenFields}
            schema={schema}
            handleHideAllColumns={handleHideAllColumns}
            handleShowAllColumns={handleShowAllColumns}
            toggleColumn={toggleColumn}
          />
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
