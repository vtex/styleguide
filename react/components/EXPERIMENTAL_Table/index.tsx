import React, { FC, Fragment } from 'react'
import PropTypes, { InferProps } from 'prop-types'

import Toolbar from './Toolbar/index'
import { NAMESPACES } from './constants'
import Pagination, { PaginationProps } from './Pagination'
import BulkActions from './BulkActions'
import FilterBar from './FilterBar'
import { DENSITY_OPTIONS } from './hooks/useTableMeasures'
import { Checkboxes } from '../EXPERIMENTAL_useCheckboxTree/types'
import useTableMotion from './hooks/useTableMotion'
import Totalizer, { TotalizerProps } from './Totalizer'
import ActionBar, { ActionBarProps } from './ActionBar'
import { TableProvider } from './context'
import DataTable from './DataTable'

const Table: FC<TableProps> & TableComposites = ({
  children,
  measures,
  isRowActive,
  loading,
  emptyState,
  onRowClick,
  items,
  empty,
  rowKey,
  highlightOnHover,
  unstableRender,
  columns,
  sorting,
  testId,
}) => {
  if (!measures) {
    throw new Error('Provide measures to the Table')
  }

  const motion = useTableMotion()

  return (
    <div
      id={NAMESPACES.CONTAINER}
      data-testid={`${testId}__container`}
      style={{ minHeight: measures.tableHeight, ...motion }}
      className="flex flex-column">
      <TableProvider
        testId={testId}
        measures={measures}
        loading={{
          empty,
          loading,
          emptyState,
        }}
        head={{
          columns,
          sorting,
        }}
        body={{
          onRowClick,
          isRowActive,
          items,
          rowKey,
          highlightOnHover,
        }}>
        {unstableRender ? children : <DefaultRender>{children}</DefaultRender>}
      </TableProvider>
    </div>
  )
}

function DefaultRender({ children }) {
  return (
    <Fragment>
      {children}
      <DataTable>
        <DataTable.Head />
        <DataTable.Body
          renderer={({ rowProps }) => <DataTable.Body.Row {...rowProps} />}
        />
      </DataTable>
    </Fragment>
  )
}

export const measuresPropTypes = {
  /** Calculated table height */
  tableHeight: PropTypes.number,
  /** Height of each row */
  rowHeight: PropTypes.number,
  /** Current density of the table: compact, regular of comfortable */
  currentDensity: PropTypes.oneOf(DENSITY_OPTIONS),
  /** Sets the current density */
  setCurrentDensity: PropTypes.func,
}

export const tablePropTypes = {
  /** Table composites */
  children: PropTypes.node,
  /** Return of the useCheckboxTree hook */
  checkboxes: PropTypes.any,
  /** Return of the useTableMeasures hook */
  measures: PropTypes.shape(measuresPropTypes),
  /** Function that generates row keys */
  rowKey: PropTypes.func,
  /** If the table is empty or not */
  empty: PropTypes.bool,
  /** Array of columns */
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      /** Column id */
      id: PropTypes.string.isRequired,
      /** Column title that is displayed on header */
      title: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.elementType,
        PropTypes.func,
      ]),
      /** Column fixed width. Can be pixel (number) or any other unit (string) */
      width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
      /** If the Table can be sorted using the columns as reference */
      sortable: PropTypes.bool,
      /** How columns cells should be rendered */
      cellRenderer: PropTypes.func,
      /** If the column is exented or not */
      extended: PropTypes.bool,
      /** If the column is condensed or not */
      condensed: PropTypes.arrayOf(PropTypes.string),
    })
  ),
  /** Array of items */
  items: PropTypes.arrayOf(PropTypes.object),
  /** If the Table is loading or not */
  loading: PropTypes.oneOfType([
    PropTypes.shape({
      renderAs: PropTypes.func,
    }),
    PropTypes.bool,
  ]),
  /** Function trigged on a row click */
  onRowClick: PropTypes.func,
  /** Function that defines if a row is active or not */
  isRowActive: PropTypes.func,
  /** Table EmptyState component */
  emptyState: PropTypes.shape({
    label: PropTypes.string,
    children: PropTypes.element,
  }),
  /** Sorting properties */
  sorting: PropTypes.shape({
    /** Sorted properties */
    sorted: PropTypes.shape({
      /** Columns that is currently sorting the items */
      by: PropTypes.string,
      /** If is ascending or descending */
      order: PropTypes.string,
    }),
    /** Clear the sorting */
    clear: PropTypes.func,
    /** Sort function */
    sort: PropTypes.func,
  }),
  /** Base testId */
  testId: PropTypes.string,
  /** If the rows should be highlighted on :hover */
  highlightOnHover: PropTypes.bool,
  /** If the header is sticky or not */
  stickyHeader: PropTypes.bool,
  /** YOLO 🦇 */
  unstableRender: PropTypes.bool,
}

export type TableProps = InferProps<typeof tablePropTypes> & {
  checkboxes: Checkboxes<unknown>
}

export type TableComposites = {
  Toolbar: FC
  FilterBar?: FC
  Pagination?: FC<PaginationProps>
  Bulk?: FC
  Totalizer?: FC<TotalizerProps>
  ActionBar?: FC<ActionBarProps>
  // TODO: type this
  Data?: unknown
}

Table.Toolbar = Toolbar
Table.FilterBar = FilterBar
Table.Totalizer = Totalizer
Table.Pagination = Pagination
Table.propTypes = tablePropTypes
Table.Bulk = BulkActions
Table.ActionBar = ActionBar
Table.Data = DataTable

Table.defaultProps = {
  rowKey: ({ rowData }) => `row-${rowData.id}`,
  testId: 'vtex-table-v2',
  stickyHeader: false,
}

export default Table
