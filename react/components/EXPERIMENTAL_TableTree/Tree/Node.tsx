import React, { FC, useCallback } from 'react'
import uuid from 'uuid'
import isEmpty from 'lodash/isEmpty'
import pick from 'lodash/pick'

import Row, { ROW_TRANSITIONS } from '../../EXPERIMENTAL_Table/DataTable/Row'
import CollapseToggle from './CollapseToggle'
import { Checkboxes } from '../../EXPERIMENTAL_useCheckboxTree/types'
import { Column } from '../../EXPERIMENTAL_Table/types'
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
  currentDensity,
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

  const renderCells = (hasChild?: boolean) => {
    return (
      <Row
        {...clickableRow}
        motion={motion}
        height={rowHeight}
        active={isRowSelected}>
        {columns.map((column: Column, cellIndex: number) => {
          const { cellRenderer, width } = column
          const cellData = column.condensed
            ? pick(data, column.condensed)
            : column.extended
            ? data
            : data[column.id]
          const content = cellRenderer
            ? cellRenderer({
                data: cellData,
                rowHeight,
                currentDensity,
                motion,
              })
            : cellData
          return cellIndex === 0 ? (
            <Row.Cell {...clickableCell} key={`cel-${uuid()}`} width={width}>
              <Row.Cell.Prefix depth={depth}>
                {hasChild && (
                  <CollapseToggle
                    collapsed={isCollapsed(data)}
                    onClick={toggleChildren}
                  />
                )}
                {checkboxes && (
                  <span className="ph3">
                    <Row.Cell.Prefix.Checkbox
                      checked={isRowChecked}
                      partial={isRowPartiallyChecked}
                      onClick={toggleChecked}
                    />
                  </span>
                )}
              </Row.Cell.Prefix>
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
            currentDensity={currentDensity}
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
  currentDensity: Density
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
