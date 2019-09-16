import React, { FC, useState } from 'react'

import Cell from '../DataTable/Cell'
import CellPrefix from './CellPrefix'
import useTableContext from '../hooks/useTableContext'
import { NESTED_ROW_PREFIX_WIDTH, NAMESPACES } from '../constants'
import RowContainer from '../DataTable/RowContainer'

/**
 * Row of the Table Tree
 * 🤓 Be aware that the subRows are rendered recursivelly
 */
const NodeRow: FC<NodeRowProps> = ({ data, index, depth }) => {
  const { visibleColumns } = useTableContext()
  const [collapsed, setCollapsed] = useState(false)

  const { children, ...rowData } = data
  const rowKey = `row-${index}-${depth}`

  /**
   * Render subRows recursivelly increasing the depth
   */
  const subRows =
    children &&
    children.map((data, index) => (
      <NodeRow
        key={`${rowKey}__child-${index}`}
        depth={depth + 1}
        index={index}
        data={data}
      />
    ))

  /** Calculate the amount of indentation of the first column */
  const prefixWidth = depth * NESTED_ROW_PREFIX_WIDTH

  /**
   * Renders the entire row
   * @param arrow if has arrow on first cell, or not
   */
  const renderCells = (arrow?: boolean) => {
    return (
      <RowContainer id={`${NAMESPACES.ROW}-${index}-${depth}`} key={rowKey}>
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
              {cellIndex === 0 && (
                <CellPrefix width={prefixWidth}>
                  {arrow && (
                    <CellPrefix.Arrow
                      active={collapsed}
                      onClick={() => setCollapsed(!collapsed)}
                    />
                  )}
                </CellPrefix>
              )}
              {content}
            </Cell>
          )
        })}
      </RowContainer>
    )
  }

  return subRows ? (
    /**
     * Recursive step
     * Render the Node itself and its subRows
     */
    <>
      {renderCells(true)}
      {collapsed && subRows}
    </>
  ) : (
    /**
     * Base case
     * Just render a leaf (Row that does not have children)
     */
    renderCells()
  )
}

interface NodeRowProps {
  data: { children?: Array<unknown> }
  index: number
  depth?: number
}

NodeRow.defaultProps = {
  depth: 1,
}

export default NodeRow
