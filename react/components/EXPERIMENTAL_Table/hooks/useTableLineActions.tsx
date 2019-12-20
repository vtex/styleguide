import LineAction, { LineActionObject } from '../LineActions'
import React, { useMemo } from 'react'
import { Items, Column } from '../index'

const NO_TITLE_COLUMN = ' '
const LINE_ACTION_ID = 'lineAction'

export default function useTableLineActions({
  items,
  columns,
  lineActions,
}: LineActionsData) {
  const itemsWithLineActions = useMemo<Items>(() => {
    return lineActions
      ? items.map(item => ({ lineAction: true, ...(item as Object) }))
      : items
  }, [items])

  const columnsWithLineActions = useMemo<Array<Column>>(() => {
    const cellRender = ({ rowData }) => (
      <LineAction lineActions={lineActions} rowData={rowData} />
    )

    return lineActions
      ? [
          ...columns,
          {
            id: LINE_ACTION_ID,
            title: NO_TITLE_COLUMN,
            cellRender,
          },
        ]
      : columns
  }, [columns])

  return {
    itemsWithLineActions,
    columnsWithLineActions,
  }
}

export type LineActionsData = {
  items: Items
  columns: Array<Column>
  lineActions: Array<LineActionObject>
}
