import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import reduce from 'lodash/reduce'

import Box from '../Box'
import Pagination from '../Pagination'
import SimpleTable from './SimpleTable'
import Toolbar from './Toolbar'
import EmptyState from '../EmptyState'
import Totalizers from './Totalizers'

const TABLE_HEADER_HEIGHT = 36
const EMPTY_STATE_SIZE_IN_ROWS = 5

class Table extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      hiddenFields: this.getInitialHiddenFieldsFromSchema(props.schema),
      tableRowHeight: this.getRowHeight(props.density),
      selectedDensity: props.density,
    }
  }

  getInitialHiddenFieldsFromSchema = schema => {
    const hiddenFields = []
    Object.keys(schema.properties).forEach(key => {
      if (schema.properties[key].hidden) {
        hiddenFields.push(key)
      }
    })
    return hiddenFields
  }

  getRowHeight = density => {
    switch (density) {
      case 'low':
        return 76
      case 'medium':
        return 48
      case 'high':
        return 32
      default:
        return 45
    }
  }

  toggleTableRowHeight = density => {
    const { tableRowHeight } = this.state
    const newHeight = this.getRowHeight(density)
    if (tableRowHeight !== newHeight) {
      this.setState({
        tableRowHeight: newHeight,
        selectedDensity: density,
      })
    }
  }

  toggleColumn = key => {
    const { hiddenFields } = this.state
    const newFieldsArray = hiddenFields.slice()
    const index = hiddenFields.indexOf(key)
    index === -1 ? newFieldsArray.push(key) : newFieldsArray.splice(index, 1)
    this.setState({ hiddenFields: newFieldsArray })
  }

  onShowAllColumns = () => this.setState({ hiddenFields: [] })

  onHideAllColumns = () =>
    this.setState({ hiddenFields: Object.keys(this.props.schema.properties) })

  calculateTableHeight = totalItems => {
    const { tableRowHeight } = this.state
    const multiplicator =
      totalItems !== 0 ? totalItems : EMPTY_STATE_SIZE_IN_ROWS
    return TABLE_HEADER_HEIGHT + tableRowHeight * multiplicator
  }

  render() {
    const {
      items,
      schema,
      disableHeader,
      emptyStateLabel,
      fixFirstColumn,
      onRowClick,
      sort,
      onSort,
      updateTableKey,
      containerHeight,
      toolbar,
      pagination,
      fullWidth,
      lineActions,
      loading,
      totalizers,
    } = this.props
    const { hiddenFields, tableRowHeight, selectedDensity } = this.state

    const properties = Object.keys(schema.properties)
    const emptyState = !!(
      properties.length === 0 || properties.length === hiddenFields.length
    )
    const displayProperties = reduce(
      schema.properties,
      (acc, value, key) => {
        if (hiddenFields.includes && hiddenFields.includes(key)) {
          return acc
        }
        return { ...acc, [key]: value }
      },
      {}
    )
    const displaySchema = {
      ...schema,
      properties: displayProperties,
    }

    return (
      <div className="vtex-table__container">
        <Toolbar
          loading={loading}
          toolbar={toolbar}
          hiddenFields={hiddenFields}
          toggleColumn={this.toggleColumn}
          handleHideAllColumns={this.onHideAllColumns}
          handleShowAllColumns={this.onShowAllColumns}
          handleToggleDensity={this.toggleTableRowHeight}
          selectedDensity={selectedDensity}
          schema={schema}
          actions={toolbar}
        />
        {totalizers && totalizers.length > 0 && (
          <Totalizers items={totalizers} />
        )}
        {emptyState ? (
          <Box>
            <EmptyState title={emptyStateLabel} />
          </Box>
        ) : (
          <SimpleTable
            fullWidth={fullWidth}
            items={items}
            schema={displaySchema}
            fixFirstColumn={fixFirstColumn}
            rowHeight={tableRowHeight}
            disableHeader={disableHeader}
            emptyStateLabel={emptyStateLabel}
            onRowClick={onRowClick}
            sort={sort}
            onSort={onSort}
            key={hiddenFields.toString()}
            updateTableKey={updateTableKey}
            lineActions={lineActions}
            loading={loading}
            containerHeight={
              containerHeight || this.calculateTableHeight(items.length)
            }
          />
        )}
        {!loading && pagination && <Pagination {...pagination} />}
      </div>
    )
  }
}

Table.defaultProps = {
  loading: false,
  density: 'medium',
  fixFirstColumn: false,
  toolbar: {
    extraActions: {
      actions: [],
    },
  },
  emptyStateLabel: 'Nothing to show.',
  fullWidth: false,
  totalizers: [],
}

Table.propTypes = {
  /** Array of objects with data */
  items: PropTypes.array.isRequired,
  /** Json Schema data model for the items (example: https://jsonschema.net/) for custom examples see code from custom components */
  schema: PropTypes.object.isRequired,
  /** Do not render the table header (only the rows) */
  disableHeader: PropTypes.bool,
  /** Fix first column so only the following ones scroll horizontaly */
  fixFirstColumn: PropTypes.bool,
  /** Callback invoked when a user clicks on a table row. ({ event: Event, index: number, rowData: any }): void */
  onRowClick: PropTypes.func,
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
  /** Row info visual density  */
  density: PropTypes.oneOf(['low', 'medium', 'high']),
  /** Label for emptystate  */
  emptyStateLabel: PropTypes.string,
  /** Full width property  */
  fullWidth: PropTypes.bool,
  /** Line actions column */
  lineActions: PropTypes.arrayOf(
    PropTypes.shape({
      /** Function that returns a string for the action label */
      label: PropTypes.func,
      /** Mark whether the action performs a dangerous option or not */
      isDangerous: PropTypes.bool,
      /** Handles the callback function of the action */
      onClick: PropTypes.func,
    })
  ),
  /** Controls the table loading state */
  loading: PropTypes.bool,
  /** Toolbar (search and actions) */
  toolbar: PropTypes.shape({
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
      alignMenu: PropTypes.oneOf(['right', 'left']),
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
  /** Totalizers property  */
  totalizers: PropTypes.array,
}

export default Table
