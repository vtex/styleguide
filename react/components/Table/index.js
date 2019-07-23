import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import map from 'lodash/map'

import Box from '../Box'
import Pagination from '../Pagination'
import EmptyState from '../EmptyState'
import FilterBar from '../FilterBar'

import SimpleTable from './SimpleTable'
import Toolbar from './Toolbar'
import Totalizers from '../Totalizer'
import BulkActions from './BulkActions'

import useTableState from './hooks/useTableState'
import { TableProvider } from './context'

const Table = ({
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
  children,
}) => {
  const {
    state,
    setDensity,
    toggleColumn,
    showAllColumns,
    hideAllColumns,
    selectAllRows,
    deselectAllRows,
    displaySchema,
    data,
    staticSchema,
    tablePagination,
    hasPrimaryBulkAction,
    hasSecondaryBulkActions,
    isEmptyState,
    tableHeight,
  } = useTableState(schema, items, density, bulkActions, pagination)

  useEffect(() => {
    if (toolbar && children) {
      throw new Error('Choose only one aproach')
    }
  }, [])

  return (
    <TableProvider
      value={{
        state,
        toggleColumn,
        hideAllColumns,
        showAllColumns,
        setDensity,
        staticSchema,
      }}>
      <div className="vtex-table__container">
        {children ||
          (toolbar && (
            <Toolbar loading={loading} toolbar={toolbar} actions={toolbar} />
          ))}

        {filters && (
          <div className="mb5">
            <FilterBar {...filters} />
          </div>
        )}

        {totalizers && totalizers.length > 0 && (
          <Totalizers items={totalizers} />
        )}

        <BulkActions
          hasPrimaryBulkAction={hasPrimaryBulkAction}
          hasSecondaryBulkActions={hasSecondaryBulkActions}
          selectedRows={state.selectedRows}
          bulkActions={bulkActions}
          allLinesSelected={state.allLinesSelected}
          onSelectAllLines={selectAllRows}
          onDeselectAllLines={deselectAllRows}
        />

        {isEmptyState ? (
          <Box>
            <EmptyState title={emptyStateLabel}>
              {emptyStateChildren}
            </EmptyState>
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
            containerHeight={containerHeight || tableHeight}
            selectedRowsIndexes={map(state.selectedRows, 'id')}
            density={state.selectedDensity}
          />
        )}

        {!loading && tablePagination && <Pagination {...tablePagination} />}
      </div>
    </TableProvider>
  )
}

Table.Toolbar = Toolbar

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
  items: PropTypes.array,
  /** JSON defining the data model schema for the items (More info about it after the examples) */
  schema: PropTypes.object,
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
  /** Children that replaces the toolbar */
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
}

export default Table
