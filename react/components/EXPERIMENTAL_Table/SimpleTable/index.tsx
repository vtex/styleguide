import React, { FC, memo } from 'react'

import Cell from './Cell'
import useTableContext from '../hooks/useTableContext'
import { constants } from '../util'

const SimpleTable: FC = () => {
  const { columns, items } = useTableContext()
  const rowClassNames = 'dt-row w-100 h-100 ph4 truncate overflow-x-hidden'

  const renderHeader = (headerData: string, headerIndex: number) => {
    const headerRender = columns[headerData].headerRender
    const content = headerRender
      ? headerRender({ headerData })
      : columns[headerData].title
    return <Cell key={`col-${headerIndex}`} content={content} isHeader />
  }

  const renderRow = (rowData: Object, rowIndex: number) => {
    return (
      <div
        style={{ height: constants.ROW_HEIGHT }}
        className={rowClassNames}
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

  const header = (
    <div
      key="header"
      className={`${rowClassNames} c-muted-2 f6`}
      style={{
        height: constants.TABLE_HEADER_HEIGHT,
      }}>
      {Object.keys(columns).map(renderHeader)}
    </div>
  )

  const body = items.map(renderRow)

  return (
    <div className="mw-100">
      <div className="overflow-x-auto">
        <div className="dt w-100" style={{ borderSpacing: 0 }}>
          {header}
          {body}
        </div>
      </div>
    </div>
  )
}

export default memo(SimpleTable)
