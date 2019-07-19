import React from 'react'
import PropTypes from 'prop-types'

import InputToolbar from './InputToolbar'
import ButtonDensity from './ButtonDensity'
import ButtonFields from './ButtonFields'
import ButtonDownload from './ButtonDownload'
import ButtonUpload from './ButtonUpload'
import ButtonNewLine from './ButtonNewLine'
import ExtraActions from './ExtraActions'

import useTableContext from '../hooks/useTableContext'

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
  handleHideAllColumns,
  handleShowAllColumns,
  loading,
}) => {
  const {
    state,
    toggleColumn,
    hideAllColumns,
    showAllColumns,
    staticSchema,
  } = useTableContext()

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
        <InputToolbar disabled={loading} inputSearch={inputSearch} />
      )}
      <div className="flex flex-row items-center">
        {isDensityVisible && (
          <ButtonDensity density={density} disabled={loading} />
        )}
        {isFieldsVisible && (
          <ButtonFields
            fields={fields}
            hiddenFields={state.hiddenFields}
            schema={staticSchema}
            handleHideAllColumns={handleHideAllColumns || hideAllColumns}
            handleShowAllColumns={handleShowAllColumns || showAllColumns}
            toggleColumn={toggleColumn}
          />
        )}
        {isDownloadVisible && (
          <ButtonDownload download={download} disabled={loading} />
        )}
        {isUploadVisible && <ButtonUpload upload={upload} disabled={loading} />}
        {isExtraActionsVisible && <ExtraActions extraActions={extraActions} />}
        {isNewLineVisible && (
          <ButtonNewLine newLine={newLine} disabled={loading} />
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
