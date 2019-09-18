import React, { FC } from 'react'

import { TableProvider } from '../EXPERIMENTAL_Table/context'
import Toolbar from '../EXPERIMENTAL_Table/Toolbar'
import Pagination from '../EXPERIMENTAL_Table/Pagination'
import DataTable from '../EXPERIMENTAL_Table/DataTable'
import Tree from './Tree'
import TableContainer from '../EXPERIMENTAL_Table/Container'
import { tablePropTypes, TableComposites } from '../EXPERIMENTAL_Table'
import { InferProps } from 'prop-types'

const TableTree: FC<Props> & TableComposites = ({
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

type Props = InferProps<typeof tablePropTypes>

TableTree.Toolbar = Toolbar
TableTree.Pagination = Pagination
TableTree.propTypes = tablePropTypes

export default TableTree
