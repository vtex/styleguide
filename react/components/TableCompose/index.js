import React, { useEffect, useMemo, useReducer } from 'react'
import PropTypes from 'prop-types'
import reduce from 'lodash/reduce'
import map from 'lodash/map'

import Box from '../Box'
import Pagination from '../Pagination'
import EmptyState from '../EmptyState'
import FilterBar from '../FilterBar'

import SimpleTable from './SimpleTable'
import Toolbar from './Toolbar'
import CheckboxContainer from './CheckboxContainer'
import Totalizers from '../Totalizer'
import BulkActions from './BulkActions'

import {
  getRowHeight,
  getInitialHiddenFieldsFromSchema,
  calculateTableHeight,
  handleSelectionChange,
} from './util'

const types = {
  SET_DENSITY: 0,
  DESELECT_ALL_LINES: 1,
  SELECT_ALL_LINES: 2,
  SELECT_LINE: 3,
  HIDE_COLUMN: 4,
  HIDE_ALL_COLUMNS: 5,
  UNHIDE_ALL_COLUMNS: 6,
}

function reducer(state, action) {
  switch (action.type) {
    case types.SET_DENSITY: {
      return {
        ...state,
        selectedDensity: action.density,
        tableRowHeight: getRowHeight(action.density),
      }
    }
    case types.DESELECT_ALL_LINES: {
      return {
        ...state,
        selectedRows: [],
        allLinesSelected: false,
      }
    }
    case types.SELECT_ALL_LINES: {
      return {
        ...state,
        selectedRows: action.selectedRows,
        allLinesSelected: true,
      }
    }
    case types.SELECT_LINE: {
      return state.selectedRows.some(el => el.id === action.row.id)
        ? {
            ...state,
            selectedRows: state.selectedRows.filter(
              row => row.id !== action.row.id
            ),
            allLinesSelected: false,
          }
        : {
            ...state,
            selectedRows: [...state.selectedRows, action.row],
          }
    }
    case types.HIDE_COLUMN: {
      const index = state.hiddenFields.indexOf(action.key)

      return index === -1
        ? {
            ...state,
            hiddenFields: [...state.hiddenFields, action.key],
          }
        : {
            ...state,
            hiddenFields: state.hiddenFields.filter(
              field => field !== action.key
            ),
          }
    }
    case types.HIDE_ALL_COLUMNS: {
      return {
        ...state,
        hiddenFields: action.hiddenFields,
      }
    }
    case types.UNHIDE_ALL_COLUMNS: {
      return {
        ...state,
        hiddenFields: [],
      }
    }
    default: {
      return state
    }
  }
}

function Table({
  items,
  density,
  schema,
  disableHeader,
  emptyStateLabel,
  emptyStateChildren,
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
  bulkActions,
  totalizers,
  filters,
}) {
  const [state, dispatch] = useReducer(reducer, {
    tableRowHeight: getRowHeight(density),
    selectedRows: [],
    allLinesSelected: false,
    selectedDensity: density,
    hiddenFields: getInitialHiddenFieldsFromSchema(schema),
  })

  const hasPrimaryBulkAction =
    bulkActions &&
    bulkActions.main &&
    typeof bulkActions.main.handleCallback === 'function'

  const hasSecondaryBulkActions =
    bulkActions.others && bulkActions.others.length > 0

  const hasBulkActions = hasPrimaryBulkAction || hasSecondaryBulkActions

  const data = useMemo(() => {
    return hasBulkActions ? items.map((item, i) => ({ id: i, ...item })) : items
  }, [items])

  const staticSchema = useMemo(
    () =>
      hasBulkActions
        ? {
            ...schema,
            properties: {
              bulk: {
                width: 40,
                // eslint-disable-next-line
                headerRenderer: () => {
                  const selectedRowsLength = state.selectedRows.length
                  const itemsLength = data.length

                  const isChecked = selectedRowsLength === itemsLength
                  const isPartial =
                    selectedRowsLength > 0 && selectedRowsLength < itemsLength

                  return (
                    <CheckboxContainer
                      checked={isChecked}
                      onClick={handleSelectAllVisibleLines}
                      id="all"
                      partial={isPartial}
                    />
                  )
                },
                // eslint-disable-next-line
                cellRenderer: ({ rowData }) => (
                  <CheckboxContainer
                    checked={state.selectedRows.some(
                      row => row.id === rowData.id
                    )}
                    onClick={() => handleSelectLine(rowData)}
                    id={rowData.id}
                    disabled={state.allLinesSelected}
                  />
                ),
              },
              ...schema.properties,
            },
          }
        : schema,
    [state.selectedRows, state.allLinesSelected]
  )

  const displaySchema = useMemo(() => {
    return {
      ...staticSchema,
      properties: reduce(
        staticSchema.properties,
        (acc, value, key) => {
          if (state.hiddenFields.includes && state.hiddenFields.includes(key)) {
            return acc
          }
          return { ...acc, [key]: value }
        },
        {}
      ),
    }
  }, [state.hiddenFields, state.selectedRows])

  useEffect(() => {
    handleSelectionChange(
      bulkActions,
      state.allLinesSelected,
      state.selectedRows
    )
  }, [state.selectedRows, state.allLinesSelected, bulkActions])

  function handleToggleDensity(density) {
    dispatch({ type: types.SET_DENSITY, density: density })
  }

  function toggleColumn(key) {
    dispatch({ type: types.HIDE_COLUMN, key: key })
  }

  function onShowAllColumns() {
    dispatch({ type: types.UNHIDE_ALL_COLUMNS })
  }

  function onHideAllColumns() {
    dispatch({
      type: types.HIDE_ALL_COLUMNS,
      hiddenFields: Object.keys(staticSchema.properties),
    })
  }

  function handleSelectAllLines() {
    dispatch({ type: types.SELECT_ALL_LINES, selectedRows: data.selectedRows })
  }

  function handleSelectAllVisibleLines() {
    if (
      state.selectedRows.length <= data.length &&
      state.selectedRows.length !== 0
    ) {
      handleDeselectAllLines()
    } else {
      dispatch({
        type: types.SELECT_ALL_LINES,
        selectedRows: data,
      })
    }
  }

  function handleSelectLine(rowData) {
    dispatch({ type: types.SELECT_LINE, row: rowData })
  }

  function handleDeselectAllLines() {
    dispatch({ type: types.DESELECT_ALL_LINES })
  }

  const properties = Object.keys(staticSchema.properties)
  const emptyState = !!(
    properties.length === 0 || properties.length === state.hiddenFields.length
  )

  // if pagination and bulk actions features are active at the same time
  // when paginating, bulk actions active lines should be deselected
  const paginationClone = pagination ? Object.assign({}, pagination) : null
  if (paginationClone && hasBulkActions) {
    paginationClone.onNextClick = () => {
      handleDeselectAllLines()
      pagination.onNextClick()
    }
    paginationClone.onPrevClick = () => {
      handleDeselectAllLines()
      pagination.onPrevClick()
    }
  }

  return (
    <div className="vtex-table__container">
      {toolbar && (
        <Toolbar
          loading={loading}
          toolbar={toolbar}
          hiddenFields={state.hiddenFields}
          toggleColumn={toggleColumn}
          handleHideAllColumns={onHideAllColumns}
          handleShowAllColumns={onShowAllColumns}
          handleToggleDensity={handleToggleDensity}
          selectedDensity={state.selectedDensity}
          schema={staticSchema}
          actions={toolbar}
        />
      )}

      {filters && (
        <div className="mb5">
          <FilterBar {...filters} />
        </div>
      )}

      {totalizers && totalizers.length > 0 && <Totalizers items={totalizers} />}

      <BulkActions
        hasPrimaryBulkAction={hasPrimaryBulkAction}
        hasSecondaryBulkActions={hasSecondaryBulkActions}
        selectedRows={state.selectedRows}
        bulkActions={bulkActions}
        allLinesSelected={state.allLinesSelected}
        onSelectAllLines={handleSelectAllLines}
        onDeselectAllLines={handleDeselectAllLines}
      />

      {emptyState ? (
        <Box>
          <EmptyState title={emptyStateLabel}>{emptyStateChildren}</EmptyState>
        </Box>
      ) : (
        <SimpleTable
          fullWidth={fullWidth}
          items={data}
          schema={displaySchema}
          fixFirstColumn={fixFirstColumn}
          rowHeight={state.tableRowHeight}
          disableHeader={disableHeader}
          emptyStateLabel={emptyStateLabel}
          emptyStateChildren={emptyStateChildren}
          onRowClick={onRowClick}
          sort={sort}
          onSort={onSort}
          key={state.hiddenFields.toString()}
          updateTableKey={updateTableKey}
          lineActions={lineActions}
          loading={loading}
          containerHeight={
            containerHeight ||
            calculateTableHeight(state.tableRowHeight, data.length)
          }
          selectedRowsIndexes={map(state.selectedRows, 'id')}
          density={state.selectedDensity}
        />
      )}

      {!loading && paginationClone && <Pagination {...paginationClone} />}
    </div>
  )
}

Table.defaultProps = {
  loading: false,
  density: 'medium',
  fixFirstColumn: false,
  toolbar: null,
  emptyStateLabel: 'Nothing to show.',
  fullWidth: false,
  bulkActions: {},
  totalizers: [],
}

Table.propTypes = {
  /** Array of objects with data */
  items: PropTypes.array.isRequired,
  /** JSON defining the data model schema for the items (More info about it after the examples) */
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
  /** Children for emptystate  */
  emptyStateChildren: PropTypes.node,
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
      handleCallback: PropTypes.func,
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
      label: PropTypes.string.isRequired,
      handleCallback: PropTypes.func.isRequired,
      disabled: PropTypes.bool,
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
  bulkActions: PropTypes.shape({
    texts: PropTypes.shape({
      secondaryActionsLabel: PropTypes.string.isRequired,
      rowsSelected: PropTypes.func.isRequired,
      selectAll: PropTypes.string.isRequired,
      allRowsSelected: PropTypes.func.isRequired,
    }),
    totalItems: PropTypes.number,
    onChange: PropTypes.func,
    main: PropTypes.shape({
      label: PropTypes.string.isRequired,
      handleCallback: PropTypes.func.isRequired,
    }),
    others: PropTypes.arrayOf(
      PropTypes.shape({
        label: PropTypes.string.isRequired,
        handleCallback: PropTypes.func.isRequired,
      })
    ),
  }),
  /** Totalizers property  */
  totalizers: PropTypes.array,
  /** Filters property  */
  filters: PropTypes.shape({ ...FilterBar.propTypes }),
}

export default Table
