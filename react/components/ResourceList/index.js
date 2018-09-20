import React, { PureComponent, Fragment } from 'react'
import PropTypes from 'prop-types'

import Table from '../Table'
import Pagination from '../Pagination'
import InputSearch from '../InputSearch'
import Button from '../Button'
import Toggle from '../Toggle'
import IconDownload from '../icon/Download'
import IconUpload from '../icon/Upload'
const MAX_FIELDS_BOX_HEIGHT = 192

class ResourceList extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      clonedSchema: props.table.schema ? this.cloneSchema(props.table.schema) : {},
      showFieldsOptions: false,
    }
  }

  cloneSchema = (schema, showAll = false) => {
    const clonedSchema = { properties: {} }
    Object.keys(schema.properties).forEach(key => {
      if (!schema.properties[key].hidden || showAll) {
        clonedSchema.properties[key] = { ...schema.properties[key] }
      }
    })
    return clonedSchema
  }

  toggleFieldsSelector = () => {
    this.setState({ showFieldsOptions: !this.state.showFieldsOptions })
  }

  toggleColumn = (key) => {
    const { clonedSchema } = this.state
    const { table: { schema } } = this.props
    const newSchema = { properties: { ...clonedSchema.properties } }
    if (clonedSchema.properties[key]) {
      delete newSchema.properties[key]
    } else {
      newSchema.properties[key] = { ...schema.properties[key] }
    }
    this.setState({ clonedSchema: newSchema })
  }

  handleShowAllColumns = () => {
    const { table: { schema } } = this.props
    const clonedSchema = this.cloneSchema(schema, true)
    this.setState({ clonedSchema })
  }

  handleHideAllColumns = () => this.setState({ clonedSchema: { properties: {} } })

  calculateFieldsBoxHeight = () => {
    const { table: { schema } } = this.props
    const estimate = Object.keys(schema.properties).length * 36
    return estimate > MAX_FIELDS_BOX_HEIGHT ? MAX_FIELDS_BOX_HEIGHT : estimate
  }

  handleInputSearchSubmit = e => {
    this.props.inputSearch.onSubmit && this.props.inputSearch.onSubmit(e)
  }

  render() {
    const {
      table,
      actions: { download, upload, fields },
      pagination,
      inputSearch,
    } = this.props
    const {
      clonedSchema,
      showFieldsOptions,
    } = this.state
    const showdownload = download && download.label
    const showupload = upload && upload.label
    const showfields = fields && fields.label

    return (
      <div className="vtex-resourceList__container">
        <div className="mb5 flex flex-row justify-between w-100">
          <div id="toolbar">
            {showfields && (
              <Fragment>
                <Button
                  variation="tertiary"
                  size="small"
                  // eslint-disable-next-line react/jsx-handler-names
                  onClick={this.toggleFieldsSelector}
                >
                  <span className="flex align-baseline">
                    <span className="mr3">
                      <IconDownload color="currentColor" />
                    </span>
                    {fields.label}
                  </span>
                </Button>
                {showFieldsOptions && (
                  <div className="absolute z-999 ba b--light-gray br2">
                    <div className="vtex-card card w-100 b2 br2 bg-base" style={{ width: 282 }}>
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
                          Object.keys(table.schema.properties).map((field, index) => {
                            return (
                              <div key={index} className="flex justify-between ph6 pv3">
                                <span className="w-70 truncate">
                                  {table.schema.properties[field].title || field}
                                </span>
                                <Toggle
                                  size="small"
                                  checked={!!clonedSchema.properties[field]}
                                  onChange={() => this.toggleColumn(field)} />
                              </div>
                            )
                          })
                        }
                      </div>
                    </div>
                  </div>
                )}
              </Fragment>
            )}
            {showdownload && (
              <Button
                variation="tertiary"
                size="small"
                onClick={download.handleCallback}
              >
                <span className="flex align-baseline">
                  <span className="mr3">
                    <IconDownload color="currentColor" />
                  </span>
                  {download.label}
                </span>
              </Button>
            )}
            {showupload && (
              <Button
                variation="tertiary"
                size="small"
                onClick={upload.handleCallback}
              >
                <span className="flex align-baseline">
                  <span className="mr3">
                    <IconUpload color="currentColor" />
                  </span>
                  {upload.label}
                </span>
              </Button>
            )}
          </div>
          {inputSearch && (
            <form className="w-30" onSubmit={this.handleInputSearchSubmit}>
              <InputSearch {...inputSearch} />
            </form>
          )}
        </div>

        <Table
          {...table}
          schema={clonedSchema}
          containerClass="vh-100"
          containerHeight={36 + (64 * table.items.length)}
        />

        {pagination && <Pagination {...pagination} />}
      </div>
    )
  }
}

ResourceList.defaultProps = {
  actions: {},
}

ResourceList.propTypes = {
  table: PropTypes.shape({
    items: PropTypes.array,
    schema: PropTypes.object,
  }),
  actions: PropTypes.shape({
    download: PropTypes.shape({
      label: PropTypes.string,
      handleCallback: PropTypes.func,
    }),
    upload: PropTypes.shape({
      label: PropTypes.string,
      handleCallback: PropTypes.func,
    }),
    fields: PropTypes.shape({
      label: PropTypes.string,
      showAllLabel: PropTypes.string,
      hideAllLabel: PropTypes.string,
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
