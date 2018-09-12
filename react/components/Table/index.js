import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Column, Table as VirtualTable, AutoSizer } from 'react-virtualized'
import ArrowDown from '../icon/ArrowDown'
import ArrowUp from '../icon/ArrowUp'

class Table extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      sortedBy: props.initialSortProperty,
      sortOrder: props.initialSortOrder,
    }
  }

  toggleSortType = (key) => {
    const { sortOrder, sortedBy } = this.state
    if (sortedBy === key) {
      if (sortOrder === 'DESC' || !sortOrder) {
        const newState = {
          sortOrder: 'ASC',
        }
        this.setState(newState)
        return {
          ...newState,
          sortedBy: key,
        }
      }
      const newState = {
        sortOrder: 'DESC',
      }
      this.setState(newState)
      return {
        ...newState,
        sortedBy: key,
      }
    }
    const newState = {
      sortOrder: 'ASC',
      sortedBy: key,
    }
    this.setState(newState)
    return newState
  }

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
    const { sortOrder, sortedBy } = this.state
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
              headerHeight={36}
              rowHeight={64}
              rowCount={newItems.length}
              rowGetter={({ index }) => newItems[index]}
              className="flex flex-column"
              headerClassName="c-muted-2 f6"
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
                `flex flex-row items-center ${
                  index === -1 ? 'bt bb' : 'bb'
                } b--muted-4`
              }
            >
              {indexColumn ? (
                <Column
                  headerRenderer={() => (
                    <span className="ph4">{indexColumnLabel || 'Index'}</span>
                  )}
                  cellRenderer={({ cellData }) => (
                    <span className="ph4">{cellData}</span>
                  )}
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
                      (({ label }) => {
                        return (
                          <div className="truncate ph4">
                            {schema.properties[key].sortCallback
                              ? <span className="pointer"
                                onClick={() => {
                                  const sortTypeData = this.toggleSortType(key)
                                  schema.properties[key].sortCallback(sortTypeData)
                                }}>
                                {`${label} `}{sortOrder === 'ASC' && sortedBy === key
                                  ? <ArrowDown size={11} />
                                  : sortOrder === 'DESC' && sortedBy === key
                                    ? <ArrowUp size={11} />
                                    : null}
                              </span>
                              : label
                            }
                          </div>
                        )
                      })
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
  initialSortOrder: null,
  initialSortProperty: null,
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
  /** Sinalize to Table header wich property (key in schema) is initially sorted (if your items are sorted by any of them) */
  initialSortProperty: PropTypes.string,
  /** Sinalize to Table header the order which your items are initially sorted (if your items are already sorted on first render) */
  initialSortOrder: PropTypes.oneOf(['ASC', 'DESC']),
}

export default Table
