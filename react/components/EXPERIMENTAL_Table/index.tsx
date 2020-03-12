import React, { FC, PropsWithChildren, ReactElement } from 'react'
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
import { TestingProvider, useTestingContext } from './context/testing'
import { useMeasuresContext, MeasuresProvider } from './context/measures'

const Table: FC<TableProps> & TableComposites = ({
  children,
  measures,
  isRowActive,
  loading,
  emptyState,
  empty,
  checkboxes,
  rowKey,
  highlightOnHover,
  stickyHeader,
  columns,
  onRowClick,
  items,
  sorting,
  testId,
}) => {
  if (!measures) {
    throw new Error('Provide measures to the Table')
  }

  const motion = useTableMotion()

  return (
    <TestingProvider testId={testId}>
      <MeasuresProvider measures={measures}>
        <MotionContainer>
          {children}
          <DataTable
            stickyHeader={stickyHeader}
            empty={empty}
            loading={loading}
            emptyState={emptyState}
            motion={motion}>
            <Thead>
              <Headings
                sticky={stickyHeader}
                sorting={sorting}
                columns={columns}
                checkboxes={checkboxes}
              />
            </Thead>
            <Tbody empty={empty} loading={loading}>
              <Rows
                highlightOnHover={highlightOnHover}
                rowKey={rowKey}
                checkboxes={checkboxes}
                columns={columns}
                items={items}
                onRowClick={onRowClick}
                isRowActive={isRowActive}
              />
            </Tbody>
          </DataTable>
        </MotionContainer>
      </MeasuresProvider>
    </TestingProvider>
  )
}

function MotionContainer({ children }: PropsWithChildren<{}>) {
  const motion = useTableMotion()
  const { testId } = useTestingContext()
  const { tableHeight } = useMeasuresContext()
  return (
    <div
      data-testid={`${testId}__container`}
      style={{ minHeight: tableHeight, ...motion }}
      className="flex flex-column">
      {children}
    </div>
  )
}

function Thead({ children }: PropsWithChildren<{}>) {
  const { testId } = useTestingContext()
  return (
    <thead
      data-testid={`${testId}__header`}
      className="w-100 ph4 truncate overflow-x-hidden c-muted-2 f6">
      {children}
    </thead>
  )
}

type BodyProps = PropsWithChildren<{
  empty?: boolean
  loading?: boolean | { renderAs?: ReactElement }
}>

function Tbody({ empty, loading, children }: BodyProps) {
  const { testId } = useTestingContext()
  return (
    !empty &&
    !loading && (
      <tbody id={NAMESPACES.BODY} data-testid={`${testId}__body`}>
        {children}
      </tbody>
    )
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
  stickyHeader: false,
}

export default Table
