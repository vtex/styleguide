import React, { FC } from 'react'

import { TABLE_HEADER_HEIGHT } from '../hooks/useTableMeasures'
import Row, { RowProps } from './Row'
import { Column } from '../index'
import { Checkboxes } from '../../EXPERIMENTAL_useCheckboxTree/types'
import Cell, { CellProps } from './Cell'

const Headings: FC<HeadingsProps> = ({
  columns,
  checkboxes,
  cellProps,
  rowProps,
}) => {
  return (
    <Row {...rowProps} height={TABLE_HEADER_HEIGHT}>
      {columns.map((columnData: Column, headerIndex: number) => {
        const { title, width } = columnData
        return (
          <Row.Cell
            {...cellProps}
            className="bt normal"
            key={headerIndex}
            width={width}>
            {checkboxes && headerIndex === 0 && (
              <Cell.Prefix>
                <span className="ph3">
                  <Cell.Prefix.Checkbox
                    checked={checkboxes.allChecked}
                    partial={checkboxes.someChecked}
                    disabled={checkboxes.allDisabled}
                    // eslint-disable-next-line react/jsx-handler-names
                    onClick={checkboxes.toggleAll}
                  />
                </span>
              </Cell.Prefix>
            )}
            {title}
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
  columns: Array<Column>
  rowProps?: RowProps
  cellProps?: Pick<CellProps, 'as'>
  checkboxes?: Checkboxes<unknown>
}

export default React.memo(Headings)
