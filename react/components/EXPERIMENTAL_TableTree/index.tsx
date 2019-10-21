import React, { FC } from 'react'
import PropTypes from 'prop-types'

import Toolbar from '../EXPERIMENTAL_Table/Toolbar'
import DataTable from '../EXPERIMENTAL_Table/DataTable'
import Tree from './Tree'
import { tablePropTypes, TableComposites } from '../EXPERIMENTAL_Table'
import { InferProps } from 'prop-types'
import TreeHeadings from './Tree/TreeHeadings'
import Pagination from '../EXPERIMENTAL_Table/Pagination'
import FilterBar from '../EXPERIMENTAL_Table/FilterBar'

const TableTree: FC<Props> & TableComposites = ({
  children,
  columns,
  items,
  checkboxes,
  nodesKey,
  unicityKey,
  measures,
  loading,
  isEmpty,
  emptyState,
}) => {
  return (
    <div
      style={{ minHeight: measures.tableHeight }}
      className="flex flex-column">
      {children}
      <DataTable
        loading={loading}
        emptyState={emptyState}
        isEmpty={isEmpty}
        height={measures.tableHeight}>
        <thead className="w-100 ph4 truncate overflow-x-hidden c-muted-2 f6">
          <TreeHeadings
            checkboxes={checkboxes}
            columns={columns}
            items={items}
          />
        </thead>
        <tbody>
          <Tree
            checkboxes={checkboxes}
            columns={columns}
            items={items}
            unicityKey={unicityKey}
            nodesKey={nodesKey}
            rowHeight={measures.rowHeight}
          />
        </tbody>
      </DataTable>
    </div>
  )
}

TableTree.defaultProps = {
  nodesKey: 'children',
}

const treePropTypes = {
  nodesKey: PropTypes.string,
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
TableTree.FilterBar = FilterBar
TableTree.Pagination = Pagination
TableTree.propTypes = propTypes

export type TreeState = {
  collapsedItems: Array<string>
  toggleCollapsed: (id: string) => void
  isCollapsed: (id: string) => boolean
}

export default TableTree
