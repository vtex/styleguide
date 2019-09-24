import React, { FC } from 'react'

import { TableProvider } from '../EXPERIMENTAL_Table/context'
import Toolbar from '../EXPERIMENTAL_Table/Toolbar'
import DataTable from '../EXPERIMENTAL_Table/DataTable'
import Tree from './Tree'
import { TableContainer, Thead } from '../EXPERIMENTAL_Table/Styled'
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
          <Thead>
            <DataTable.Headings />
          </Thead>
          <tbody>
            <Tree />
          </tbody>
        </DataTable>
      </TableContainer>
    </TableProvider>
  )
}

type Props = InferProps<typeof tablePropTypes>

TableTree.Toolbar = Toolbar
TableTree.propTypes = tablePropTypes

export default TableTree
