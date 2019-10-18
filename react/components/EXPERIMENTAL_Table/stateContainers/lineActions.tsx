import LineAction, { LineActionObject } from '../LineActions'
import React, { useMemo } from 'react'

const NO_TITLE_COLUMN = ' '
const LINE_ACTION_ID = 'lineAction'

export default function useTableLineActions({
  items,
  columns,
  lineActions,
}: {
  items: Array<Object>
  columns: Array<Column>
  lineActions: Array<LineActionObject>
}) {
  const itemsWithLineActions = useMemo<Array<Object>>(() => {
    return lineActions
      ? items.map(item => ({ lineAction: true, ...item }))
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
