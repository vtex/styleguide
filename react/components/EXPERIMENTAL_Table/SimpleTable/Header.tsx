import React, { FC } from 'react'

import Cell from './Cell'
import { TABLE_HEADER_HEIGHT } from '../constants'
import useTableContext from '../hooks/useTableContext'

const Header: FC = () => {
  const { columns } = useTableContext()
  const renderHeader = (headerData: string, headerIndex: number) => {
    const headerRender = columns[headerData].headerRender
    const content = headerRender
      ? headerRender({ headerData })
      : columns[headerData].title
    return <Cell key={`col-${headerIndex}`} content={content} isHeader />
  }

  return (
    <div
      key="header"
      className="dt-row w-100 h-100 ph4 truncate overflow-x-hidden c-muted-2 f6"
      style={{
        height: TABLE_HEADER_HEIGHT,
      }}>
      {Object.keys(columns).map(renderHeader)}
    </div>
  )
}

export default Header
