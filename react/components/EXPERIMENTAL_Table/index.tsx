import React, { FC } from 'react'
import PropTypes, { InferProps } from 'prop-types'

import SimpleTable from './SimpleTable/index'
import { TableProvider } from './context'
import Toolbar from './Toolbar/index'
import { DENSITY_OPTIONS, NAMESPACES } from './constants'
import Pagination, { PaginationProps } from './Pagination'
import { STATE_NOT_FOUND_ERROR } from './errors'
import useTableContext from './hooks/useTableContext'

const propTypes = {
  containerHeight: PropTypes.number,
  nestedRows: PropTypes.bool,
  loading: PropTypes.oneOfType([
    PropTypes.shape({
      renderAs: PropTypes.func,
    }),
    PropTypes.bool,
  ]),
  itemsSizeEstimate: PropTypes.number,
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

type Props = InferProps<typeof propTypes>

interface Composites {
  Toolbar: FC
  Pagination: FC<PaginationProps>
}

const TableContainer: FC = ({ children }) => {
  const { containerHeight, tableHeight } = useTableContext() 
  return (
    <div
      style={{ minHeight: containerHeight || tableHeight }}
      id={NAMESPACES.CONTAINER}
      className="flex flex-column">
      {children}
    </div>
  )
}

const Table: FC<Props> & Composites = ({ children, state, ...props }) => {
  if (!state) {
    throw STATE_NOT_FOUND_ERROR
  }
  return (
    <TableProvider value={{ ...state, ...props }}>
      <TableContainer>
        {children}
        <SimpleTable />
      </TableContainer>
    </TableProvider>
  )
}

Table.Toolbar = Toolbar
Table.Pagination = Pagination
Table.propTypes = propTypes

export default Table
