import React, { FC } from 'react'
import classNames from 'classnames'

import { TABLE_HEADER_HEIGHT } from '../hooks/useTableMeasures'
import Row, { RowProps } from './Row'
import { Column } from '../types'
import { Checkboxes } from '../../EXPERIMENTAL_useCheckboxTree/types'
import Cell from './Cell'
import useTableSort from '../hooks/useTableSort'

const Headings: FC<HeadingsProps> = ({
  columns,
  checkboxes,
  rowProps,
  sorting,
  sticky,
}) => {
  return (
    <Row {...rowProps} height={TABLE_HEADER_HEIGHT}>
      {columns.map((columnData: Column, headerIndex: number) => {
        const { id, title, width, sortable } = columnData
        const cellClassName = classNames('bt normal', { pointer: sortable })
        const cellSorting = sorting?.sorted && sorting.sorted.by === id
        const ascending = sorting && sorting.sorted.order !== 'DSC'
        const onclick =
          sortable && sorting ? { onClick: () => sorting.sort(id) } : {}
        return (
          <Row.Cell
            {...onclick}
            sortable={sortable}
            sorting={cellSorting}
            className={cellClassName}
            key={headerIndex}
            width={width}
            sticky={sticky}
            header
          >
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
            {sortable && (
              <Cell.Suffix sorting={cellSorting} ascending={ascending} />
            )}
          </Row.Cell>
        )
      })}
    </Row>
  )
}

type HeadingsProps = {
  columns: Column[]
  rowProps?: RowProps
  checkboxes?: Checkboxes<unknown>
  sorting?: Partial<ReturnType<typeof useTableSort>>
  sticky?: boolean
}

export default React.memo(Headings)
