import React, { FC } from 'react'
import uuid from 'uuid'

import Cell, { CellProps } from './Cell'
import { TABLE_HEADER_HEIGHT } from '../constants'
import useTableContext from '../hooks/useTableContext'

const Headings: FC<HeadingsProps> = ({ cellProps, as: Tag }) => {
  const { visibleColumns } = useTableContext()

  const render = (headerData: Column) => {
    const { headerRender, title, width } = headerData
    const content = headerRender ? headerRender({ headerData }) : title
    return (
      <Cell
        {...cellProps}
        className="bt"
        key={`heading-${uuid()}`}
        width={width}>
        {content}
      </Cell>
    )
  }

  return (
    <Tag
      style={{
        height: TABLE_HEADER_HEIGHT,
      }}>
      {visibleColumns.map(render)}
    </Tag>
  )
}

Headings.defaultProps = {
  as: 'tr',
  cellProps: {
    as: 'th',
  },
}

type HeadingsProps = {
  as?: 'tr' | 'div' | 'ul'
  cellProps?: Pick<CellProps, 'as'>
}

export default Headings
