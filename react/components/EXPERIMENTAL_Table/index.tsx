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
import { DENSITY_OPTIONS, Density } from './hooks/useTableMeasures'
import { Checkboxes } from '../EXPERIMENTAL_useCheckboxTree/types'
import useTableMotion from './hooks/useTableMotion'

const CONTAINER_TRANSITIONS = [
  {
    prop: 'minHeight',
    duration: 1000,
    func: 'ease-in-out',
    delay: 0,
    optimize: true,
  },
]

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

  const { tableHeight, rowHeight, selectedDensity } = measures
  const { columns, onRowClick, items } = props
  const motion = useTableMotion(CONTAINER_TRANSITIONS)

  return (
    <div
      style={{ minHeight: tableHeight, ...motion }}
      id={NAMESPACES.CONTAINER}
      className="flex flex-column">
      {children}
      <DataTable
        empty={empty}
        loading={loading}
        emptyState={emptyState}
        motion={motion}
        height={tableHeight}>
        <thead
          id={NAMESPACES.HEADER}
          className="w-100 ph4 truncate overflow-x-hidden c-muted-2 f6">
          <Headings columns={columns} checkboxes={checkboxes} />
        </thead>

        {!empty && !loading && (
          <tbody>
            <Rows
              rowKey={rowKey}
              checkboxes={checkboxes}
              selectedDensity={selectedDensity}
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
  selectedDensity: PropTypes.oneOf(DENSITY_OPTIONS),
  setSelectedDensity: PropTypes.func,
}

export const tablePropTypes = {
  children: PropTypes.node,
  checkboxes: PropTypes.any,
  measures: PropTypes.shape(measuresPropTypes),
  rowKey: PropTypes.func,
  containerHeight: PropTypes.number,
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
      cellRenderer: PropTypes.func,
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

export type TableProps = InferProps<typeof tablePropTypes> & {
  checkboxes: Checkboxes<unknown>
}

export type TableComposites = {
  Toolbar: FC
  FilterBar?: FC
  Pagination?: FC<PaginationProps>
  Bulk?: FC
}

export type Items = object[]

export type CellData = {
  cellData: unknown
  rowData: unknown
  rowHeight: number
  selectedDensity: Density
  motion: ReturnType<typeof useTableMotion>
}

export type Column = {
  id?: string
  title?: string | Element | Function
  width?: number | string
  cellRenderer?: (cellData: CellData) => React.ReactNode
}

Table.Toolbar = Toolbar
Table.FilterBar = FilterBar
Table.Pagination = Pagination
Table.propTypes = tablePropTypes
Table.Bulk = BulkActions

Table.defaultProps = {
  rowKey: ({ rowData }) => `row-${rowData.id}`,
}

export default Table
