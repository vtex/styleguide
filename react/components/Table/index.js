import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Column, Table as VirtualTable, AutoSizer } from 'react-virtualized'
import ArrowDown from '../icon/ArrowDown'
import ArrowUp from '../icon/ArrowUp'

class Table extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      sortAsc: [],
      sortDesc: [],
      sortDefault: [],
    }
  }

  componentDidMount() {
    const { schema } = this.props
    const sortAsc = []
    const sortDesc = []
    const sortDefault = []
    Object.keys(schema.properties).forEach(key => {
      if (schema.properties[key].sort) {
        switch (schema.properties[key].sort.initialOrder) {
          case 'ASC':
            sortAsc.push(key)
            break
          case 'DESC':
            sortDesc.push(key)
            break
          default: // no-order
            sortDefault.push(key)
            break
        }
      }
    })
    this.setState({ sortAsc, sortDesc, sortDefault })
  }

  toggleSortType = (key) => {
    const { sortAsc, sortDesc, sortDefault } = this.state
    if (sortAsc.includes(key)) {
      this.removeFromArray(sortAsc, key)
      const newSortDesc = sortDesc.concat([key])
      this.setState({ sortAsc, sortDesc: newSortDesc })
      return 'DESC'
    } else if (sortDesc.includes(key)) {
      this.removeFromArray(sortDesc, key)
      const newSortDefault = sortDefault.concat([key])
      this.setState({ sortDesc, sortDefault: newSortDefault })
      return 'no-order'
    }
    this.removeFromArray(sortDefault, key)
    const newSortAsc = sortAsc.concat([key])
    this.setState({ sortAsc: newSortAsc, sortDefault })
    return 'ASC'
  }

  removeFromArray = (arr, key) => {
    const index = arr.indexOf(key)
    arr.splice(index, 1)
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
    const { sortAsc, sortDesc } = this.state
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
                            {schema.properties[key].sort
                              ? <span className="pointer"
                                onClick={() => {
                                  const sortType = this.toggleSortType(key, schema.properties[key].sort)
                                  schema.properties[key].sort.callback(sortType)
                                }}>
                                {`${label} `}{sortAsc.includes(key)
                                  ? <ArrowDown size={11} />
                                  : sortDesc.includes(key)
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
}

export default Table
