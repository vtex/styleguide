import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { cloneDeep } from 'lodash'

import Toolbar from './Toolbar'
import Pagination from '../Pagination'
import SimpleTable from './SimpleTable'

const TABLE_HEADER_HEIGHT = 36
const TABLE_CELL_HEIGHT = 64

class Table extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      displaySchema: props.schema ? this.cloneSchema(props.schema) : {},
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
    const { schema } = this.props
    const newSchema = cloneDeep(displaySchema)
    if (newSchema.properties[key]) {
      delete newSchema.properties[key]
    } else {
      newSchema.properties[key] = cloneDeep(schema.properties[key])
    }
    this.setState({ displaySchema: newSchema })
  }

  onShowAllColumns = () => {
    const { schema } = this.props
    const displaySchema = this.cloneSchema(schema, true)
    this.setState({ displaySchema })
  }

  onHideAllColumns = () => this.setState({ displaySchema: { properties: {} } })

  calculateTableHeight = (totalItems) => {
    return TABLE_HEADER_HEIGHT + (TABLE_CELL_HEIGHT * totalItems)
  }

  render() {
    const {
      items,
      schema,
      indexColumn,
      indexColumnLabel,
      disableHeader,
      onRowClick,
      onRowMouseOver,
      onRowMouseOut,
      sort,
      onSort,
      updateTableKey,
      containerClass,
      containerHeight,
      toolbar,
      pagination,
    } = this.props
    const {
      displaySchema,
    } = this.state

    return (
      <div className="vtex-resourceList__container">
        <Toolbar
          toolbar={toolbar}
          displaySchema={displaySchema}
          toggleColumn={this.toggleColumn}
          handleHideAllColumns={this.onHideAllColumns}
          handleShowAllColumns={this.onShowAllColumns}
          schema={schema}
          actions={toolbar} />
        <SimpleTable
          items={items}
          schema={displaySchema}
          indexColumn={indexColumn}
          indexColumnLabel={indexColumnLabel}
          disableHeader={disableHeader}
          onRowClick={onRowClick}
          onRowMouseOut={onRowMouseOut}
          onRowMouseOver={onRowMouseOver}
          sort={sort}
          onSort={onSort}
          updateTableKey={updateTableKey}
          containerClass={containerClass || 'vh-100'}
          containerHeight={containerHeight || this.calculateTableHeight(items.length)}
        />
        {pagination && <Pagination {...pagination} />}
      </div>
    )
  }
}

Table.defaultProps = {
  toolbar: {
    extraActions: {
      actions: [],
    },
  },
}

Table.propTypes = {
  /** Array of objects with data */
  items: PropTypes.array.isRequired,
  /** Json Schema data model for the items (example: https://jsonschema.net/) for custom examples see code from custom components */
  schema: PropTypes.object.isRequired,
  /** Should first column be row index */
  indexColumn: PropTypes.bool,
  /** Row index column label */
  indexColumnLabel: PropTypes.string,
  /** Do not render the table header (only the rows) */
  disableHeader: PropTypes.bool,
  /** Callback invoked when a user clicks on a table row. ({ event: Event, index: number, rowData: any }): void */
  onRowClick: PropTypes.func,
  /** Callback invoked when a user moves the mouse over a table row. ({ event: Event, index: number, rowData: any }): void */
  onRowMouseOver: PropTypes.func,
  /** Callback invoked when the mouse leaves a table row. ({ event: Event, index: number, rowData: any }): void */
  onRowMouseOut: PropTypes.func,
  /** Sort order and which property (key in schema) is table data sorted by. */
  sort: PropTypes.shape({
    sortOrder: PropTypes.oneOf(['ASC', 'DESC']),
    sortedBy: PropTypes.string,
  }),
  /** Callback to handle sort ({ sortOrder, sortedBy }) : object */
  onSort: PropTypes.func,
  /** Forces table re-render when changed */
  updateTableKey: PropTypes.string,
  /** In case you need precise control of table container height (number in pixels)  */
  containerHeight: PropTypes.number,
  /** CSS that goes in table container (note: it needs a defined height, default is vh-50 from tachyons) */
  containerClass: PropTypes.string,
  /** Toolbar (search and actions) */
  toolbar: PropTypes.shape({
    inputSearch: PropTypes.shape({
      onSubmit: PropTypes.func,
    }),
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
    newLine: PropTypes.shape({
      label: PropTypes.string,
      handleCallback: PropTypes.func,
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
}

export default Table
