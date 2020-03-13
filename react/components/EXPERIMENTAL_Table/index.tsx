import React, { FC, Fragment, forwardRef, PropsWithChildren } from 'react'

import Toolbar from './Toolbar/index'
import Pagination, { PaginationProps } from './Pagination'
import BulkActions from './BulkActions'
import FilterBar, { FilterBarProps } from './FilterBar'
import useTableMeasures from './hooks/useTableMeasures'
import useTableMotion from './hooks/useTableMotion'
import Totalizer, { TotalizerProps } from './Totalizer'
import ActionBar, { ActionBarProps } from './ActionBar'
import DataTable from './DataTable'
import { Column, Items, RFC } from './types'
import useTableSort from './hooks/useTableSort'
import { MeasuresProvider, useMeasuresContext } from './context/measures'
import { TestingProvider, useTestingContext } from './context/testing'
import { LoadingProvider } from './context/loading'
import { DataProvider } from './context/data'
import { HeadProvider } from './context/head'
import { BodyProvider } from './context/body'

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
    columns,
    sorting,
    testId,
    stickyHeader,
    composableSections,
  },
  ref
) => (
  <TestingProvider testId={testId}>
    <LoadingProvider empty={empty} loading={loading} emptyState={emptyState}>
      <MeasuresProvider measures={measures}>
        <DataProvider columns={columns} items={items}>
          <HeadProvider sorting={sorting} sticky={stickyHeader}>
            <BodyProvider
              onRowClick={onRowClick}
              isRowActive={isRowActive}
              rowKey={rowKey}
              highlightOnHover={highlightOnHover}
            >
              <MotionContainer>
                {composableSections ? (
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
            </BodyProvider>
          </HeadProvider>
        </DataProvider>
      </MeasuresProvider>
    </LoadingProvider>
  </TestingProvider>
)

function MotionContainer({ children }: PropsWithChildren<{}>) {
  const motion = useTableMotion()
  const { testId } = useTestingContext()
  const { tableHeight } = useMeasuresContext()
  return (
    <div
      data-testid={`${testId}__container`}
      style={{ minHeight: tableHeight, ...motion }}
      className="flex flex-column"
    >
      <TableProvider testId={testId}>{children}</TableProvider>
      <DataTable
        stickyHeader={stickyHeader}
        testId={testId}
        empty={empty}
        loading={loading}
        emptyState={emptyState}
        motion={motion}
        height={tableHeight}
      >
        <thead
          id={NAMESPACES.HEADER}
          data-testid={`${testId}__header`}
          className="w-100 ph4 truncate overflow-x-hidden c-muted-2 f6"
        >
          <Headings
            sticky={stickyHeader}
            sorting={sorting}
            columns={columns}
            checkboxes={checkboxes}
          />
        </thead>

        {!empty && !loading && (
          <tbody id={NAMESPACES.BODY} data-testid={`${testId}__body`}>
            <Rows
              highlightOnHover={highlightOnHover}
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
  isRowActive?: (data: unknown) => boolean
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
  /** Exposes table sections to be composable */
  composableSections?: boolean
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
