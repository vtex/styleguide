import React, { FC } from 'react'
import uuid from 'uuid'

import { TABLE_HEADER_HEIGHT } from '../constants'
import useTableContext from '../hooks/useTableContext'
import { Row, CellProps, RowProps } from '../Styled'

const Headings: FC<HeadingsProps> = ({ cellProps, rowProps }) => {
  const { visibleColumns } = useTableContext()

  return (
    <Row {...rowProps} height={TABLE_HEADER_HEIGHT}>
      {visibleColumns.map((headerData: Column) => {
        const { headerRender, title, width } = headerData
        const content = headerRender ? headerRender({ headerData }) : title
        return (
          <Row.Cell
            {...cellProps}
            className="bt"
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
  rowProps?: RowProps
  cellProps?: Pick<CellProps, 'as'>
}

export default Headings
