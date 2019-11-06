import React, { FC } from 'react'
import uuid from 'uuid'
import isEmpty from 'lodash/isEmpty'

import CellPrefix from './CellPrefix'
import Row from '../../EXPERIMENTAL_Table/DataTable/Row'
import useTableTreeCheckboxes, {
  Item,
  comparatorCurry,
} from '../hooks/useTableTreeCheckboxes'
import { Column, Items } from '../../EXPERIMENTAL_Table'
import { Density } from '../../EXPERIMENTAL_Table/hooks/useTableMeasures'

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
}) => {
  const isRowChecked = checkboxes && checkboxes.isChecked(data)
  const isRowPartiallyChecked =
    checkboxes && checkboxes.isPartiallyChecked(data)
  const isRowSelected = isRowChecked || isRowPartiallyChecked

  const renderPrefix = (hasChild?: boolean) => (
    <CellPrefix depth={depth} hasCheckbox={!!checkboxes}>
      {hasChild && (
        <CellPrefix.CollapseToggle
          collapsed={isCollapsed(data)}
          onClick={() => toggleCollapsed(data)}
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
      <Row height={rowHeight} active={isRowSelected}>
        {columns.map((column: Column, cellIndex: number) => {
          const { cellRender, width } = column
          const cellData = data[column.id]
          const content = cellRender
            ? cellRender({
                cellData,
                rowData: data,
                rowHeight,
                selectedDensity,
              })
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

  return data[nodesKey] && !isEmpty(data[nodesKey]) ? (
    <>
      {renderCells(true)}
      {isCollapsed(data) &&
        (data[nodesKey] as Array<Item>).map(data => (
          <Node
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

const Tree: FC<TreeProps> = ({
  checkboxes,
  items,
  comparator,
  ...nodeProps
}) => {
  const [collapsedItems, setCollapsedItems] = React.useState<Array<Item>>([])

  const listToRender = checkboxes ? items[nodeProps.nodesKey] : items

  const toggleCollapsed = React.useCallback(
    (item: Item) => {
      isCollapsed(item)
        ? setCollapsedItems(
            collapsedItems.filter(
              collapsedItem => !comparator(collapsedItem)(item)
            )
          )
        : setCollapsedItems([...collapsedItems, item])
    },
    [collapsedItems]
  )

  const isCollapsed = (item: Item) => collapsedItems.some(comparator(item))

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
  selectedDensity: Density
  nodesKey: string
  columns: Array<Column>
  comparator: comparatorCurry
  rowHeight: number
  checkboxes?: Partial<ReturnType<typeof useTableTreeCheckboxes>>
}

type NodeProps = {
  toggleCollapsed: (uniqueKey: unknown) => void
  isCollapsed: (uniqueKey: unknown) => boolean
  columns: Array<Column>
  selectedDensity: Density
  rowHeight: number
  nodesKey: string
  checkboxes?: Partial<ReturnType<typeof useTableTreeCheckboxes>>
  data: Item
  depth?: number
}

Node.defaultProps = {
  depth: 1,
}

export default React.memo(Tree)
