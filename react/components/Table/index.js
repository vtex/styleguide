import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Column, Table as VirtualTable, AutoSizer } from 'react-virtualized'

class Table extends PureComponent {
  render() {
    const {
      schema,
      items,
      indexColumn,
      indexColumnLabel,
      disableHeader,
      onRowClick,
      onRowMouseOver,
      onRowMouseOut,
    } = this.props
    const properties = Object.keys(schema.properties)
    // hydrate items with index when 'indexColumn' prop is true
    const newItems = indexColumn
      ? items.map((item, index) => ({
        ...item,
        _reactVirtualizedIndex: index + 1,
      }))
      : items
    return (
      <div className="vh-50">
        <AutoSizer>
          {({ width, height }) => (
            <VirtualTable
              width={width}
              height={height}
              headerHeight={40}
              rowHeight={50}
              rowCount={newItems.length}
              rowGetter={({ index }) => newItems[index]}
              className="flex flex-column"
              headerClassName="b pv4"
              disableHeader={disableHeader}
              onRowClick={({ event, index, rowData }) => {
                onRowClick({ event, index, rowData })
              }}
              onRowMouseOver={({ event, index, rowData }) => {
                onRowMouseOver({ event, index, rowData })
              }}
              onRowMouseOut={({ event, index, rowData }) => {
                onRowMouseOut({ event, index, rowData })
              }}
              rowClassName={({ index }) =>
                `flex flex-row items-center pv4 ${
                  index === -1 ? 'bt bb' : 'bb'
                } b--light-gray`
              }
            >
              {indexColumn ? (
                <Column
                  headerRenderer={() => <span className="ph4">Index</span>}
                  cellRenderer={({ cellData }) => <span className="ph4">{cellData}</span>}
                  dataKey="_reactVirtualizedIndex"
                  label={indexColumnLabel}
                  width={width / 10} // 10%
                />
              ) : null}
              {properties.map((key, index) => {
                const label = schema.properties[key].title
                const cellWidthPercent = schema.properties[key].width || 25
                const cellWidth = (width * cellWidthPercent) / 100
                const headerRenderer = schema.properties[key].headerRenderer
                const cellRenderer = schema.properties[key].cellRenderer
                return (
                  <Column
                    key={index}
                    headerRenderer={
                      headerRenderer ||
                      function({ label }) {
                        return <div className="truncate ph4">{label}</div>
                      }
                    }
                    cellRenderer={
                      cellRenderer ||
                      function({ cellData }) {
                        return <div className="truncate ph4">{cellData}</div>
                      }
                    }
                    dataKey={key}
                    label={label}
                    width={cellWidth}
                  />
                )
              })}
            </VirtualTable>
          )}
        </AutoSizer>
      </div>
    )
  }
}

Table.defaultProps = {
  indexColumn: false,
  indexColumnLabel: 'Index',
  disableHeader: false,
  onRowClick: () => {},
  onRowMouseOut: () => {},
  onRowMouseOver: () => {},
}

Table.propTypes = {
  /** Array of objects with data */
  items: PropTypes.array.isRequired,
  /** Json Schema data model for the items */
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
}

export default Table
