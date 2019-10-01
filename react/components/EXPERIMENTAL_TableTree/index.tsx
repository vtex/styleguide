import React, { FC } from 'react'
import PropTypes from 'prop-types'

import { TableContext } from '../EXPERIMENTAL_Table/contexts'
import { CheckboxesContext } from './contexts'
import Toolbar from '../EXPERIMENTAL_Table/Toolbar'
import DataTable from '../EXPERIMENTAL_Table/DataTable'
import Tree from './Tree'
import { TableContainer, Thead } from '../EXPERIMENTAL_Table/Styled'
import { tablePropTypes, TableComposites } from '../EXPERIMENTAL_Table'
import { InferProps } from 'prop-types'
import TreeHeadings from './Tree/TreeHeadings'

const TableTree: FC<Props> & TableComposites = ({
  children,
  state,
  checkboxes,
  ...props
}) => {
  return (
    <TableContext.Provider value={{ ...state, ...props }}>
      <CheckboxesContext.Provider value={{ ...checkboxes }}>
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
      </CheckboxesContext.Provider>
    </TableContext.Provider>
  )
}

const itemTreeShape = PropTypes.shape({
  children: PropTypes.any,
  id: PropTypes.string,
})

const checkboxesPropTypes = {
  checkboxes: PropTypes.shape({
    checkedItems: PropTypes.arrayOf(itemTreeShape),
    itemTree: itemTreeShape,
    toggle: PropTypes.func,
    isChecked: PropTypes.func,
    isPartiallyChecked: PropTypes.func,
  }),
}

const propTypes = { ...tablePropTypes, ...checkboxesPropTypes }
type Props = InferProps<typeof propTypes>

TableTree.Toolbar = Toolbar
TableTree.propTypes = propTypes

export default TableTree
