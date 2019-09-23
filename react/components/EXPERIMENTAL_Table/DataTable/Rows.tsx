import React, { FC } from 'react'
import uuid from 'uuid'

import useTableContext from '../hooks/useTableContext'
import { NAMESPACES } from '../constants'
import { Row, RowProps, CellProps } from '../Styled'

const Rows: FC<RowsProps> = ({ cellProps, rowProps }) => {
  const { visibleColumns, items } = useTableContext()

  const renderRow = (rowData: unknown) => (
    <Row {...rowProps} key={`${NAMESPACES.ROW}-${uuid()}`}>
      {visibleColumns.map((column: Column) => {
        const { cellRender, width } = column
        const cellData = rowData[column.id]
        const content = cellRender
          ? cellRender({ cellData, rowData })
          : cellData
        return (
          <Row.Cell {...cellProps} key={`cel-${uuid()}`} width={width}>
            {content}
          </Row.Cell>
        )
      })}
    </Row>
  )

  return <>{items.map(renderRow)}</>
}

export type RowsProps = {
  rowProps?: RowProps
  cellProps?: Pick<CellProps, 'as' | 'className'>
}

export default Rows
