import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { MultiGrid, AutoSizer } from 'react-virtualized'
import ArrowDown from '../icon/ArrowDown'
import ArrowUp from '../icon/ArrowUp'
const ARROW_SIZE = 11
const HEADER_HEIGHT = 36
const DEFAULT_COLUMN_WIDTH = 200

class SimpleTable extends Component {
  constructor(props) {
    super(props)

    this.state = {
      hoverRowIndex: -1,
    }
  }

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

  handleRowHover = (rowIndex) => {
    const { onRowClick } = this.props
    if (onRowClick) {
      this.setState({
        hoverRowIndex: rowIndex,
      })
    }
  }

  render() {
    const {
      schema,
      items,
      fixFirstColumn,
      disableHeader,
      onRowClick,
      containerHeight,
      sort: { sortOrder, sortedBy },
      onSort,
      updateTableKey,
      rowHeight,
    } = this.props
    const { hoverRowIndex } = this.state
    const properties = Object.keys(schema.properties)
    const gridKey = rowHeight // this is force grids rerender when density changes

    return (
      <div
        className="vh-100 w-100"
        style={{ height: containerHeight }}>
        <AutoSizer disableHeight key={updateTableKey}>
          {({ width }) => (
            <MultiGrid
              key={gridKey}
              height={containerHeight}
              width={width}

              fixedRowCount={disableHeader ? 0 : 1}
              rowCount={disableHeader ? items.length : items.length + 1}
              rowHeight={({ index }) => index === 0 && !disableHeader ? HEADER_HEIGHT : rowHeight}
              enableFixedRowScroll={!disableHeader}
              hideTopRightGridScrollbar={!disableHeader}
              overscanRowCount={0}
              styleTopRightGrid={fixFirstColumn ? { overflowX: 'hidden' } : {}}

              fixedColumnCount={fixFirstColumn ? 1 : 0}
              columnCount={properties.length}
              columnWidth={({ index }) => schema.properties[properties[index]].width || DEFAULT_COLUMN_WIDTH}
              enableFixedColumnScroll
              overscanColumnCount={0}

              cellRenderer={({
                columnIndex,
                key,
                rowIndex,
                style,
              }) => {
                const property = properties[columnIndex]
                if (!disableHeader && rowIndex === 0) { // Header row
                  const title = schema.properties[property].title || property
                  const headerRenderer = schema.properties[property].headerRenderer
                  return (
                    <div
                      key={key}
                      style={{
                        ...style,
                        height: HEADER_HEIGHT,
                        overflowX: 'hidden',
                      }}
                      className={`flex items-center w-100 h-100 c-muted-2 f6 truncate ph4 ${
                        columnIndex === 0 && fixFirstColumn ? 'br' : ''
                      } bt bb b--muted-4`}
                    >
                      {schema.properties[property].sortable
                        ? <span className="pointer c-muted-1 b f6"
                          onClick={() => {
                            onSort(this.toggleSortType(property))
                          }}>
                          {`${title} `}
                          {sortOrder === 'ASC' && sortedBy === property
                            ? <ArrowDown size={ARROW_SIZE} />
                            : sortOrder === 'DESC' && sortedBy === property
                              ? <ArrowUp size={ARROW_SIZE} />
                              : null
                          }
                        </span>
                        : columnIndex === 0 && fixFirstColumn ? (
                          <div className="w-100 flex items-center">
                            <span>{title}</span>
                          </div>
                        )
                          : headerRenderer ? headerRenderer({ columnIndex, key, rowIndex, style }) : title
                      }
                    </div>
                  )
                }
                const cellRenderer = schema.properties[property].cellRenderer
                const rowData = items[disableHeader ? rowIndex : rowIndex - 1]
                const cellData = rowData[property]
                return (
                  <div
                    key={key}
                    style={{
                      ...style,
                      height: rowHeight,
                      width: schema.properties[properties[columnIndex]].width || DEFAULT_COLUMN_WIDTH,
                    }}
                    className={`flex items-center w-100 h-100 truncate ph4 ${
                      disableHeader && rowIndex === 0 ? 'bt' : ''
                    } bb b--muted-4 ${
                      onRowClick && rowIndex === hoverRowIndex ? 'pointer bg-near-white c-link' : ''
                    } ${
                      columnIndex === 0 && fixFirstColumn ? 'br' : ''
                    }`}
                    onClick={onRowClick ? (event) => onRowClick({ event, index: rowIndex, rowData }) : null}
                    onMouseEnter={onRowClick ? () => this.handleRowHover(rowIndex) : null}
                    onMouseLeave={onRowClick ? () => this.handleRowHover(-1) : null}
                  >
                    {cellRenderer ? cellRenderer({ cellData, rowData }) : cellData}
                  </div>
                )
              }}
            />
          )}
        </AutoSizer>
      </div>
    )
  }
}

SimpleTable.defaultProps = {
  indexColumnLabel: null,
  fixFirstColumn: false,
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
  fixFirstColumn: PropTypes.bool,
  disableHeader: PropTypes.bool,
  onRowClick: PropTypes.func,
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
