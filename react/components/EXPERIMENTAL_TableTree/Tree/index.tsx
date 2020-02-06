import React, { FC, useCallback } from 'react'
import uuid from 'uuid'

import {
  comparatorCurry,
  Checkboxes,
  Tree as TreeType,
} from '../../EXPERIMENTAL_useCheckboxTree/types'
import { Column, Items } from '../../EXPERIMENTAL_Table/types'
import { Density } from '../../EXPERIMENTAL_Table/hooks/useTableMeasures'
import Node from './Node'

const Tree: FC<TreeProps> = ({
  checkboxes,
  items,
  comparator,
  ...nodeProps
}) => {
  const [collapsedItems, setCollapsedItems] = React.useState<Array<unknown>>([])

  const listToRender = checkboxes ? items[nodeProps.nodesKey] : items

  const isCollapsed = useCallback(
    (item: unknown) => collapsedItems.some(comparator(item)),
    [collapsedItems, comparator]
  )

  const toggleCollapsed = React.useCallback(
    (item: unknown) => {
      isCollapsed(item)
        ? setCollapsedItems(
            collapsedItems.filter(
              collapsedItem => !comparator(collapsedItem)(item)
            )
          )
        : setCollapsedItems([...collapsedItems, item])
    },
    [collapsedItems, comparator, isCollapsed]
  )

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
  currentDensity: Density
  nodesKey: string
  columns: Array<Column>
  comparator: comparatorCurry<TreeType<unknown>>
  rowHeight: number
  checkboxes?: Checkboxes<unknown>
  onRowClick?: ({ rowData: unknown }) => void
}

export default React.memo(Tree)
