import React, { FC, useContext } from 'react'
import uuid from 'uuid'

import { TABLE_HEADER_HEIGHT } from '../../EXPERIMENTAL_Table/constants'
import useTableContext from '../../EXPERIMENTAL_Table/hooks/useTableContext'
import { Row, CellProps, RowProps } from '../../EXPERIMENTAL_Table/Styled'
import CellPrefix from './CellPrefix'
import useCheckboxesContext from '../hooks/useCheckboxesContext'

const TreeHeadings: FC<TreeHeadingsProps> = ({ cellProps, rowProps }) => {
  const { visibleColumns } = useTableContext()
  const {
    toggle,
    itemTree,
    isChecked,
    isPartiallyChecked,
  } = useCheckboxesContext()

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
            {headerIndex === 0 && (
              <CellPrefix>
                <span className="ph2">
                  <CellPrefix.Checkbox
                    checked={isChecked(itemTree)}
                    partial={isPartiallyChecked(itemTree)}
                    onClick={() => toggle(itemTree)}
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
