import React, { FC } from 'react'
import PropTypes from 'prop-types'

import Toolbar from '../EXPERIMENTAL_Table/Toolbar'
import DataTable from '../EXPERIMENTAL_Table/DataTable'
import Tree from './Tree'
import { tablePropTypes, TableComposites } from '../EXPERIMENTAL_Table'
import { InferProps } from 'prop-types'
import Pagination from '../EXPERIMENTAL_Table/Pagination'
import FilterBar from '../EXPERIMENTAL_Table/FilterBar'
import {
  defaultComparatorCurry,
  Checkboxes,
} from '../EXPERIMENTAL_CheckboxTree'
import Headings from '../EXPERIMENTAL_Table/DataTable/Headings'

const TableTree: FC<Props> & TableComposites = ({
  children,
  columns,
  items,
  checkboxes,
  nodesKey,
  comparator,
  measures,
  loading,
  empty,
  emptyState,
  onRowClick,
}) => {
  if (!measures) {
    throw new Error('Provide measures to the TableTree')
  }

  const { tableHeight, rowHeight, selectedDensity } = measures

  return (
    <div style={{ minHeight: tableHeight }} className="flex flex-column">
      {children}
      <DataTable
        loading={loading}
        emptyState={emptyState}
        empty={empty}
        height={tableHeight}>
        <thead className="w-100 ph4 truncate overflow-x-hidden c-muted-2 f6">
          <Headings checkboxes={checkboxes} columns={columns} />
        </thead>
        {!empty && !loading && (
          <tbody>
            <Tree
              selectedDensity={selectedDensity}
              checkboxes={checkboxes}
              columns={columns}
              items={items}
              onRowClick={onRowClick}
              comparator={comparator}
              nodesKey={nodesKey}
              rowHeight={rowHeight}
            />
          </tbody>
        )}
      </DataTable>
    </div>
  )
}

TableTree.defaultProps = {
  nodesKey: 'children',
  comparator: defaultComparatorCurry,
}

const treePropTypes = {
  nodesKey: PropTypes.string,
  comparator: PropTypes.func,
}

const propTypes = {
  ...treePropTypes,
  ...tablePropTypes,
}

type Props = InferProps<typeof propTypes> & {
  checkboxes?: Checkboxes<unknown>
}

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
