import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

import InputSearch from '../InputSearch'
import Button from '../Button'
import Toggle from '../Toggle'
import IconDownload from '../icon/Download'
import IconUpload from '../icon/Upload'
import IconCaretDown from '../icon/CaretDown'
import IconColumns from '../icon/Columns'
const MAX_FIELDS_BOX_HEIGHT = 192
const FIELDS_BOX_ITEM_HEIGHT = 36
const FIELDS_BOX_WIDTH = 292
const EXTRA_ACTIONS_BOX_WIDTH = 199

class Toolbar extends PureComponent {
  constructor(props) {
    super(props)
    this.fieldsBtnRef = React.createRef()
    this.extraActionsBtnRef = React.createRef()
    this.state = {
      isFieldsBoxVisible: false,
      isExtraActionsBoxVisible: false,
    }
  }

  handleToggleFieldsBox = () => {
    const { isFieldsBoxVisible } = this.state
    if (isFieldsBoxVisible) {
      document.removeEventListener('mousedown', this.handleClickOutside)
    } else {
      document.addEventListener('mousedown', this.handleClickOutside)
    }
    this.setState({ isFieldsBoxVisible: !isFieldsBoxVisible })
  }

  handleToggleExtraActionsBox = () => {
    const { isExtraActionsBoxVisible } = this.state
    if (isExtraActionsBoxVisible) {
      document.removeEventListener('mousedown', this.handleClickOutside)
    } else {
      document.addEventListener('mousedown', this.handleClickOutside)
    }
    this.setState({ isExtraActionsBoxVisible: !isExtraActionsBoxVisible })
  }

  handleClickOutside = (e) => {
    if ( // handle clicks outside the show/hide fields btn or box
      this.fieldsBtnRef &&
      this.fieldsBtnRef.current &&
      !this.fieldsBtnRef.current.contains(e.target) &&
      this.state.isFieldsBoxVisible
    ) {
      // closes the box if it's open
      this.handleToggleFieldsBox()
    }
    if (
      this.extraActionsBtnRef &&
      this.extraActionsBtnRef.current &&
      !this.extraActionsBtnRef.current.contains(e.target) &&
      this.state.isExtraActionsBoxVisible
    ) {
      this.handleToggleExtraActionsBox()
    }
  }

  calculateFieldsBoxHeight = () => {
    const { schema } = this.props
    const estimate = Object.keys(schema.properties).length * FIELDS_BOX_ITEM_HEIGHT
    return estimate > MAX_FIELDS_BOX_HEIGHT ? MAX_FIELDS_BOX_HEIGHT : estimate
  }

  calculateExtraActionsBoxHeight = () => {
    const { actions: { extraActions } } = this.props
    const estimate = extraActions.actions.length * FIELDS_BOX_ITEM_HEIGHT
    return estimate > MAX_FIELDS_BOX_HEIGHT ? MAX_FIELDS_BOX_HEIGHT : estimate
  }

  handleInputSearchSubmit = e => {
    this.props.inputSearch.onSubmit && this.props.inputSearch.onSubmit(e)
  }

  render() {
    const {
      actions: { download, upload, fields, extraActions },
      inputSearch,
      displaySchema,
      schema,
      handleHideAllColumns,
      handleShowAllColumns,
      toggleColumn,
    } = this.props
    const {
      isFieldsBoxVisible,
      isExtraActionsBoxVisible,
    } = this.state
    const isDownloadVisible = download && download.label
    const isUploadVisible = upload && upload.label
    const isFieldsVisible = fields && fields.label
    const isExtraActionsVisible = extraActions && extraActions.label && extraActions.actions.length > 0

    return (
      <div className="mb5 flex flex-row justify-between w-100">
        {inputSearch && (
          <form className="w-30" onSubmit={this.handleInputSearchSubmit}>
            <InputSearch {...inputSearch} />
          </form>
        )}
        <div id="toolbar" className="flex flex-row">
          {isFieldsVisible && (
            <div
              id="toggleFieldsBtn"
              ref={this.fieldsBtnRef}
              className="relative">
              <Button
                variation="tertiary"
                size="small"
                onClick={this.handleToggleFieldsBox}
              >
                <span className="flex align-baseline near-black">
                  <span className="mr3">
                    <IconColumns color="currentColor" />
                  </span>
                  {fields.label}
                </span>
              </Button>
              {isFieldsBoxVisible && (
                <div className="absolute z-999 ba b--light-gray br2">
                  <div
                    className="w-100 b2 br2 bg-base shadow-2"
                    style={{ width: FIELDS_BOX_WIDTH }}>
                    <div className="flex inline-flex bb b--light-gray w-100 pl6 pv4">
                      <Button
                        variation="secondary"
                        size="small"
                        onClick={handleShowAllColumns}
                      >{fields.showAllLabel}</Button>
                      <div className="mh4">
                        <Button
                          variation="secondary"
                          size="small"
                          onClick={handleHideAllColumns}
                        >{fields.hideAllLabel}</Button>
                      </div>
                    </div>
                    <div style={{ height: this.calculateFieldsBoxHeight() }} className="overflow-scroll">
                      {
                        Object.keys(schema.properties).map((field, index) => (
                          <div
                            key={index}
                            className="flex justify-between ph6 pv3 pointer hover-bg-light-silver"
                            onClick={() => toggleColumn(field)}
                          >
                            <span className="w-70 truncate">
                              {schema.properties[field].title || field}
                            </span>
                            <Toggle
                              size="small"
                              checked={!!displaySchema.properties[field]}
                            />
                          </div>
                        ))
                      }
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
          {isDownloadVisible && (
            <Button
              variation="tertiary"
              size="small"
              onClick={download.handleCallback}
            >
              <span className="flex align-baseline near-black">
                <span className="mr3">
                  <IconDownload color="currentColor" />
                </span>
                {download.label}
              </span>
            </Button>
          )}
          {isUploadVisible && (
            <Button
              variation="tertiary"
              size="small"
              onClick={upload.handleCallback}
            >
              <span className="flex align-baseline near-black">
                <span className="mr3">
                  <IconUpload color="currentColor" />
                </span>
                {upload.label}
              </span>
            </Button>
          )}
          {isExtraActionsVisible && (
            <div
              id="toggleExtraActionsBtn"
              ref={this.extraActionsBtnRef}
              className="relative">
              <Button
                variation="tertiary"
                size="small"
                onClick={this.handleToggleExtraActionsBox}
              >
                <span className="flex align-baseline items-center near-black">
                  <span className="mr3">
                    {extraActions.label}
                  </span>
                  <IconCaretDown height={13} color="currentColor" />
                </span>
              </Button>
              {isExtraActionsBoxVisible && (
                <div className="absolute z-999 ba b--light-gray br2 shadow-2 right-0">
                  <div
                    className="w-100 b2 br2 bg-base"
                    style={{ width: EXTRA_ACTIONS_BOX_WIDTH }}>
                    <div style={{ height: this.calculateExtraActionsBoxHeight() }} className="overflow-scroll">
                      {
                        extraActions.actions.map((action, index) => (
                          <div
                            key={index}
                            className="flex justify-between ph6 pv3 pointer hover-bg-light-silver"
                            onClick={action.handleCallback}>
                            <span className="w-70 truncate">
                              {action.label}
                            </span>
                          </div>
                        ))
                      }
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    )
  }
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
    fields: PropTypes.shape({
      label: PropTypes.string,
      showAllLabel: PropTypes.string,
      hideAllLabel: PropTypes.string,
    }),
    download: PropTypes.shape({
      label: PropTypes.string,
      handleCallback: PropTypes.func,
    }),
    upload: PropTypes.shape({
      label: PropTypes.string,
      handleCallback: PropTypes.func,
    }),
    extraActions: PropTypes.shape({
      label: PropTypes.string,
      actions: PropTypes.arrayOf(
        PropTypes.shape({
          label: PropTypes.string,
          handleCallback: PropTypes.func,
        })
      ),
    }),
  }),
  inputSearch: PropTypes.shape({
    onSubmit: PropTypes.func,
  }),
  displaySchema: PropTypes.object.isRequired,
  schema: PropTypes.object.isRequired,
  toggleColumn: PropTypes.func,
  handleHideAllColumns: PropTypes.func,
  handleShowAllColumns: PropTypes.func,
}

export default Toolbar
