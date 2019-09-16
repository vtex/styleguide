import LineAction, { LineActionProps } from '../LineActions'
import React, { useMemo } from 'react';

const NO_TITLE_COLUMN = ' '
const LINE_ACTION_ID = 'lineAction'

const useTableLineActions = ({
  items,
  columns,
  lineActions
}: hookInput): hookReturn => {
  
  const lineActionItems = useMemo<Array<Object>>(() => {
    return lineActions ? items.map((item) => ({ lineAction: true, ...item })) : items
  }, [items, columns])

  const lineActionColumns = useMemo<Array<Column>>(() => {
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
    ]: columns;
    
  }, [items, columns])


  return {
    lineActionColumns,
    lineActionItems,
  }
}

type hookInput = {
  items: Array<Object>
  columns: Array<Column>
  lineActions: Array<LineAction> 
}

type hookReturn = {
  lineActionColumns?: Array<Column>,
  lineActionItems?: Array<Object>,
}

export default useTableLineActions