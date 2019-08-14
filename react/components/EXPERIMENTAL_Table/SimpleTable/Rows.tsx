import React, { FC } from 'react'

import Cell from './Cell'
import useTableContext from '../hooks/useTableContext'
import constants from '../constants'

const Rows: FC = () => {
  const { columns, items } = useTableContext()

  const renderRow = (rowData: Object, rowIndex: number) => {
    return (
      <div
        style={{ height: constants.ROW_HEIGHT }}
        className="dt-row w-100 h-100 ph4 truncate overflow-x-hidden"
        key={`row-${rowIndex}`}>
        {Object.keys(rowData).map((cel: string, cellIndex: number) => {
          const cellRender = columns[cel].cellRender
          const cellData = rowData[cel]
          const content = cellRender
            ? cellRender({ cellData, rowData })
            : cellData
          return <Cell key={`${rowIndex}-${cellIndex}`} content={content} />
        })}
      </div>
    )
  }

  return <>{items.map(renderRow)}</>
}

export default Rows
