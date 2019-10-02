import React, {
  FC,
  useState,
  useContext,
  createContext,
  useCallback,
} from 'react'
import uuid from 'uuid'

import CellPrefix from './CellPrefix'
import { Row } from '../../EXPERIMENTAL_Table/Styled'
import { useTableContext } from '../../EXPERIMENTAL_Table/contexts'
import { useCheckboxesContext, useTreeContext } from '../contexts'
import { ItemTree } from '../hooks/useTableTreeCheckboxes'

const Node: FC<NodeProps> = ({ data, depth }) => {
  const { visibleColumns } = useTableContext()
  const { toggle, isChecked, isPartiallyChecked } = useCheckboxesContext()
  const { toggleCollapsed, isCollapsed, childsKey } = useTreeContext()

  const isRowChecked = isChecked(data)
  const isRowPartiallyChecked = isPartiallyChecked(data)
  const isRowSelected = isRowChecked || isRowPartiallyChecked

  const renderPrefix = (hasChild?: boolean) => (
    <CellPrefix depth={depth}>
      {hasChild && (
        <CellPrefix.Arrow
          active={isCollapsed(data.id)}
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
          const cellData = data[column.id]
          const content = cellRender
            ? cellRender({ cellData, rowData: data })
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

  return data[childsKey] ? (
    <>
      {renderCells(true)}
      {isCollapsed(data.id) &&
        (data[childsKey] as Array<ItemTree>).map(data => (
          <Node key={`row-child-${uuid()}`} depth={depth + 1} data={data} />
        ))}
    </>
  ) : (
    renderCells()
  )
}

const Tree: FC = () => {
  const { items } = useTableContext()
  return (
    <>
      {items.children.map(data => (
        <Node key={`row-${uuid()}`} data={data} />
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
