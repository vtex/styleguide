import React from 'react'
import PropTypes from 'prop-types'

import ActionMenu from '../ActionMenu'
import ButtonWithIcon from '../ButtonWithIcon'
import ButtonGroup from '../ButtonGroup'
import IconPlus from '../icon/Plus'
import IconOptionsDots from '../icon/OptionsDots'
import ToolbarInput from './ToolbarInput'
import DensityBtn from './DensityBtn'
import FieldsBtn from './FieldsBtn'
import DownloadBtn from './DownloadBtn'
import UploadBtn from './UploadBtn'

const LIGHT_ICON_SIZE = 16

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
          <DownloadBtn download={download} disabled={loading} />
        )}
        {isUploadVisible && <UploadBtn upload={upload} disabled={loading} />}
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
