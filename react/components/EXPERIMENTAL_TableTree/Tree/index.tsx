import React, { FC } from 'react'
import uuid from 'uuid'

import CellPrefix from './CellPrefix'
import Row from '../../EXPERIMENTAL_Table/DataTable/Row'
import useTableTreeCheckboxes, { Item } from '../stateContainers/checkboxes'
import { Column, Items } from '../../EXPERIMENTAL_Table'

const Node: FC<NodeProps> = ({
  columns,
  unicityKey,
  rowHeight,
  nodesKey,
  checkboxes,
  toggleCollapsed,
  isCollapsed,
  data,
  depth,
}) => {
  const isRowChecked = checkboxes && checkboxes.isChecked(data)
  const isRowPartiallyChecked =
    checkboxes && checkboxes.isPartiallyChecked(data)
  const isRowSelected = isRowChecked || isRowPartiallyChecked

  const renderPrefix = (hasChild?: boolean) => (
    <CellPrefix depth={depth} hasCheckbox={!!checkboxes}>
      {hasChild && (
        <CellPrefix.CollapseToggle
          collapsed={isCollapsed(data[unicityKey])}
          onClick={() => toggleCollapsed(data[unicityKey])}
        />
      )}
      {checkboxes && (
        <span className="ph2">
          <CellPrefix.Checkbox
            checked={isRowChecked}
            partial={isRowPartiallyChecked}
            onClick={() => checkboxes.toggle(data)}
          />
        </span>
      )}
    </CellPrefix>
  )

  const renderCells = (hasChild?: boolean) => {
    return (
      <Row height={rowHeight} isActive={isRowSelected}>
        {columns.map((column: Column, cellIndex: number) => {
          const { cellRender, width } = column
          const cellData = data[column.id]
          const content = cellRender
            ? cellRender({ cellData, rowData: data, rowHeight })
            : cellData
          return (
            <Row.Cell key={`cel-${uuid()}`} width={width}>
              {cellIndex === 0 && renderPrefix(hasChild)}
              {content}
            </Row.Cell>
          )
        })}
      </Row>
    )
  }

  return data[nodesKey] ? (
    <>
      {renderCells(true)}
      {isCollapsed(data[unicityKey]) &&
        (data[nodesKey] as Array<Item>).map(data => (
          <Node
            isCollapsed={isCollapsed}
            toggleCollapsed={toggleCollapsed}
            checkboxes={checkboxes}
            nodesKey={nodesKey}
            unicityKey={unicityKey}
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

const Tree: FC<TreeProps> = ({ checkboxes, items, ...nodeProps }) => {
  const [collapsedItems, setCollapsedItems] = React.useState([])

  const listToRender = checkboxes ? items[nodeProps.nodesKey] : items

  const toggleCollapsed = React.useCallback(
    (uniqueKey: unknown) => {
      collapsedItems.includes(uniqueKey)
        ? setCollapsedItems(collapsedItems.filter(key => key !== uniqueKey))
        : setCollapsedItems([...collapsedItems, uniqueKey])
    },
    [collapsedItems]
  )

  const isCollapsed = (uniqueKey: unknown) => collapsedItems.includes(uniqueKey)

  return (
    <>
      {listToRender.map(data => (
        <Node
          isCollapsed={isCollapsed}
          toggleCollapsed={toggleCollapsed}
          checkboxes={checkboxes}
          {...nodeProps}
          key={`row-${uuid()}`}
          data={data}
        />
      ))}
    </>
  )
}

type TreeProps = {
  items: Items
  nodesKey: string
  columns: Array<Column>
  unicityKey: string
  rowHeight: number
  checkboxes?: Partial<ReturnType<typeof useTableTreeCheckboxes>>
}

type NodeProps = {
  toggleCollapsed: (uniqueKey: unknown) => void
  isCollapsed: (uniqueKey: unknown) => boolean
  columns: Array<Column>
  unicityKey: string
  rowHeight: number
  nodesKey: string
  checkboxes?: Partial<ReturnType<typeof useTableTreeCheckboxes>>
  data: Item
  depth?: number
}

Node.defaultProps = {
  depth: 1,
}

export default Tree
