import React, {
  FC,
  Fragment,
  forwardRef,
  PropsWithChildren,
  Ref,
  ComponentProps,
} from 'react'

import Toolbar from './Toolbar/index'
import Pagination, { PaginationProps } from './Pagination'
import BulkActions from './BulkActions'
import FilterBar, { FilterBarProps } from './FilterBar'
import useTableMeasures from './hooks/useTableMeasures'
import useTableMotion from './hooks/useTableMotion'
import Totalizer, { TotalizerProps } from './Totalizer'
import ActionBar, { ActionBarProps } from './ActionBar'
import Sections, { ComposableSections } from './Sections'
import { Column, Items, RFC, ComposableWithRef } from './types'
import useTableSort from './hooks/useTableSort'
import { MeasuresProvider, useMeasuresContext } from './context/measures'
import { TestingProvider, useTestingContext } from './context/testing'
import { LoadingProvider } from './context/loading'
import { DataProvider } from './context/data'
import { HeadProvider } from './context/head'
import { BodyProvider } from './context/body'

type Props = PropsWithChildren<SpecificProps>

function Table(
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
    disableScroll,
  }: Props,
  ref: Ref<HTMLTableElement>
) {
  return (
    <TestingProvider testId={testId}>
      <LoadingProvider empty={empty} loading={loading} emptyState={emptyState}>
        <MeasuresProvider measures={measures}>
          <DataProvider columns={columns} items={items}>
            <HeadProvider sorting={sorting} sticky={stickyHeader}>
              <BodyProvider
                onRowClick={onRowClick}
                isRowActive={isRowActive}
                rowKey={rowKey}
                highlightOnHover={highlightOnHover}>
                <MotionContainer>
                  {composableSections ? (
                    children
                  ) : (
                    <Fragment>
                      {children}
                      <Sections ref={ref} disableScroll={disableScroll}>
                        <Sections.Head />
                        <Sections.Body />
                      </Sections>
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

interface SpecificProps {
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
  emptyState?: ComponentProps<typeof LoadingProvider>['emptyState']
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
  /** Disable scroll in table sections when not using composable sections */
  disableScroll?: boolean
}

interface Composites {
  Toolbar?: FC
  FilterBar?: RFC<HTMLElement, FilterBarProps>
  Pagination?: RFC<HTMLElement, PaginationProps>
  Bulk?: FC
  Totalizer?: RFC<HTMLElement, TotalizerProps>
  ActionBar?: RFC<HTMLElement, ActionBarProps>
  Sections?: ComposableSections
}

export type ComposableTable = ComposableWithRef<
  HTMLTableElement,
  Props,
  Composites
>

const FowardedTable: ComposableTable = forwardRef(Table)

FowardedTable.Toolbar = Toolbar
FowardedTable.FilterBar = FilterBar
FowardedTable.Totalizer = Totalizer
FowardedTable.Pagination = Pagination
FowardedTable.Bulk = BulkActions
FowardedTable.ActionBar = ActionBar
FowardedTable.Sections = Sections

FowardedTable.defaultProps = {
  rowKey: ({ rowData }: { rowData: { id: string } }) => `row-${rowData.id}`,
  loading: false,
  empty: false,
  highlightOnHover: false,
  testId: 'vtex-table-v2',
  stickyHeader: false,
}

export default FowardedTable
