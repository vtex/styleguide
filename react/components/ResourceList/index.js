import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

import Table from '../Table'
import Pagination from '../Pagination'
import InputSearch from '../InputSearch'
import Button from '../Button'
import Toggle from '../Toggle'
import IconDownload from '../icon/Download'
import IconUpload from '../icon/Upload'
import IconCaretDown from '../icon/CaretDown'
import IconColumns from '../icon/Columns'
import { cloneDeep } from 'lodash'
const MAX_FIELDS_BOX_HEIGHT = 192
const FIELDS_BOX_ITEM_HEIGHT = 36
const FIELDS_BOX_WIDTH = 292
const TABLE_HEADER_HEIGHT = 36
const TABLE_CELL_HEIGHT = 64
const EXTRA_ACTIONS_BOX_WIDTH = 199

class ResourceList extends PureComponent {
  constructor(props) {
    super(props)
    this.fieldsBtnRef = React.createRef()
    this.extraActionsBtnRef = React.createRef()
    this.state = {
      displaySchema: props.table.schema ? this.cloneSchema(props.table.schema) : {},
      isFieldsBoxVisible: false,
      isExtraActionsBoxVisible: false,
    }
  }

  cloneSchema = (schema, showAll = false) => {
    const displaySchema = cloneDeep(schema)
    Object.keys(displaySchema.properties).forEach(key => {
      if (displaySchema.properties[key].hidden && !showAll) {
        delete displaySchema.properties[key]
      }
    })
    return displaySchema
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

  toggleExtraActionsSelector = () => {
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
      this.toggleExtraActionsSelector()
    }
  }

  toggleColumn = (key) => {
    const { displaySchema } = this.state
    const { table: { schema } } = this.props
    const newSchema = cloneDeep(displaySchema)
    if (newSchema.properties[key]) {
      delete newSchema.properties[key]
    } else {
      newSchema.properties[key] = cloneDeep(schema.properties[key])
    }
    this.setState({ displaySchema: newSchema })
  }

  handleShowAllColumns = () => {
    const { table: { schema } } = this.props
    const displaySchema = this.cloneSchema(schema, true)
    this.setState({ displaySchema })
  }

  handleHideAllColumns = () => this.setState({ displaySchema: { properties: {} } })

  calculateFieldsBoxHeight = () => {
    const { table: { schema } } = this.props
    const estimate = Object.keys(schema.properties).length * FIELDS_BOX_ITEM_HEIGHT
    return estimate > MAX_FIELDS_BOX_HEIGHT ? MAX_FIELDS_BOX_HEIGHT : estimate
  }

  calculateTableHeight = (totalItems) => {
    return TABLE_HEADER_HEIGHT + (TABLE_CELL_HEIGHT * totalItems)
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
      table,
      actions: { download, upload, fields, extraActions },
      pagination,
      inputSearch,
    } = this.props
    const {
      displaySchema,
      isFieldsBoxVisible,
      isExtraActionsBoxVisible,
    } = this.state
    const isDownloadVisible = download && download.label
    const isUploadVisible = upload && upload.label
    const isFieldsVisible = fields && fields.label
    const isExtraActionsVisible = extraActions && extraActions.label && extraActions.actions.length > 0

    return (
      <div className="vtex-resourceList__container">
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
                          onClick={this.handleShowAllColumns}
                        >{fields.showAllLabel}</Button>
                        <div className="mh4">
                          <Button
                            variation="secondary"
                            size="small"
                            onClick={this.handleHideAllColumns}
                          >{fields.hideAllLabel}</Button>
                        </div>
                      </div>
                      <div style={{ height: this.calculateFieldsBoxHeight() }} className="overflow-scroll">
                        {
                          Object.keys(table.schema.properties).map((field, index) => (
                            <div
                              key={index}
                              className="flex justify-between ph6 pv3 pointer hover-bg-light-silver"
                              onClick={() => this.toggleColumn(field)}
                            >
                              <span className="w-70 truncate">
                                {table.schema.properties[field].title || field}
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
                  // eslint-disable-next-line react/jsx-handler-names
                  onClick={this.toggleExtraActionsSelector}
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
                          extraActions.actions.map((action, index) => {
                            return (
                              <div
                                key={index}
                                className="flex justify-between ph6 pv3 pointer hover-bg-light-silver"
                                onClick={action.handleCallback}>
                                <span className="w-70 truncate">
                                  {action.label}
                                </span>
                              </div>
                            )
                          })
                        }
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        <Table
          {...table}
          schema={displaySchema}
          containerClass="vh-100"
          containerHeight={this.calculateTableHeight(table.items.length)}
        />

        {pagination && <Pagination {...pagination} />}
      </div>
    )
  }
}

ResourceList.defaultProps = {
  actions: {
    extraActions: {
      actions: [],
    },
  },
}

ResourceList.propTypes = {
  table: PropTypes.shape({
    items: PropTypes.array,
    schema: PropTypes.object,
  }),
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
  pagination: PropTypes.shape({
    onNextClick: PropTypes.func,
    onPrevClick: PropTypes.func,
    currentItemFrom: PropTypes.number,
    currentItemTo: PropTypes.number,
    textOf: PropTypes.string,
    totalItems: PropTypes.number,
  }),
  inputSearch: PropTypes.shape({
    onSubmit: PropTypes.func,
  }),
}

export default ResourceList
