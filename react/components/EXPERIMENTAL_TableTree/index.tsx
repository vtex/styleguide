import React, { FC } from 'react'
import PropTypes, { InferProps } from 'prop-types'

import Toolbar from '../EXPERIMENTAL_Table/Toolbar'
import DataTable from '../EXPERIMENTAL_Table/DataTable'
import Tree from './Tree'
import { tablePropTypes, TableComposites } from '../EXPERIMENTAL_Table'
import Pagination from '../EXPERIMENTAL_Table/Pagination'
import FilterBar from '../EXPERIMENTAL_Table/FilterBar'
import { Checkboxes } from '../EXPERIMENTAL_useCheckboxTree/types'
import { defaultComparatorCurry } from '../EXPERIMENTAL_useCheckboxTree/constants'
import Headings from '../EXPERIMENTAL_Table/DataTable/Headings'
import useTableMotion from '../EXPERIMENTAL_Table/hooks/useTableMotion'

const CONTAINER_TRANSITIONS = [
  {
    prop: 'minHeight',
    duration: 200,
    func: 'ease-in-out',
    delay: 0,
    optimize: true,
  },
]

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

  const { tableHeight, rowHeight, currentDensity } = measures
  const motion = useTableMotion(CONTAINER_TRANSITIONS)

  return (
    <div style={{ minHeight: tableHeight }} className="flex flex-column">
      {children}
      <DataTable
        loading={loading}
        emptyState={emptyState}
        empty={empty}
        motion={motion}
        height={tableHeight}>
        <thead className="w-100 ph4 truncate overflow-x-hidden c-muted-2 f6">
          <Headings checkboxes={checkboxes} columns={columns} />
        </thead>
        {!empty && !loading && (
          <tbody>
            <Tree
              currentDensity={currentDensity}
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
