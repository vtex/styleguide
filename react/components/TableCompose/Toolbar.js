import React from 'react'
import PropTypes from 'prop-types'

import ToolbarInput from './ToolbarInput'
import DensityButton from './DensityButton'
import FieldsButton from './FieldsButton'
import DownloadButton from './DownloadButton'
import UploadButton from './UploadButton'
import NewLineButton from './NewLineButton'
import ExtraActions from './ExtraActions'

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
          <DensityButton
            density={density}
            disabled={loading}
            handleToggleDensity={handleToggleDensity}
            selectedDensity={selectedDensity}
          />
        )}
        {isFieldsVisible && (
          <FieldsButton
            fields={fields}
            hiddenFields={hiddenFields}
            schema={schema}
            handleHideAllColumns={handleHideAllColumns}
            handleShowAllColumns={handleShowAllColumns}
            toggleColumn={toggleColumn}
          />
        )}
        {isDownloadVisible && (
          <DownloadButton download={download} disabled={loading} />
        )}
        {isUploadVisible && <UploadButton upload={upload} disabled={loading} />}
        {isExtraActionsVisible && <ExtraActions extraActions={extraActions} />}
        {isNewLineVisible && (
          <NewLineButton newLine={newLine} disabled={loading} />
        )}
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
