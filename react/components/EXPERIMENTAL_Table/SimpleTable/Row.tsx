import React, { FC, useState } from 'react'

import Cell from './Cell'
import useTableContext from '../hooks/useTableContext'
import { NESTED_ROW_PREFIX_WIDTH, NAMESPACES } from '../constants'

/**
 * Container of each table row
 */
const RowContainer: FC<{ id: string }> = ({ id, children }) => {
  const { rowHeight } = useTableContext()
  return (
    <div
      id={id}
      style={{ height: rowHeight }}
      className="dt-row w-100 h-100 ph4 truncate overflow-x-hidden">
      {children}
    </div>
  )
}

/**
 * Row of the Table (suports nesting)
 * 🤓Be aware that the subRows are rendered recursivelly
 */
const Row: FC<RowProps> = ({ data, index, depth }) => {
  const { columns, nestedRows } = useTableContext()
  const [collapsed, setCollapsed] = useState(false)

  const { children, ...rowData } = data

  const rowKey = `row-${index}-${depth}`

  /**
   * Render subRows recursivelly increasing the depth
   */
  const subRows =
    nestedRows &&
    children &&
    children.map((data, index) => (
      <Row
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
        {columns.map((column: Column, cellIndex: number) => {
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
              {nestedRows && cellIndex === 0 && (
                <Cell.Prefix width={prefixWidth}>
                  {arrow && (
                    <Cell.Prefix.Arrow
                      active={collapsed}
                      onClick={() => setCollapsed(!collapsed)}
                    />
                  )}
                </Cell.Prefix>
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

interface RowProps {
  data: { children?: Array<unknown> }
  index: number
  depth?: number
}

Row.defaultProps = {
  depth: 1,
}

export default Row
