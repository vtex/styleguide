import React, { FC, useState } from 'react'

import CellPrefix from './CellPrefix'
import useTableTreeContext from '../hooks/useTableTreeContext'
import Cell from '../../EXPERIMENTAL_Table/DataTable/Cell'

const PREFIX_WIDTH = 36

const Node: FC<NodeProps> = ({ data, index, depth }) => {
  const { visibleColumns, rowHeight } = useTableTreeContext()
  const [collapsed, setCollapsed] = useState(false)

  const { children, ...rowData } = data

  const childs =
    children &&
    children.map((data, index) => (
      <Node
        key={`row-${index}-${depth}__child-${index}`}
        depth={depth + 1}
        index={index}
        data={data}
      />
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
            <Cell
              id={`${index}-${cellIndex}-${depth}`}
              key={`cel-${index}-${cellIndex}-${depth}`}
              width={width}>
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
  const { items } = useTableTreeContext()

  return (
    <>
      {items.map((data, index) => (
        <Node key={`row-${index}`} data={data} index={index} />
      ))}
    </>
  )
}

type NodeProps = {
  data: { children?: Array<unknown> }
  index: number
  depth?: number
}

Node.defaultProps = {
  depth: 1,
}

export default Tree
