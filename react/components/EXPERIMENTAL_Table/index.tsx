import React, { FC } from 'react'
import PropTypes, { InferProps } from 'prop-types'

import { TableProvider } from './context'
import Toolbar from './Toolbar/index'

import { DENSITY_OPTIONS } from './constants'
import LineActions, { LineActionProps } from './LineActions/index'
import Pagination, { PaginationProps } from './Pagination'
import { STATE_NOT_FOUND_ERROR } from './errors'
import { TableContainer, Thead } from './Styled'
import DataTable from './DataTable'

const Table: FC<Props> & TableComposites = ({ children, state, ...props }) => {
  if (!state) {
    throw STATE_NOT_FOUND_ERROR
  }
  return (
    <TableProvider value={{ ...state, ...props }}>
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
    </TableProvider>
  )
}

export const tablePropTypes = {
  containerHeight: PropTypes.number,
  loading: PropTypes.oneOfType([
    PropTypes.shape({
      renderAs: PropTypes.func,
    }),
    PropTypes.bool,
  ]),
  itemsSizeEstimate: PropTypes.number,
  onRowClick: PropTypes.func,
  state: PropTypes.shape({
    schema: PropTypes.shape({
      columns: PropTypes.objectOf(
        PropTypes.shape({
          title: PropTypes.string.isRequired,
          cellRender: PropTypes.func,
        })
      ).isRequired,
      rowRender: PropTypes.func,
    }),
    items: PropTypes.arrayOf(PropTypes.object),
    isEmpty: PropTypes.bool,
    tableHeight: PropTypes.number,
    rowHeight: PropTypes.number,
    selectedDensity: PropTypes.oneOf(DENSITY_OPTIONS),
    setSelectedDensity: PropTypes.func,
  }),
  emptyState: PropTypes.shape({
    label: PropTypes.string,
    children: PropTypes.element,
  }),
}

export type Props = InferProps<typeof tablePropTypes>

export type TableComposites = {
  Toolbar: FC
  Pagination: FC<PaginationProps>
  LineActions: FC<LineActionProps>
}

Table.Toolbar = Toolbar
Table.Pagination = Pagination
Table.LineActions = LineActions
Table.propTypes = tablePropTypes

export default Table
