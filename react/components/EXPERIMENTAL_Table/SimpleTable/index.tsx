import React, { FC, memo } from 'react'

import Cell from './Cell'
import useTableContext from '../hooks/useTableContext'
import { constants } from '../util'

const SimpleTable: FC = () => {
  const { columns, items } = useTableContext()

  const renderHeadingRow = (headerData: string, headingIndex: number) => {
    const headerRender = columns[headerData].headerRender
    const content = headerRender
      ? headerRender({ headerData })
      : columns[headerData].title
    return <Cell key={`col-${headingIndex}`} content={content} isHeading />
  }

  const renderRow = (rowData: Object, rowIndex: number) => {
    return (
      <tr
        style={{ height: constants.ROW_HEIGHT }}
        className="w-100 h-100 ph4 truncate"
        key={`row-${rowIndex}`}>
        {Object.keys(rowData).map((cel: string, cellIndex: number) => {
          const cellRender = columns[cel].cellRender
          const cellData = rowData[cel]
          const content = cellRender
            ? cellRender({ cellData, rowData })
            : cellData
          return <Cell key={`${rowIndex}-${cellIndex}`} content={content} />
        })}
      </tr>
    )
  }

  const headings = (
    <tr
      key="heading"
      className="w-100 h-100 c-muted-2 f6 truncate ph4 overflow-x-hidden"
      style={{
        height: constants.TABLE_HEADER_HEIGHT,
      }}>
      {Object.keys(columns).map(renderHeadingRow)}
    </tr>
  )

  const body = items.map(renderRow)

  return (
    <div className="mw-100">
      <div className="overflow-x-auto">
        <table className="w-100" style={{ borderSpacing: 0 }}>
          <thead>{headings}</thead>
          <tbody>{body}</tbody>
        </table>
      </div>
    </div>
  )
}

export default memo(SimpleTable)
