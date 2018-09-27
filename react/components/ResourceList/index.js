import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

import Table from '../Table'
import Toolbar from './Toolbar'
import Pagination from '../Pagination'
import { cloneDeep } from 'lodash'
const TABLE_HEADER_HEIGHT = 36
const TABLE_CELL_HEIGHT = 64

class ResourceList extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      displaySchema: props.table.schema ? this.cloneSchema(props.table.schema) : {},
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

  onShowAllColumns = () => {
    const { table: { schema } } = this.props
    const displaySchema = this.cloneSchema(schema, true)
    this.setState({ displaySchema })
  }

  onHideAllColumns = () => this.setState({ displaySchema: { properties: {} } })

  calculateTableHeight = (totalItems) => {
    return TABLE_HEADER_HEIGHT + (TABLE_CELL_HEIGHT * totalItems)
  }

  render() {
    const {
      table,
      actions,
      pagination,
      inputSearch,
    } = this.props
    const {
      displaySchema,
    } = this.state

    return (
      <div className="vtex-resourceList__container">
        <Toolbar
          inputSearch={inputSearch}
          displaySchema={displaySchema}
          toggleColumn={this.toggleColumn}
          handleHideAllColumns={this.onHideAllColumns}
          handleShowAllColumns={this.onShowAllColumns}
          schema={table.schema}
          actions={actions} />
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
