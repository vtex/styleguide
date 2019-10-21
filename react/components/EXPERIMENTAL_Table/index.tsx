import React, { FC } from 'react'
import PropTypes, { InferProps, arrayOf } from 'prop-types'

import Toolbar from './Toolbar/index'

import { DENSITY_OPTIONS, NAMESPACES } from './constants'
import Pagination, { PaginationProps } from './Pagination'
import DataTable from './DataTable'
import BulkActions from './BulkActions'
import FilterBar from './FilterBar'
import Headings from './DataTable/Headings'
import Rows from './DataTable/Rows'

const Table: FC<TableProps> & TableComposites = ({
  children,
  measures,
  isRowActive,
  ...props
}) => {
  if (!measures) {
    //TODO
    console.warn('Passing measures is highly recomended')
  }
  if (!props.items) {
    //TODO
    console.warn('Items not provided')
  }
  if (!props.columns) {
    //TODO
    console.warn('Columns not provided')
  }

  return (
    <div
      style={{ minHeight: measures.tableHeight }}
      id={NAMESPACES.CONTAINER}
      className="flex flex-column">
      {children}
      <DataTable
        height={measures.tableHeight}
        emptyState={props.emptyState}
        loading={props.loading}
        isEmpty={props.isEmpty}>
        <thead
          id={NAMESPACES.HEADER}
          className="w-100 ph4 truncate overflow-x-hidden c-muted-2 f6">
          <Headings columns={props.columns} />
        </thead>
        <tbody>
          <Rows
            columns={props.columns}
            items={props.items}
            rowHeight={measures.rowHeight}
            onRowClick={props.onRowClick}
            isRowActive={isRowActive}
          />
        </tbody>
      </DataTable>
    </div>
  )
}

Table.defaultProps = {
  unicityKey: 'id',
}

export const measuresPropTypes = {
  tableHeight: PropTypes.number,
  rowHeight: PropTypes.number,
  selectedDensity: PropTypes.oneOf(DENSITY_OPTIONS),
  setSelectedDensity: PropTypes.func,
}

export const tablePropTypes = {
  measures: PropTypes.shape(measuresPropTypes),
  containerHeight: PropTypes.number,
  unicityKey: PropTypes.string,
  isEmpty: PropTypes.bool,
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      title: PropTypes.string,
      width: PropTypes.number,
      cellRender: PropTypes.func,
      headerRender: PropTypes.func,
    })
  ),
  items: PropTypes.arrayOf(PropTypes.object),
  loading: PropTypes.oneOfType([
    PropTypes.shape({
      renderAs: PropTypes.func,
    }),
    PropTypes.bool,
  ]),
  itemsSizeEstimate: PropTypes.number,
  onRowClick: PropTypes.func,
  isRowActive: PropTypes.func,
  emptyState: PropTypes.shape({
    label: PropTypes.string,
    children: PropTypes.element,
  }),
}

export type TableProps = InferProps<typeof tablePropTypes>

export type TableComposites = {
  Toolbar: FC
  FilterBar?: FC
  Pagination?: FC<PaginationProps>
  BulkActions?: FC
}

Table.Toolbar = Toolbar
Table.FilterBar = FilterBar
Table.Pagination = Pagination
Table.propTypes = tablePropTypes
Table.BulkActions = BulkActions

export default Table
