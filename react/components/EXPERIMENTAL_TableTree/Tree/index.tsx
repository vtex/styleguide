import React, { FC, useState, useContext } from 'react'
import uuid from 'uuid'

import CellPrefix from './CellPrefix'
import { Row } from '../../EXPERIMENTAL_Table/Styled'
import useTableContext from '../../EXPERIMENTAL_Table/hooks/useTableContext'
import CheckboxesContext from '../checkboxesContext'
import { ItemTree } from '../hooks/useTableTreeCheckboxes'
import { PREFIX_WIDTH } from '../constants'

const Node: FC<NodeProps> = ({
  data,
  depth,
  collapsedItems,
  toggleCollapsed,
}) => {
  const { visibleColumns } = useTableContext()
  const { toggle, isChecked, isPartiallyChecked } = useContext(
    CheckboxesContext
  )

  const { children, ...rowData } = data

  const isRowChecked = isChecked(data)
  const isRowPartiallyChecked = isPartiallyChecked(data)
  const isRowSelected = isRowChecked || isRowPartiallyChecked
  const isCollapsed = collapsedItems.includes(data.id)

  const renderPrefix = (hasChild?: boolean) => (
    <CellPrefix width={depth * PREFIX_WIDTH}>
      {hasChild && (
        <CellPrefix.Arrow
          active={isCollapsed}
          onClick={() => toggleCollapsed(data.id)}
        />
      )}
      <span className="ph2">
        <CellPrefix.Checkbox
          checked={isRowChecked}
          partial={isRowPartiallyChecked}
          onClick={() => toggle(data)}
        />
      </span>
    </CellPrefix>
  )

  const renderCells = (hasChild?: boolean) => {
    return (
      <Row isSelected={isRowSelected}>
        {visibleColumns.map((column: Column, cellIndex: number) => {
          const { cellRender, width } = column
          const cellData = rowData[column.id]
          const content = cellRender
            ? cellRender({ cellData, rowData })
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

  return children ? (
    <>
      {renderCells(true)}
      {isCollapsed &&
        children.map(data => (
          <Node
            collapsedItems={collapsedItems}
            toggleCollapsed={toggleCollapsed}
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

const Tree: FC = () => {
  const { items } = useTableContext()
  const [collapsedItems, setCollapsedItems] = useState([])
  const toggleCollapsed = (id: string) => {
    collapsedItems.includes(id)
      ? setCollapsedItems(collapsedItems.filter(cid => cid === id))
      : setCollapsedItems([...collapsedItems, id])
  }
  return (
    <>
      {items.children.map(data => (
        <Node
          collapsedItems={collapsedItems}
          toggleCollapsed={toggleCollapsed}
          key={`row-${uuid()}`}
          data={data}
        />
      ))}
    </>
  )
}

type NodeProps = {
  data: ItemTree
  depth?: number
  collapsedItems?: Array<string>
  toggleCollapsed?: (id: string) => void
}

Node.defaultProps = {
  depth: 1,
}

export default Tree
