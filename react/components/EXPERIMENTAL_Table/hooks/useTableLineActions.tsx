import LineAction, { LineActionObject } from '../LineActions'
import React, { useMemo } from 'react';

const NO_TITLE_COLUMN = ' '
const LINE_ACTION_ID = 'lineAction'

const useTableLineActions = ({
  items,
  columns,
  lineActions
}: hookInput): hookReturn => {
  
  const withLineActionItems = useMemo<Array<Object>>(() => {
    return lineActions ? items.map((item) => ({ lineAction: true, ...item })): items
  }, [items])

  const withLineActionColumns = useMemo<Array<Column>>(() => {
    const cellRender = ({ rowData }) => (
      <LineAction
        lineActions={lineActions}
        rowData={rowData}
      />
    )
        
    return lineActions ? [
      ...columns,
      {
        id: LINE_ACTION_ID,
        title: NO_TITLE_COLUMN,
        cellRender,
      },
    ]: columns
  }, [columns])

  return {
    withLineActionColumns,
    withLineActionItems,
  }
}

type hookInput = {
  items: Array<Object>
  columns: Array<Column>
  lineActions: Array<LineActionObject> 
}

type hookReturn = {
  withLineActionColumns?: Array<Column>,
  withLineActionItems?: Array<Object>,
}

export default useTableLineActions