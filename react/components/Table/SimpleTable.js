import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Column, Table as VirtualTable, AutoSizer } from 'react-virtualized'
import ArrowDown from '../icon/ArrowDown'
import ArrowUp from '../icon/ArrowUp'
const ARROW_SIZE = 11
const HEADER_HEIGHT = 36

class SimpleTable extends PureComponent {
  toggleSortType = key => {
    const {
      sort: { sortOrder, sortedBy },
    } = this.props
    if (sortedBy !== key || (sortedBy === key && sortOrder !== 'ASC')) {
      return {
        sortOrder: 'ASC',
        sortedBy: key,
      }
    }
    return {
      sortOrder: 'DESC',
      sortedBy: key,
    }
  }

  render() {
    const {
      schema,
      items,
      indexColumnLabel,
      disableHeader,
      onRowClick,
      onRowMouseOver,
      onRowMouseOut,
      containerHeight,
      sort: { sortOrder, sortedBy },
      onSort,
      updateTableKey,
      rowHeight,
    } = this.props
    const properties = Object.keys(schema.properties)
    // hydrate items with index when 'indexColumn' prop is true
    const newItems =
      indexColumnLabel && items.length > 0
        ? items.map((item, index) => ({
            ...item,
            _reactVirtualizedIndex: index + 1,
          }))
        : items
    return (
      <div
        className="vh-100"
        style={containerHeight ? { height: containerHeight } : {}}>
        <AutoSizer>
          {({ width, height }) => (
            <VirtualTable
              updateTableKey={updateTableKey}
              width={width}
              height={height}
              headerHeight={HEADER_HEIGHT}
              rowHeight={rowHeight}
              rowCount={newItems.length}
              rowGetter={({ index }) => newItems[index]}
              className="flex flex-column"
              headerClassName="c-muted-2 f6"
              disableHeader={disableHeader}
              onRowClick={({ event, index, rowData }) => {
                onRowClick && onRowClick({ event, index, rowData })
              }}
              onRowMouseOver={({ event, index, rowData }) => {
                onRowMouseOver && onRowMouseOver({ event, index, rowData })
              }}
              onRowMouseOut={({ event, index, rowData }) => {
                onRowMouseOut && onRowMouseOut({ event, index, rowData })
              }}
              rowClassName={({ index }) =>
                `flex flex-row items-center ${
                  index === -1 ? 'bt bb' : 'bb'
                } b--muted-4 ${
                  onRowClick && index !== -1
                    ? 'pointer hover-bg-near-white hover-c-link'
                    : ''
                }`
              }>
              {indexColumnLabel && (
                <Column
                  headerRenderer={() => (
                    <span className="ph4">{indexColumnLabel}</span>
                  )}
                  cellRenderer={({ cellData }) => (
                    <span className="ph4">{cellData}</span>
                  )}
                  dataKey="_reactVirtualizedIndex"
                  label={indexColumnLabel}
                  width={width / 10} // since index are only integers 10% of table width is enough
                />
              )}
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
                            {schema.properties[key].sortable ? (
                              <span
                                className="pointer c-muted-1 b f6"
                                onClick={() => {
                                  onSort(this.toggleSortType(key))
                                }}>
                                {`${label} `}
                                {sortOrder === 'ASC' && sortedBy === key ? (
                                  <ArrowDown size={ARROW_SIZE} />
                                ) : sortOrder === 'DESC' && sortedBy === key ? (
                                  <ArrowUp size={ARROW_SIZE} />
                                ) : null}
                              </span>
                            ) : (
                              label
                            )}
                          </div>
                        )
                      })
                    }
                    cellRenderer={
                      cellRenderer ||
                      (({ cellData }) => (
                        <div className="truncate ph4">{cellData}</div>
                      ))
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

SimpleTable.defaultProps = {
  indexColumnLabel: null,
  items: [],
  disableHeader: false,
  sort: {
    sortOrder: null,
    sortedBy: null,
  },
}

SimpleTable.propTypes = {
  items: PropTypes.array.isRequired,
  schema: PropTypes.object.isRequired,
  indexColumnLabel: PropTypes.string,
  disableHeader: PropTypes.bool,
  onRowClick: PropTypes.func,
  onRowMouseOver: PropTypes.func,
  onRowMouseOut: PropTypes.func,
  sort: PropTypes.shape({
    sortOrder: PropTypes.oneOf(['ASC', 'DESC']),
    sortedBy: PropTypes.string,
  }),
  onSort: PropTypes.func,
  updateTableKey: PropTypes.string,
  containerHeight: PropTypes.number,
  rowHeight: PropTypes.number.isRequired,
}

export default SimpleTable
