import React, { FC } from 'react'
import PropTypes, { InferProps } from 'prop-types'

import Box from '../Box/index'
import EmptyState from '../EmptyState/index.js'

import SimpleTable from './SimpleTable/index'
import { TableProvider } from './context'
import Toolbar from './Toolbar/index'
import { DENSITY_OPTIONS, NAMESPACES } from './constants'
import Pagination, { PaginationProps } from './Pagination'
import { STATE_NOT_FOUND_ERROR } from './errors'

const propTypes = {
  nestedRows: PropTypes.bool,
  loading: PropTypes.bool,
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

const Table: FC<Props> & Composites = ({
  children,
  emptyState,
  state,
  ...props
}) => {
  if (!state) {
    throw STATE_NOT_FOUND_ERROR
  }
  return (
    <TableProvider value={{ ...state, ...props }}>
      <div id={NAMESPACES.CONTAINER} className="flex flex-column">
        {children}
        {state.isEmpty && emptyState ? (
          <Box>
            <EmptyState title={emptyState.label}>
              {emptyState.children}
            </EmptyState>
          </Box>
        ) : (
          <SimpleTable />
        )}
      </div>
    </TableProvider>
  )
}

Table.Toolbar = Toolbar
Table.Pagination = Pagination
Table.propTypes = propTypes

export default Table
