import React, { FC } from 'react'
import PropTypes, { InferProps } from 'prop-types'

import Toolbar from './Toolbar/index'
import { NAMESPACES } from './constants'
import Pagination, { PaginationProps } from './Pagination'
import DataTable from './DataTable'
import BulkActions from './BulkActions'
import FilterBar from './FilterBar'
import Headings from './DataTable/Headings'
import Rows from './DataTable/Rows'
import { DENSITY_OPTIONS } from './hooks/useTableMeasures'
import { Checkboxes } from '../EXPERIMENTAL_useCheckboxTree/types'
import useTableMotion from './hooks/useTableMotion'
import Totalizer, { TotalizerProps } from './Totalizer'
import ActionBar, { ActionBarProps } from './ActionBar'
import { TableProvider } from './context'

const Table: FC<TableProps> & TableComposites = ({
  children,
  measures,
  isRowActive,
  loading,
  emptyState,
  empty,
  checkboxes,
  rowKey,
  ...props
}) => {
  if (!measures) {
    throw new Error('Provide measures to the Table')
  }

  const { tableHeight, rowHeight, currentDensity } = measures
  const { columns, onRowClick, items, sorting, testId } = props
  const motion = useTableMotion()

  return (
    <div
      id={NAMESPACES.CONTAINER}
      data-testid={`${testId}__container`}
      style={{ minHeight: tableHeight, ...motion }}
      className="flex flex-column">
      <TableProvider testId={testId}>{children}</TableProvider>
      <DataTable
        testId={testId}
        empty={empty}
        loading={loading}
        emptyState={emptyState}
        motion={motion}
        height={tableHeight}>
        <thead
          id={NAMESPACES.HEADER}
          data-testid={`${testId}__header`}
          className="w-100 ph4 truncate overflow-x-hidden c-muted-2 f6">
          <Headings
            sorting={sorting}
            columns={columns}
            checkboxes={checkboxes}
          />
        </thead>

        {!empty && !loading && (
          <tbody id={NAMESPACES.BODY} data-testid={`${testId}__body`}>
            <Rows
              rowKey={rowKey}
              checkboxes={checkboxes}
              currentDensity={currentDensity}
              columns={columns}
              items={items}
              rowHeight={rowHeight}
              onRowClick={onRowClick}
              isRowActive={isRowActive}
            />
          </tbody>
        )}
      </DataTable>
    </div>
  )
}

export const measuresPropTypes = {
  tableHeight: PropTypes.number,
  rowHeight: PropTypes.number,
  currentDensity: PropTypes.oneOf(DENSITY_OPTIONS),
  setCurrentDensity: PropTypes.func,
}

export const tablePropTypes = {
  children: PropTypes.node,
  checkboxes: PropTypes.any,
  measures: PropTypes.shape(measuresPropTypes),
  rowKey: PropTypes.func,
  empty: PropTypes.bool,
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      title: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.elementType,
        PropTypes.func,
      ]),
      width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
      sortable: PropTypes.bool,
      cellRenderer: PropTypes.func,
      extended: PropTypes.bool,
      condensed: PropTypes.arrayOf(PropTypes.string),
    })
  ),
  items: PropTypes.arrayOf(PropTypes.object),
  loading: PropTypes.oneOfType([
    PropTypes.shape({
      renderAs: PropTypes.func,
    }),
    PropTypes.bool,
  ]),
  onRowClick: PropTypes.func,
  isRowActive: PropTypes.func,
  emptyState: PropTypes.shape({
    label: PropTypes.string,
    children: PropTypes.element,
  }),
  sorting: PropTypes.shape({
    sorted: PropTypes.shape({
      by: PropTypes.string,
      order: PropTypes.string,
    }),
    clear: PropTypes.func,
    sort: PropTypes.func,
  }),
  testId: PropTypes.string,
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
}

Table.Toolbar = Toolbar
Table.FilterBar = FilterBar
Table.Totalizer = Totalizer
Table.Pagination = Pagination
Table.propTypes = tablePropTypes
Table.Bulk = BulkActions
Table.ActionBar = ActionBar

Table.defaultProps = {
  rowKey: ({ rowData }) => `row-${rowData.id}`,
  testId: 'vtex-table-v2',
}

export default Table
