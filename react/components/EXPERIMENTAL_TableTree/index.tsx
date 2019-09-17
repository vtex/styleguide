import React, { FC } from 'react'

import { TableProvider } from '../EXPERIMENTAL_Table/context'
import Toolbar from '../EXPERIMENTAL_Table/Toolbar'
import Pagination, { PaginationProps } from '../EXPERIMENTAL_Table/Pagination'
import DataTable from '../EXPERIMENTAL_Table/DataTable'
import Tree from './Tree'
import TableContainer from '../EXPERIMENTAL_Table/Container'

const TableTree: FC<any> & TableTreeComposites = ({
  children,
  state,
  ...props
}) => {
  return (
    <TableProvider value={{ ...state, ...props }}>
      <TableContainer>
        {children}
        <DataTable>
          <DataTable.Header />
          <Tree />
        </DataTable>
      </TableContainer>
    </TableProvider>
  )
}

type TableTreeComposites = {
  Toolbar: FC
  Pagination: FC<PaginationProps>
}

TableTree.Toolbar = Toolbar
TableTree.Pagination = Pagination

export default TableTree
