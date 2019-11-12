import React, { FC } from 'react'
import uuid from 'uuid'

import { TABLE_HEADER_HEIGHT } from '../../EXPERIMENTAL_Table/hooks/useTableMeasures'
import Row, {
  CellProps,
  RowProps,
} from '../../EXPERIMENTAL_Table/DataTable/Row'
import CellPrefix from './CellPrefix'
import { Column } from '../../EXPERIMENTAL_Table'
import useTableTreeCheckboxes from '../hooks/useTableTreeCheckboxes'

const TreeHeadings: FC<TreeHeadingsProps> = ({
  checkboxes,
  columns,
  items,
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
              <CellPrefix hasCheckbox={!!checkboxes}>
                <span className="ph3">
                  <CellPrefix.Checkbox
                    checked={checkboxes.isChecked(items)}
                    partial={checkboxes.isPartiallyChecked(items)}
                    onClick={() => checkboxes.toggle(items)}
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

TreeHeadings.defaultProps = {
  cellProps: {
    as: 'th',
  },
}

type TreeHeadingsProps = {
  columns: Array<Column>
  items: any
  rowProps?: RowProps
  cellProps?: Pick<CellProps, 'as'>
  checkboxes?: Partial<ReturnType<typeof useTableTreeCheckboxes>>
}

export default React.memo(TreeHeadings)
