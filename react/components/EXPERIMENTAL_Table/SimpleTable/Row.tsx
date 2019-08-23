import React, { FC, useState } from 'react'

import Cell from './Cell'
import useTableContext from '../hooks/useTableContext'
import { COLLAPSIBLE_ROW_PREFIX_WIDTH } from '../constants'

const RowContainer: FC = ({ children }) => {
  const { rowHeight } = useTableContext()
  return (
    <div
      style={{ height: rowHeight }}
      className="dt-row w-100 h-100 ph4 truncate overflow-x-hidden">
      {children}
    </div>
  )
}

const Row: FC<RowProps> = ({ data, index, depth }) => {
  const { columns, nestedRows } = useTableContext()
  const [collapsed, setCollapsed] = useState(false)

  const { children, ...rowData } = data

  const subRows =
    nestedRows &&
    children &&
    children.map((data, index) => (
      <Row depth={depth + 1} index={index} data={data} />
    ))

  const renderPrefix = (renderIf: boolean, child?: any) => {
    return (
      renderIf && (
        <span
          className="dib tr pr2"
          style={{ width: depth * COLLAPSIBLE_ROW_PREFIX_WIDTH }}>
          {child}
        </span>
      )
    )
  }

  const renderLeaf = () => {
    return (
      <RowContainer key={`row-${index}`}>
        {Object.keys(rowData).map((cel: string, cellIndex: number) => {
          const cellRender = columns[cel].cellRender
          const cellData = rowData[cel]
          const content = cellRender
            ? cellRender({ cellData, rowData })
            : cellData
          return (
            <Cell key={`${index}-${cellIndex}`}>
              {nestedRows && renderPrefix(cellIndex === 0)}
              {content}
            </Cell>
          )
        })}
      </RowContainer>
    )
  }

  const renderNode = () => {
    return (
      <>
        <RowContainer key={`row-${index}`}>
          {Object.keys(rowData).map((cel: string, cellIndex: number) => {
            const cellRender = columns[cel].cellRender
            const cellData = rowData[cel]
            const content = cellRender
              ? cellRender({ cellData, rowData })
              : cellData
            return (
              <Cell key={`${index}-${cellIndex}`}>
                {renderPrefix(
                  cellIndex === 0,
                  <Cell.Arrow
                    active={collapsed}
                    onClick={() => setCollapsed(!collapsed)}
                  />
                )}
                {content}
              </Cell>
            )
          })}
        </RowContainer>
        {collapsed && subRows}
      </>
    )
  }

  return subRows ? renderNode() : renderLeaf()
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
