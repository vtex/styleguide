import React, { FC } from 'react'
import PropTypes from 'prop-types'

import { TableContext } from '../EXPERIMENTAL_Table/contexts'
import { CheckboxesContext, TreeProvider } from './contexts'
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
  childsKey,
  unicityKey,
  ...props
}) => {
  return (
    <TableContext.Provider value={{ ...state, ...props }}>
      <TreeProvider childsKey={childsKey} unicityKey={unicityKey}>
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
      </TreeProvider>
    </TableContext.Provider>
  )
}

TableTree.defaultProps = {
  childsKey: 'children',
  unicityKey: 'id',
}

const treePropTypes = {
  unicityKey: PropTypes.string,
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
  unicityKey?: string
}

export type TreeState = {
  collapsedItems: Array<string>
  toggleCollapsed: (id: string) => void
  isCollapsed: (id: string) => boolean
}

export default TableTree
