import React, { FC, Fragment, forwardRef } from 'react'
import pick from 'lodash/pick'
import PropTypes, { InferProps } from 'prop-types'

import Toolbar from './Toolbar/index'
import { NAMESPACES } from './constants'
import Pagination, { PaginationProps } from './Pagination'
import DataTable from './DataTable'
import BulkActions from './BulkActions'
import FilterBar from './FilterBar'
import Headings from './DataTable/Headings'
import { DENSITY_OPTIONS } from './hooks/useTableMeasures'
import { Checkboxes } from '../EXPERIMENTAL_useCheckboxTree/types'
import useTableMotion from './hooks/useTableMotion'
import Totalizer, { TotalizerProps } from './Totalizer'
import ActionBar, { ActionBarProps } from './ActionBar'
import { TableProvider, useTestingContext, useMeasuresContext } from './context'
import Row, { ROW_TRANSITIONS } from './DataTable/Row'
import { Column } from './types'
import Cell from './DataTable/Cell'

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
  __unsafe__giveMeMyRender,
  ...props
}) => {
  if (!measures) {
    throw new Error('Provide measures to the Table')
  }

  const { tableHeight, rowHeight, currentDensity } = measures
  const motion = useTableMotion()

  return (
    <div
      id={NAMESPACES.CONTAINER}
      data-testid={`${testId}__container`}
      style={{ minHeight: measures.tableHeight, ...motion }}
      className="flex flex-column">
      <TableProvider testId={testId} measures={measures}>
        {__unsafe__giveMeMyRender ? (
          children
        ) : (
          <DefaultRender>{children}</DefaultRender>
        )}
      </TableProvider>
    </div>
  )
}

function DefaultRender(props: any) {
  return (
    <Fragment>
      {props.children}
      <DataTable>
        <UnstableHead />
        <UnstableBody />
      </DataTable>
    </Fragment>
  )
}

//TODO: foward ref
function UnstableHead(props: any) {
  const { sorting, columns, checkboxes } = props
  const { testId } = useTestingContext()
  return (
    <thead
      data-testid={`${testId}__header`}
      className="w-100 ph4 truncate overflow-x-hidden c-muted-2 f6">
      <Headings sorting={sorting} columns={columns} checkboxes={checkboxes} />
    </thead>
  )
}

// TODO: consume empty and loading from context
function UnstableBody(props: any) {
  const {
    onRowClick,
    isRowActive,
    columns,
    items,
    rowKey = ({ id }) => `${id}`,
    highlightOnHover = false,
    checkboxes,
    renderer,
    ...rest
  } = props
  const { testId } = useTestingContext()
  const { rowHeight, currentDensity } = useMeasuresContext()
  const motion = useTableMotion(ROW_TRANSITIONS)

  return !props.empty && !props.loading ? (
    <tbody {...rest} data-testid={`${testId}__body`}>
      {items.map((rowData, idx) => {
        const toggleChecked = () => checkboxes.toggle(rowData)

        const isRowChecked = checkboxes && checkboxes.isChecked(rowData)
        const isRowPartiallyChecked =
          checkboxes && checkboxes.isPartiallyChecked(rowData)
        const isRowSelected = isRowChecked || isRowPartiallyChecked

        const clickable = onRowClick
          ? {
              onClick: () => onRowClick({ rowData }),
              highlightOnHover: true,
            }
          : { highlightOnHover }

        const rp = {
          ...clickable,
          height: rowHeight,
          rowData,
          idx,
          active: (isRowActive && isRowActive(rowData)) || isRowSelected,
          key: rowKey({ rowData }),
          motion,
          children: columns.map((column: Column, cellIndex: number) => {
            const { cellRenderer, width } = column
            const data = column.condensed
              ? pick(rowData, column.condensed)
              : column.extended
              ? rowData
              : rowData[column.id]
            const content = cellRenderer
              ? cellRenderer({
                  data,
                  rowHeight,
                  currentDensity,
                  motion,
                })
              : data
            return (
              <Cell key={column.id} width={width}>
                {cellIndex === 0 && checkboxes && (
                  <Cell.Prefix>
                    <span className="ph3">
                      <Cell.Prefix.Checkbox
                        checked={isRowChecked}
                        partial={isRowPartiallyChecked}
                        disabled={checkboxes.isDisabled(rowData)}
                        onClick={toggleChecked}
                      />
                    </span>
                  </Cell.Prefix>
                )}
                {content}
              </Cell>
            )
          }),
        }
        return renderer(rp)
      })}
    </tbody>
  ) : null
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
  __unsafe__giveMeMyRender: PropTypes.bool,
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
  DataTable?: any
  Head?: any
  Body?: any
}

Table.Toolbar = Toolbar
Table.FilterBar = FilterBar
Table.Totalizer = Totalizer
Table.Pagination = Pagination
Table.propTypes = tablePropTypes
Table.Bulk = BulkActions
Table.ActionBar = ActionBar
Table.DataTable = DataTable
Table.Head = UnstableHead
Table.Body = UnstableBody

Table.defaultProps = {
  rowKey: ({ rowData }) => `row-${rowData.id}`,
  testId: 'vtex-table-v2',
  stickyHeader: false,
}

export default Table
