import React, { FC } from 'react'
import PropTypes from 'prop-types'

import { TableContext } from '../EXPERIMENTAL_Table/contexts'
import { CheckboxesContext, TreeContext } from './contexts'
import Toolbar from '../EXPERIMENTAL_Table/Toolbar'
import DataTable from '../EXPERIMENTAL_Table/DataTable'
import Tree from './Tree'
import { TableContainer, Thead } from '../EXPERIMENTAL_Table/Styled'
import { tablePropTypes, TableComposites } from '../EXPERIMENTAL_Table'
import { InferProps } from 'prop-types'
import TreeHeadings from './Tree/TreeHeadings'
import useTreeState from './hooks/useTreeState'

const TableTree: FC<Props> & TableComposites = ({
  children,
  state,
  checkboxes,
  childsKey,
  ...props
}) => {
  const treeState = useTreeState()
  return (
    <TableContext.Provider value={{ ...state, ...props }}>
      <TreeContext.Provider value={{ ...treeState, childsKey }}>
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
      </TreeContext.Provider>
    </TableContext.Provider>
  )
}

TableTree.defaultProps = {
  childsKey: 'children',
}

const treePropTypes = {
  childsKey: PropTypes.string,
}

const checkboxesPropTypes = {
  checkboxes: PropTypes.shape({
    checkedItems: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string,
      })
    ),
    itemTree: PropTypes.shape({
      id: PropTypes.string,
    }),
    toggle: PropTypes.func,
    isChecked: PropTypes.func,
    isPartiallyChecked: PropTypes.func,
  }),
}

const propTypes = {
  ...treePropTypes,
  ...tablePropTypes,
  ...checkboxesPropTypes,
}
type Props = InferProps<typeof propTypes>

TableTree.Toolbar = Toolbar
TableTree.propTypes = propTypes

export type TreeProps = {
  childsKey?: string
}

export type TreeState = {
  collapsedItems: Array<string>
  toggleCollapsed: (id: string) => void
  isCollapsed: (id: string) => boolean
}

export default TableTree
