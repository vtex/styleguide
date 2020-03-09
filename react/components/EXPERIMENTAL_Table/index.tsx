import React, { FC, Fragment, forwardRef, PropsWithChildren } from 'react'

import Toolbar from './Toolbar/index'
import Pagination, { PaginationProps } from './Pagination'
import BulkActions from './BulkActions'
import FilterBar, { FilterBarProps } from './FilterBar'
import useTableMeasures from './hooks/useTableMeasures'
import useTableMotion from './hooks/useTableMotion'
import Totalizer, { TotalizerProps } from './Totalizer'
import ActionBar, { ActionBarProps } from './ActionBar'
import { TableProvider, useTestingContext, useMeasuresContext } from './context'
import DataTable from './DataTable'
import { Column, Items, RFC } from './types'
import useTableSort from './hooks/useTableSort'

const Table: RFC<HTMLTableElement, Props> = (
  {
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
    stickyHeader,
  },
  ref
) => (
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
      sticky: stickyHeader,
    }}
    body={{
      onRowClick,
      isRowActive,
      items,
      rowKey,
      highlightOnHover,
    }}>
    <MotionContainer>
      {unstableRender ? (
        children
      ) : (
        <Fragment>
          {children}
          <DataTable ref={ref}>
            <DataTable.Head />
            <DataTable.Body />
          </DataTable>
        </Fragment>
      )}
    </MotionContainer>
  </TableProvider>
)

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

interface Props {
  /** Return of the useTableMeasures hook */
  measures: ReturnType<typeof useTableMeasures>
  /** Array of columns */
  columns: Column[]
  /** Array of items */
  items: Items
  /** Function that generates row keys */
  rowKey?: (data: { rowData: unknown }) => string
  /** If the table is empty or not */
  empty?: boolean
  /** If the Table is loading or not */
  loading?: { renderAs: () => React.ReactNode } | boolean
  /** Function trigged on a row click */
  onRowClick?: (data: { rowData: unknown }) => void
  /** Function that defines if a row is active or not */
  isRowActive?: (data: { rowData: unknown }) => boolean
  /** Table EmptyState component */
  emptyState?: PropsWithChildren<{
    label: string
  }>
  /** Sorting properties */
  sorting?: ReturnType<typeof useTableSort>
  /** Base testId */
  testId?: string
  /** If the rows should be highlighted on :hover */
  highlightOnHover?: boolean
  /** If the header is sticky or not */
  stickyHeader?: boolean
  /** YOLO 🦇 */
  unstableRender?: boolean
}

interface Composites {
  Toolbar?: FC
  FilterBar?: RFC<HTMLElement, FilterBarProps>
  Pagination?: RFC<HTMLElement, PaginationProps>
  Bulk?: FC
  Totalizer?: RFC<HTMLElement, TotalizerProps>
  ActionBar?: RFC<HTMLElement, ActionBarProps>
  Sections?: RFC<HTMLTableElement, {}>
}

const FowardedTable: RFC<HTMLTableElement, Props> & Composites = forwardRef(
  Table
)

FowardedTable.Toolbar = Toolbar
FowardedTable.FilterBar = FilterBar
FowardedTable.Totalizer = Totalizer
FowardedTable.Pagination = Pagination
FowardedTable.Bulk = BulkActions
FowardedTable.ActionBar = ActionBar
FowardedTable.Sections = DataTable

FowardedTable.defaultProps = {
  rowKey: ({ rowData }: { rowData: { id: string } }) => `row-${rowData.id}`,
  loading: false,
  empty: false,
  highlightOnHover: false,
  testId: 'vtex-table-v2',
  stickyHeader: false,
}

export default FowardedTable
