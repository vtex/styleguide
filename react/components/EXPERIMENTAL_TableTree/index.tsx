import React, { FC } from 'react'
import PropTypes from 'prop-types'

import { TableProvider } from '../EXPERIMENTAL_Table/context'
import Toolbar from '../EXPERIMENTAL_Table/Toolbar'
import DataTable from '../EXPERIMENTAL_Table/DataTable'
import Tree from './Tree'
import { TableContainer, Thead } from '../EXPERIMENTAL_Table/Styled'
import { tablePropTypes, TableComposites } from '../EXPERIMENTAL_Table'
import { InferProps } from 'prop-types'
import { CheckboxesProvider } from './checkboxContext'
import TreeHeadings from './Tree/TreeHeadings'

const TableTree: FC<Props> & TableComposites = ({
  children,
  state,
  checkboxes,
  ...props
}) => {
  return (
    <TableProvider value={{ ...state, ...props }}>
      <CheckboxesProvider value={{ ...checkboxes }}>
        <TableContainer>
          {children}
          <DataTable>
            <Thead>
              <TreeHeadings />
            </Thead>
            <tbody>
              <Tree />
            </tbody>
          </DataTable>
        </TableContainer>
      </CheckboxesProvider>
    </TableProvider>
  )
}

const checkboxesPropTypes = {
  checkboxes: PropTypes.shape({
    checkboxesState: PropTypes.shape({
      checked: PropTypes.arrayOf(PropTypes.string),
      partial: PropTypes.arrayOf(PropTypes.string),
      allChecked: PropTypes.bool,
    }),
    toggle: PropTypes.func,
  }),
}

type Props = InferProps<typeof tablePropTypes> &
  InferProps<typeof checkboxesPropTypes>

TableTree.Toolbar = Toolbar
TableTree.propTypes = tablePropTypes

export default TableTree
