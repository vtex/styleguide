import LineAction, { LineActionProps } from '../LineActions'
import React, { useMemo } from 'react';

const NO_TITLE_COLUMN = ' '
const LINE_ACTION_ID = 'lineAction'

const useTableLineActions = ({
  columns,
  lineActions
}: hookInput): hookReturn => {

  const lineActionColumns = useMemo<Array<Column>>(() => {

    const cellRender = ({ rowData }) => (
      <LineAction
        lineActions={lineActions}
        rowData={rowData}
      />
    )
        
    return lineActions ? [
      {
        id: LINE_ACTION_ID,
        title: NO_TITLE_COLUMN,
        cellRender,
      },
      ...columns,
    ]: columns;
    
  }, [])

  return {
    lineActionColumns
  }
}

type hookInput = {
  columns: Array<Column>
  lineActions: Array<LineAction> 
}

type hookReturn = {
  lineActionColumns?: Array<Column>
}

export default useTableLineActions