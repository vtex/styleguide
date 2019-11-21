import React, { FC } from 'react'
import uuid from 'uuid'

import { TABLE_HEADER_HEIGHT } from '../hooks/useTableMeasures'
import Row, { CellProps, RowProps } from './Row'
import { Column, Items } from '../index'
import { Checkboxes } from '../../EXPERIMENTAL_CheckboxTree'
import CellPrefix from '../../EXPERIMENTAL_TableTree/Tree/CellPrefix'

const Headings: FC<HeadingsProps> = ({
  columns,
  checkboxes,
  cellProps,
  rowProps,
}) => {
  return (
    <Row {...rowProps} height={TABLE_HEADER_HEIGHT}>
      {columns.map((columnData: Column, headerIndex: number) => {
        const { headerRenderer, title, width } = columnData
        const content = headerRenderer ? headerRenderer({ columnData }) : title
        return (
          <Row.Cell
            {...cellProps}
            className="bt normal"
            key={`heading-${uuid()}`}
            width={width}>
            {checkboxes && headerIndex === 0 && (
              <CellPrefix>
                <span className="ph3">
                  <CellPrefix.Checkbox
                    checked={checkboxes.isChecked(checkboxes.itemTree)}
                    partial={checkboxes.isPartiallyChecked(checkboxes.itemTree)}
                    onClick={() => checkboxes.toggle(checkboxes.itemTree)}
                  />
                </span>
              </CellPrefix>
            )}
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
  columns: Array<Column>
  rowProps?: RowProps
  cellProps?: Pick<CellProps, 'as'>
  checkboxes?: Checkboxes<unknown>
}

export default React.memo(Headings)
