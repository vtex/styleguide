import React, { FC } from 'react'
import uuid from 'uuid'

import { TABLE_HEADER_HEIGHT } from '../hooks/useTableMeasures'
import Row, { CellProps, RowProps } from './Row'
import { Column, Items } from '../index'
import { Checkboxes } from '../../EXPERIMENTAL_useCheckboxTree/types'
import CellPrefix from './CellPrefix'

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
            key={`heading-${uuid()}`}
            width={width}>
            {checkboxes && headerIndex === 0 && (
              <CellPrefix>
                <span className="ph3">
                  <CellPrefix.Checkbox
                    checked={checkboxes.allChecked}
                    partial={checkboxes.someChecked}
                    // eslint-disable-next-line react/jsx-handler-names
                    onClick={checkboxes.toggleAll}
                  />
                </span>
              </CellPrefix>
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
