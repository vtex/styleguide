import React, { FC } from 'react'

import Cell from './Cell'
import { TABLE_HEADER_HEIGHT, NAMESPACES } from '../constants'
import useTableContext from '../hooks/useTableContext'

const Header: FC = () => {
  const { visibleColumns } = useTableContext()

  const renderHeader = (headerData: Column, headerIndex: number) => {
    const { headerRender, title, width } = headerData
    const content = headerRender ? headerRender({ headerData }) : title
    const namespace = `header-${headerIndex}`
    return (
      <Cell id={namespace} key={namespace} width={width} isHeader>
        {content}
      </Cell>
    )
  }

  return (
    <thead
      id={NAMESPACES.HEADER}
      className="w-100 h-100 ph4 truncate overflow-x-hidden c-muted-2 f6">
      <tr
        style={{
          height: TABLE_HEADER_HEIGHT,
        }}>
        {visibleColumns.map(renderHeader)}
      </tr>
    </thead>
  )
}

export default Header
