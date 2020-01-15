import React, { FC, useCallback } from 'react'
import uuid from 'uuid'
import isEmpty from 'lodash/isEmpty'

import CellPrefix from '../../EXPERIMENTAL_Table/DataTable/CellPrefix'
import Row, { ROW_TRANSITIONS } from '../../EXPERIMENTAL_Table/DataTable/Row'
import CollapseToggle from './CollapseToggle'
import { Checkboxes } from '../../EXPERIMENTAL_useCheckboxTree/types'
import { Column } from '../../EXPERIMENTAL_Table'
import { Density } from '../../EXPERIMENTAL_Table/hooks/useTableMeasures'
import useTableMotion from '../../EXPERIMENTAL_Table/hooks/useTableMotion'

const Node: FC<NodeProps> = ({
  columns,
  rowHeight,
  nodesKey,
  checkboxes,
  toggleCollapsed,
  isCollapsed,
  data,
  depth,
  selectedDensity,
  onRowClick,
}) => {
  const motion = useTableMotion(ROW_TRANSITIONS)
  const toggleChildren = useCallback(() => toggleCollapsed(data), [
    data,
    toggleCollapsed,
  ])
  const toggleChecked = useCallback(() => checkboxes.toggle(data), [
    checkboxes,
    data,
  ])

  const isRowChecked = checkboxes && checkboxes.isChecked(data)
  const isRowPartiallyChecked =
    checkboxes && checkboxes.isPartiallyChecked(data)
  const isRowSelected = isRowChecked || isRowPartiallyChecked
  const hasChildren = data[nodesKey] && !isEmpty(data[nodesKey])

  const clickableRow = onRowClick
    ? { onClick: () => onRowClick({ rowData: data }) }
    : undefined

  const clickableCell = hasChildren
    ? clickableRow
      ? undefined
      : { onClick: toggleChildren }
    : undefined

  const renderPrefix = (hasChild?: boolean) => (
    <CellPrefix depth={depth}>
      {hasChild && (
        <CollapseToggle
          collapsed={isCollapsed(data)}
          onClick={toggleChildren}
        />
      )}
      {checkboxes && (
        <span className="ph3">
          <CellPrefix.Checkbox
            checked={isRowChecked}
            partial={isRowPartiallyChecked}
            onClick={toggleChecked}
          />
        </span>
      )}
    </CellPrefix>
  )

  const renderCells = (hasChild?: boolean) => {
    return (
      <Row
        {...clickableRow}
        motion={motion}
        height={rowHeight}
        active={isRowSelected}>
        {columns.map((column: Column, cellIndex: number) => {
          const { cellRenderer, width } = column
          const cellData = data[column.id]
          const content = cellRenderer
            ? cellRenderer({
                cellData,
                rowData: data,
                rowHeight,
                selectedDensity,
                motion,
              })
            : cellData
          return cellIndex === 0 ? (
            <Row.Cell {...clickableCell} key={`cel-${uuid()}`} width={width}>
              {renderPrefix(hasChild)}
              {content}
            </Row.Cell>
          ) : (
            <Row.Cell key={`cel-${uuid()}`} width={width}>
              {content}
            </Row.Cell>
          )
        })}
      </Row>
    )
  }

  return hasChildren ? (
    <>
      {renderCells(true)}
      {isCollapsed(data) &&
        (data[nodesKey] as Array<unknown>).map(data => (
          <Node
            onRowClick={onRowClick}
            selectedDensity={selectedDensity}
            isCollapsed={isCollapsed}
            toggleCollapsed={toggleCollapsed}
            checkboxes={checkboxes}
            nodesKey={nodesKey}
            rowHeight={rowHeight}
            columns={columns}
            key={`row-child-${uuid()}`}
            depth={depth + 1}
            data={data}
          />
        ))}
    </>
  ) : (
    renderCells()
  )
}

type NodeProps = {
  toggleCollapsed: (uniqueKey: unknown) => void
  isCollapsed: (uniqueKey: unknown) => boolean
  columns: Array<Column>
  selectedDensity: Density
  rowHeight: number
  nodesKey: string
  checkboxes?: Checkboxes<unknown>
  data: unknown
  depth?: number
  onRowClick?: ({ rowData: unknown }) => void
}

Node.defaultProps = {
  depth: 0,
}

export default Node
