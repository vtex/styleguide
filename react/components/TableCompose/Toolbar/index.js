import React, { Fragment } from 'react'
import PropTypes from 'prop-types'

import InputToolbar from './InputToolbar'
import ButtonDensity from './ButtonDensity'
import ButtonFields from './ButtonFields'
import ButtonDownload from './ButtonDownload'
import ButtonUpload from './ButtonUpload'
import ButtonNewLine from './ButtonNewLine'
import ExtraActions from './ExtraActions'
import ButtonToolbar from './ButtonToolbar'

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
  loading,
  children,
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
        <InputToolbar disabled={loading} inputSearch={inputSearch} />
      )}
      <div className="flex flex-row items-center">
        {children || (
          <Fragment>
            {isDensityVisible && (
              <ButtonDensity density={density} disabled={loading} />
            )}
            {isFieldsVisible && (
              <ButtonFields fields={fields} disabled={loading} />
            )}
            {isDownloadVisible && (
              <ButtonDownload download={download} disabled={loading} />
            )}
            {isUploadVisible && (
              <ButtonUpload upload={upload} disabled={loading} />
            )}
            {isExtraActionsVisible && (
              <ExtraActions extraActions={extraActions} />
            )}
            {isNewLineVisible && (
              <ButtonNewLine newLine={newLine} disabled={loading} />
            )}
          </Fragment>
        )}
      </div>
    </div>
  )
}

Toolbar.ButtonDensity = ButtonDensity
Toolbar.ButtonFields = ButtonFields
Toolbar.ButtonDownload = ButtonDownload
Toolbar.ButtonUpload = ButtonUpload
Toolbar.ExtraActions = ExtraActions
Toolbar.Button = ButtonToolbar

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
  loading: PropTypes.bool,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
}

export default Toolbar
