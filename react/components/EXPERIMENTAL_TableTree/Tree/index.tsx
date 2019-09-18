import React, { FC, useState } from 'react'
import uuid from 'uuid'

import CellPrefix from './CellPrefix'
import Cell from '../../EXPERIMENTAL_Table/DataTable/Cell'
import useTableContext from '../../EXPERIMENTAL_Table/hooks/useTableContext'

const PREFIX_WIDTH = 36

const Node: FC<NodeProps> = ({ data, depth }) => {
  const { visibleColumns, rowHeight } = useTableContext()
  const [collapsed, setCollapsed] = useState(false)

  const { children, ...rowData } = data

  const childs =
    children &&
    children.map((data, index) => (
      <Node key={`row-child-${uuid()}`} depth={depth + 1} data={data} />
    ))

  const renderPrefix = (hasChild?: boolean) => (
    <CellPrefix width={depth * PREFIX_WIDTH}>
      {hasChild && (
        <CellPrefix.Arrow
          active={collapsed}
          onClick={() => setCollapsed(!collapsed)}
        />
      )}
    </CellPrefix>
  )

  const renderCells = (hasChild?: boolean) => {
    return (
      <tr
        style={{ height: rowHeight }}
        className="w-100 h-100 ph4 truncate overflow-x-hidden">
        {visibleColumns.map((column: Column, cellIndex: number) => {
          const { cellRender, width } = column
          const cellData = rowData[column.id]
          const content = cellRender
            ? cellRender({ cellData, rowData })
            : cellData
          return (
            <Cell key={`cel-${uuid()}`} width={width}>
              {cellIndex === 0 && renderPrefix(hasChild)}
              {content}
            </Cell>
          )
        })}
      </tr>
    )
  }

  return childs ? (
    <>
      {renderCells(true)}
      {collapsed && childs}
    </>
  ) : (
    renderCells()
  )
}

const Tree: FC = () => {
  const { items } = useTableContext()

  return (
    <>
      {items.map(data => (
        <Node key={`row-${uuid()}`} data={data} />
      ))}
    </>
  )
}

type NodeProps = {
  data: { children?: Array<unknown> }
  depth?: number
}

Node.defaultProps = {
  depth: 1,
}

export default Tree
