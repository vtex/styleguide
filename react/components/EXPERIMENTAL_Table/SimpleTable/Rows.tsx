import React, { FC, useState } from 'react'

import Cell from './Cell'
import useTableContext from '../hooks/useTableContext'

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

const Row: FC<RowProps> = ({ data, index }) => {
  const { columns } = useTableContext()
  const [collapsed, setCollapsed] = useState(false)

  const { children, ...rowData } = data

  const subRows =
    children && children.map((data, index) => <Row index={index} data={data} />)

  const renderLeaf = () => {
    return (
      <RowContainer key={`row-${index}`}>
        {Object.keys(rowData).map((cel: string, cellIndex: number) => {
          const cellRender = columns[cel].cellRender
          const cellData = rowData[cel]
          const content = cellRender
            ? cellRender({ cellData, rowData })
            : cellData
          return <Cell key={`${index}-${cellIndex}`}>{content}</Cell>
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
                {cellIndex === 0 && (
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

const Rows: FC = () => {
  const { items } = useTableContext()

  return (
    <>
      {items.map((data, index) => (
        <Row data={data} index={index} />
      ))}
    </>
  )
}

interface RowProps {
  data: { children?: Array<unknown> }
  index: number
}

export default Rows
