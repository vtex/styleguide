import React, { FC, useContext } from 'react'
import uuid from 'uuid'

import { TABLE_HEADER_HEIGHT } from '../../EXPERIMENTAL_Table/constants'
import { useTableContext } from '../../EXPERIMENTAL_Table/contexts'
import { useCheckboxesContext, useTreeContext } from '../contexts'
import { Row, CellProps, RowProps } from '../../EXPERIMENTAL_Table/Styled'
import CellPrefix from './CellPrefix'

const TreeHeadings: FC<TreeHeadingsProps> = ({ cellProps, rowProps }) => {
  const { visibleColumns } = useTableContext()
  const { items } = useTableContext()
  const checkboxes = useCheckboxesContext()

  return (
    <Row {...rowProps} height={TABLE_HEADER_HEIGHT}>
      {visibleColumns.map((headerData: Column, headerIndex: number) => {
        const { headerRender, title, width } = headerData
        const content = headerRender ? headerRender({ headerData }) : title
        return (
          <Row.Cell
            {...cellProps}
            className="bt"
            key={`heading-${uuid()}`}
            width={width}>
            {checkboxes && headerIndex === 0 && (
              <CellPrefix>
                <span className="ph2">
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
  rowProps?: RowProps
  cellProps?: Pick<CellProps, 'as'>
}

export default TreeHeadings
