import React, { Fragment } from 'react'
import PropTypes from 'prop-types'

import { constants } from '../util'
import InputToolbar from './InputToolbar'
import ButtonDensity from './ButtonDensity'
import ButtonFields from './ButtonFields'
import ButtonNewLine from './ButtonNewLine'
import ExtraActions from './ExtraActions'
import ButtonToolbar from './ButtonToolbar'

import IconUpload from '../../icon/Upload'
import IconDownload from '../../icon/Download'
import InputAutoComplete from './InputAutoComplete'

const Container = ({ justify = 'end', children }) => (
  <div id="toolbar" className={`mb5 flex flex-row w-100 justify-${justify}`}>
    {children}
  </div>
)

const BUTTON_TYPES = {
  DENSITY: 1,
  DOWNLOAD: 2,
  FIELDS: 3,
  NEW_LINE: 4,
  GENERIC: 5,
  UPLOAD: 6,
  EXTRA_ACTIONS: 7,
}

const getButton = (type, props) => {
  switch (type) {
    case BUTTON_TYPES.DENSITY: {
      return <ButtonDensity {...props} />
    }
    case BUTTON_TYPES.DOWNLOAD: {
      const {
        download: { label, isLoading, handleCallback },
        ...rest
      } = props

      return (
        <ButtonToolbar
          id="download"
          title={label}
          isLoading={isLoading}
          onClick={handleCallback}
          label={label}
          icon={<IconDownload size={constants.HEAVY_ICON_SIZE} />}
          {...rest}
        />
      )
    }
    case BUTTON_TYPES.FIELDS: {
      return <ButtonFields {...props} />
    }
    case BUTTON_TYPES.NEW_LINE: {
      return <ButtonNewLine {...props} />
    }
    case BUTTON_TYPES.UPLOAD: {
      const {
        upload: { label, isLoading, handleCallback },
        ...rest
      } = props

      return (
        <ButtonToolbar
          id="upload"
          title={label}
          isLoading={isLoading}
          onClick={handleCallback}
          label={label}
          icon={<IconUpload size={constants.HEAVY_ICON_SIZE} />}
          {...rest}
        />
      )
    }
    case BUTTON_TYPES.EXTRA_ACTIONS: {
      return <ExtraActions {...props} />
    }
    default: {
      return <ButtonToolbar {...props} />
    }
  }
}

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
    <Container justify={isSearchBarVisible ? 'between' : 'end'}>
      {inputSearch &&
        (inputSearch.autoComplete ? (
          <InputAutoComplete disabled={loading} inputSearch={inputSearch} />
        ) : (
          <InputToolbar disabled={loading} inputSearch={inputSearch} />
        ))}
      <div className="flex flex-row items-center">
        <Fragment>
          {isDensityVisible &&
            getButton(BUTTON_TYPES.DENSITY, { density, disabled: loading })}

          {isFieldsVisible &&
            getButton(BUTTON_TYPES.FIELDS, { fields, disabled: loading })}

          {isDownloadVisible &&
            getButton(BUTTON_TYPES.DOWNLOAD, { download, disabled: loading })}

          {isUploadVisible &&
            getButton(BUTTON_TYPES.UPLOAD, { upload, disabled: loading })}

          {isExtraActionsVisible &&
            getButton(BUTTON_TYPES.EXTRA_ACTIONS, { extraActions })}

          {isNewLineVisible &&
            getButton(BUTTON_TYPES.NEW_LINE, { newLine, disabled: loading })}
        </Fragment>
      </div>
    </Container>
  )
}

Toolbar.defaultProps = {
  actions: {
    extraActions: {
      actions: [],
    },
  },
}

Container.propTypes = {
  justify: PropTypes.oneOf(['between', 'end', 'start', 'around', 'center']),
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
}

Toolbar.propTypes = {
  actions: PropTypes.shape({
    inputSearch: PropTypes.shape({
      onSubmit: PropTypes.func,
      autoComplete: PropTypes.shape({
        isLoading: PropTypes.bool,
      }),
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
}

export default Toolbar
