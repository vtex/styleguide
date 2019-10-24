import React, { FC } from 'react'
import uuid from 'uuid'

import { TABLE_HEADER_HEIGHT } from '../constants'
import Row, { CellProps, RowProps } from './Row'
import { Column } from '../index'

const Headings: FC<HeadingsProps> = ({ columns, cellProps, rowProps }) => {
  return (
    <Row {...rowProps} height={TABLE_HEADER_HEIGHT}>
      {columns.map((headerData: Column) => {
        const { headerRender, title, width } = headerData
        const content = headerRender ? headerRender({ headerData }) : title
        return (
          <Row.Cell
            {...cellProps}
            className="bt normal"
            key={`heading-${uuid()}`}
            width={width}>
            {content}
          </Row.Cell>
        )
      })}
    </Row>
  )
}

Headings.defaultProps = {
  cellProps: {
    as: 'th',
  },
}

type HeadingsProps = {
  columns?: Array<Column>
  rowProps?: RowProps
  cellProps?: Pick<CellProps, 'as'>
}

export default React.memo(Headings)
