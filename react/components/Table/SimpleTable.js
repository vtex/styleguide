import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { MultiGrid, AutoSizer } from 'react-virtualized'
import ArrowDown from '../icon/ArrowDown'
import ArrowUp from '../icon/ArrowUp'
import OptionsDots from '../icon/OptionsDots'
import EmptyState from '../EmptyState'
import Spinner from '../Spinner'
import ActionMenu from '../ActionMenu'

const ARROW_SIZE = 11
const HEADER_HEIGHT = 36
const DEFAULT_COLUMN_WIDTH = 200
const LINE_ACTIONS_COLUMN_WIDTH = 70
const NO_TITLE_COLUMN = ' '
const SELECTED_ROW_BACKGROUND = '#dbe9fd'

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

  handleRowHover = rowIndex => {
    const { onRowClick } = this.props
    const { isLineActionsHovered } = this.state
    if (onRowClick && !isLineActionsHovered) {
      this.setState({
        hoverRowIndex: rowIndex,
      })
    } else {
      this.setState({
        hoverRowIndex: -1,
      })
    }
  }

  calculateColWidth = (
    schema,
    properties,
    index,
    fullWidth,
    fullWidthColWidth
  ) => {
    const col = schema.properties[properties[index]]
    return col.width
      ? col.width
      : fullWidth
      ? Math.max(col.minWidth || 100, fullWidthColWidth)
      : DEFAULT_COLUMN_WIDTH
  }

  addLineActionsToSchema = (schema, lineActions) => {
    return {
      ...schema.properties,
      // eslint-disable-next-line camelcase
      _VTEX_Table_Internal_lineActions: {
        title: NO_TITLE_COLUMN,
        width: LINE_ACTIONS_COLUMN_WIDTH,
        cellRenderer: ({ rowData }) => {
          return (
            <ActionMenu
              buttonProps={{
                variation: 'tertiary',
                icon: <OptionsDots />,
                onMouseEnter: () =>
                  this.setState({ isLineActionsHovered: true }),
                onMouseLeave: () =>
                  this.setState({ isLineActionsHovered: false }),
              }}
              options={lineActions.map(action => ({
                ...action,
                label: action.label({ rowData }),
                onClick: () => action.onClick({ rowData }),
              }))}
            />
          )
        },
      },
    }
  }

  render() {
    const {
      schema,
      items,
      fixFirstColumn,
      disableHeader,
      density,
      emptyStateLabel,
      emptyStateChildren,
      onRowClick,
      containerHeight,
      sort: { sortOrder, sortedBy },
      onSort,
      updateTableKey,
      rowHeight,
      fullWidth,
      lineActions,
      loading,
      selectedRowsIndexes,
    } = this.props
    const { hoverRowIndex } = this.state

    if (lineActions)
      schema.properties = this.addLineActionsToSchema(schema, lineActions)
    const properties = Object.keys(schema.properties)

    const tableKey = `vtex-table--${updateTableKey}--${density}`
    return (
      <div className="vh-100 w-100 dt" style={{ height: containerHeight }}>
        {loading ? (
          <div
            className="dtc v-mid tc"
            style={{ height: containerHeight - HEADER_HEIGHT }}>
            <Spinner />
          </div>
        ) : (
          <div>
            <AutoSizer key={tableKey}>
              {({ width }) => {
                const colsWidth = Object.keys(schema.properties).reduce(
                  (acc, curr) => {
                    const col = schema.properties[curr]
                    return acc + (col.width ? col.width : 0)
                  },
                  0
                )

                const colsWithoutWidth = Object.keys(schema.properties).filter(
                  curr => {
                    const col = schema.properties[curr]
                    return !col.width
                  }
                )

                const fullWidthColWidth =
                  (width - colsWidth) / colsWithoutWidth.length

                return (
                  <MultiGrid
                    height={
                      items.length === 0 ? HEADER_HEIGHT : containerHeight
                    }
                    width={width}
                    tabIndex={null}
                    fixedRowCount={disableHeader ? 0 : 1}
                    rowCount={disableHeader ? items.length : items.length + 1}
                    rowHeight={({ index }) =>
                      index === 0 && !disableHeader ? HEADER_HEIGHT : rowHeight
                    }
                    enableFixedRowScroll={!disableHeader}
                    hideTopRightGridScrollbar={!disableHeader}
                    overscanRowCount={0}
                    styleTopRightGrid={
                      fixFirstColumn ? { overflow: 'hidden' } : {}
                    }
                    styleTopLeftGrid={
                      fixFirstColumn ? { overflow: 'hidden' } : {}
                    }
                    fixedColumnCount={fixFirstColumn ? 1 : 0}
                    columnCount={properties.length}
                    columnWidth={({ index }) =>
                      this.calculateColWidth(
                        schema,
                        properties,
                        index,
                        fullWidth,
                        fullWidthColWidth
                      )
                    }
                    enableFixedColumnScroll
                    overscanColumnCount={0}
                    cellRenderer={({ columnIndex, key, rowIndex, style }) => {
                      const property = properties[columnIndex]
                      if (!disableHeader && rowIndex === 0) {
                        // Header row
                        const title =
                          schema.properties[property].title || property
                        const headerRight =
                          schema.properties[property].headerRight || false
                        const headerRenderer =
                          schema.properties[property].headerRenderer
                        const arrowIsDown =
                          sortOrder === 'ASC' && sortedBy === property
                        const arrowIsUp =
                          sortOrder === 'DESC' && sortedBy === property
                        return (
                          <div
                            key={key}
                            style={{
                              ...style,
                              height: HEADER_HEIGHT,
                            }}
                            className={`flex items-center w-100 h-100 c-muted-2 f6 truncate ph4 ${
                              columnIndex === 0 && fixFirstColumn ? 'br' : ''
                            } bt bb b--muted-4 overflow-x-hidden ${
                              headerRight ? 'tr' : 'tl'
                            }`}>
                            {schema.properties[property].sortable ? (
                              <div
                                className="w-100 pointer c-muted-1 b t-small"
                                onClick={() => {
                                  onSort(this.toggleSortType(property))
                                }}>
                                {!headerRight && title}
                                <div
                                  className={`inline-flex ${
                                    headerRight ? 'pr2' : 'pl3'
                                  }`}>
                                  {arrowIsDown ? (
                                    <ArrowDown size={ARROW_SIZE} />
                                  ) : arrowIsUp ? (
                                    <ArrowUp size={ARROW_SIZE} />
                                  ) : null}
                                </div>
                                {headerRight && title}
                              </div>
                            ) : columnIndex === 0 && fixFirstColumn ? (
                              <div className="w-100">{title}</div>
                            ) : headerRenderer ? (
                              headerRenderer({
                                columnIndex,
                                key,
                                rowIndex,
                                style,
                                title,
                              })
                            ) : (
                              <span className="w-100">{title}</span>
                            )}
                          </div>
                        )
                      }
                      const cellRenderer =
                        schema.properties[property].cellRenderer
                      const rowData =
                        items[disableHeader ? rowIndex : rowIndex - 1]
                      const cellData = rowData[property]

                      return (
                        <div
                          key={key}
                          style={{
                            ...style,
                            height: rowHeight,
                            width: this.calculateColWidth(
                              schema,
                              properties,
                              columnIndex,
                              fullWidth,
                              fullWidthColWidth
                            ),
                            backgroundColor: selectedRowsIndexes.includes(
                              rowIndex - 1
                            )
                              ? SELECTED_ROW_BACKGROUND
                              : '',
                          }}
                          className={`flex items-center w-100 h-100 ph4 bb
                            b--muted-4 truncate ${
                              disableHeader && rowIndex === 0 ? 'bt' : ''
                            } ${
                            onRowClick && rowIndex === hoverRowIndex
                              ? 'pointer bg-near-white c-link'
                              : ''
                          } ${columnIndex === 0 && fixFirstColumn ? 'br' : ''}`}
                          onClick={
                            onRowClick &&
                            property !== '_VTEX_Table_Internal_lineActions'
                              ? event =>
                                  onRowClick({
                                    event,
                                    index: rowIndex,
                                    rowData,
                                  })
                              : null
                          }
                          onMouseEnter={
                            onRowClick
                              ? () => this.handleRowHover(rowIndex)
                              : null
                          }
                          onMouseLeave={
                            onRowClick ? () => this.handleRowHover(-1) : null
                          }>
                          {cellRenderer
                            ? cellRenderer({
                                cellData,
                                rowData,
                              })
                            : cellData}
                        </div>
                      )
                    }}
                  />
                )
              }}
            </AutoSizer>
            {items.length === 0 && (
              <div style={{ marginTop: HEADER_HEIGHT }}>
                <EmptyState title={emptyStateLabel}>
                  {emptyStateChildren}
                </EmptyState>
              </div>
            )}
          </div>
        )}
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
  fullWidth: false,
  selectedRowsIndexes: [],
}

SimpleTable.propTypes = {
  items: PropTypes.array.isRequired,
  schema: PropTypes.object.isRequired,
  indexColumnLabel: PropTypes.string,
  fixFirstColumn: PropTypes.bool,
  density: PropTypes.string,
  disableHeader: PropTypes.bool,
  onRowClick: PropTypes.func,
  emptyStateLabel: PropTypes.string,
  emptyStateChildren: PropTypes.node,
  sort: PropTypes.shape({
    sortOrder: PropTypes.oneOf(['ASC', 'DESC']),
    sortedBy: PropTypes.string,
  }),
  onSort: PropTypes.func,
  updateTableKey: PropTypes.string,
  containerHeight: PropTypes.number,
  rowHeight: PropTypes.number.isRequired,
  fullWidth: PropTypes.bool,
  lineActions: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.func,
      isDangerous: PropTypes.bool,
      onClick: PropTypes.func,
    })
  ),
  loading: PropTypes.bool,
  selectedRowsIndexes: PropTypes.array,
}

export default SimpleTable
