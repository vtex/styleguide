import React, { FC } from 'react'
import uuid from 'uuid'

import CellPrefix from './CellPrefix'
import { Row } from '../../EXPERIMENTAL_Table/Styled'
import { useTableContext } from '../../EXPERIMENTAL_Table/contexts'
import { useCheckboxesContext, useTreeContext } from '../contexts'
import { Item } from '../hooks/useTableTreeCheckboxes'

const Node: FC<NodeProps> = ({ data, depth }) => {
  const { visibleColumns, unicityKey, rowHeight } = useTableContext()
  const checkboxes = useCheckboxesContext()
  const { toggleCollapsed, isCollapsed, nodesKey } = useTreeContext()

  const isRowChecked = checkboxes && checkboxes.isChecked(data)
  const isRowPartiallyChecked =
    checkboxes && checkboxes.isPartiallyChecked(data)
  const isRowSelected = isRowChecked || isRowPartiallyChecked

  const renderPrefix = (hasChild?: boolean) => (
    <CellPrefix depth={depth}>
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
      <Row isSelected={isRowSelected}>
        {visibleColumns.map((column: Column, cellIndex: number) => {
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
          <Node key={`row-child-${uuid()}`} depth={depth + 1} data={data} />
        ))}
    </>
  ) : (
    renderCells()
  )
}

const Tree: FC = () => {
  const { items } = useTableContext()
  const { nodesKey } = useTreeContext()
  const checkboxes = useCheckboxesContext()
  const listToRender = checkboxes ? items[nodesKey] : items
  return (
    <>
      {listToRender.map(data => (
        <Node key={`row-${uuid()}`} data={data} />
      ))}
    </>
  )
}

type NodeProps = {
  data: Item
  depth?: number
  collapsedItems?: Array<string>
}

Node.defaultProps = {
  depth: 1,
}

export default Tree
