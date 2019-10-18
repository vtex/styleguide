import React, { FC } from 'react'
import PropTypes, { InferProps, arrayOf } from 'prop-types'

import { TableContext, BulkContext } from './contexts'
import Toolbar from './Toolbar/index'

import { DENSITY_OPTIONS } from './constants'
import Pagination, { PaginationProps } from './Pagination'
import { TableContainer, Thead } from './Styled'
import DataTable from './DataTable'
import BulkActions from './BulkActions'
import FilterBar from './FilterBar'
import { MeasuresProvider } from './stateContainers/tableMeasures'
import { BulkActionsProvider } from './stateContainers/bulkActions'

function TableProvider({ children, value }) {
  return <TableContext.Provider value={value}>{children}</TableContext.Provider>
}

const Table: FC<Props> & TableComposites = ({
  children,
  measures,
  bulk,
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
    <TableProvider value={props}>
      //@ts-ignore
      <MeasuresProvider value={measures}>
        //@ts-ignore
        <BulkActionsProvider value={bulk}>
          <TableContainer>
            {children}
            <DataTable>
              <Thead>
                <DataTable.Headings />
              </Thead>
              <tbody>
                <DataTable.Rows />
              </tbody>
            </DataTable>
          </TableContainer>
        </BulkActionsProvider>
      </MeasuresProvider>
    </TableProvider>
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

export const bulkPropTypes = {
  bulk: PropTypes.shape({
    bulkState: PropTypes.shape({
      selectedRows: arrayOf(
        PropTypes.shape({
          id: PropTypes.number,
        })
      ),
      allLinesSelected: PropTypes.bool,
    }),
    hasBulkActions: PropTypes.bool,
    hasPrimaryBulkAction: PropTypes.bool,
    hasSecondaryBulkActions: PropTypes.bool,
    selectAllRows: PropTypes.func,
    deselectAllRows: PropTypes.func,
    selectRow: PropTypes.func,
    setSelectedRows: PropTypes.func,
    setAllLinesSelected: PropTypes.func,
    selectAllVisibleRows: PropTypes.func,
  }),
}

export const tablePropTypes = {
  measures: PropTypes.shape(measuresPropTypes),
  containerHeight: PropTypes.number,
  unicityKey: PropTypes.string,
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
  emptyState: PropTypes.shape({
    label: PropTypes.string,
    children: PropTypes.element,
  }),
}

export type TableProps = InferProps<typeof tablePropTypes>
type Props = TableProps & InferProps<typeof bulkPropTypes>

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
