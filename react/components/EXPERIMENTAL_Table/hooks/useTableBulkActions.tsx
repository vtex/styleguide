import React, { useMemo, useEffect, useReducer, useCallback } from 'react'
import uuid from 'uuid'

import Checkbox from '../Checkbox'
import { BulkActionsProps } from '../BulkActions'
import { NAMESPACES } from '../constants'

const useTableBulkActions = ({
  items,
  columns,
  bulkActions,
  unicityKey = 'id',
}: hookInput): hookReturn => {
  const [bulkState, dispatch] = useReducer(reducer, {
    selectedRows: [],
    allLinesSelected: false,
  })

  const hasPrimaryBulkAction = useMemo(
    () =>
      bulkActions &&
      bulkActions.main &&
      typeof bulkActions.main.onClick === 'function',
    [bulkActions]
  )

  const hasSecondaryBulkActions = useMemo(
    () => bulkActions && bulkActions.others && bulkActions.others.length > 0,
    [bulkActions]
  )

  const hasBulkActions = hasPrimaryBulkAction || hasSecondaryBulkActions

  const bulkedColumns = useMemo<Array<Column>>(() => {
    const headerRender = () => {
      const selectedRowsLength = bulkState.selectedRows.length
      const itemsLength = items.length
      const isChecked = selectedRowsLength === itemsLength
      const isPartial =
        selectedRowsLength > 0 && selectedRowsLength < itemsLength

      return (
        <Checkbox
          checked={isChecked}
          onClick={selectAllVisibleRows}
          id={`${NAMESPACES.CHECKBOX}-all`}
          partial={isPartial}
        />
      )
    }

    const cellRender = ({ rowData }) => (
      <Checkbox
        checked={bulkState.selectedRows.some(
          row => row[unicityKey] === rowData[unicityKey]
        )}
        onClick={() => selectRow(rowData)}
        id={`${NAMESPACES.CHECKBOX}-${rowData}-${uuid()}`}
        disabled={bulkState.allLinesSelected}
      />
    )

    return hasBulkActions
      ? [
          {
            [unicityKey]: 'bulk',
            width: 40,
            headerRender,
            cellRender,
          },
          ...columns,
        ]
      : columns
  }, [bulkState.selectedRows, bulkState.allLinesSelected])

  useEffect(() => {
    if (bulkActions && bulkActions.onChange) {
      const selectedParameters = bulkState.allLinesSelected
        ? { allLinesSelected: true }
        : { selectedRows: bulkState.selectedRows }
      bulkActions.onChange(selectedParameters)
    }
  }, [bulkState.selectedRows, bulkState.allLinesSelected, bulkActions])

  const selectAllRows = useCallback(
    () =>
      dispatch({
        type: ActionType.SelectAllRows,
        selectedRows: items,
      }),
    [bulkState.selectedRows]
  )

  const deselectAllRows = useCallback(
    () => dispatch({ type: ActionType.DeselectAllRows }),
    [bulkState.selectedRows]
  )

  const selectRow = useCallback(
    (row: unknown) =>
      dispatch({
        type: ActionType.SelectRow,
        rowToToggle: { row, unicityKey },
      }),
    [bulkState.selectedRows]
  )

  const setSelectedRows = useCallback(
    (selectedRows: Array<unknown>) =>
      dispatch({ type: ActionType.SetSelectedRows, selectedRows }),
    [bulkState.selectedRows]
  )

  const setAllLinesSelected = useCallback(
    (allLinesSelected: boolean) =>
      dispatch({
        type: ActionType.SetAllLinesSelected,
        allLinesSelected,
      }),
    [bulkState.allLinesSelected]
  )

  const selectAllVisibleRows = useCallback(
    () =>
      bulkState.selectedRows.length <= items.length &&
      bulkState.selectedRows.length !== 0
        ? deselectAllRows()
        : setSelectedRows(items),
    [bulkState.selectedRows, bulkState.allLinesSelected]
  )

  return {
    hasBulkActions,
    hasPrimaryBulkAction,
    hasSecondaryBulkActions,

    /** state */
    bulkState,

    /** data */
    bulkedColumns,

    /** handler fn */
    selectAllRows,
    deselectAllRows,
    selectAllVisibleRows,
    selectRow,
    setSelectedRows,
    setAllLinesSelected,
  }
}

function reducer(state: BulkState, action: Action) {
  switch (action.type) {
    case ActionType.SetSelectedRows: {
      return {
        ...state,
        selectedRows: action.selectedRows,
      }
    }
    case ActionType.SetAllLinesSelected: {
      return {
        ...state,
        allLinesSelected: action.allLinesSelected,
      }
    }
    case ActionType.DeselectAllRows: {
      return {
        ...state,
        selectedRows: [],
        allLinesSelected: false,
      }
    }
    case ActionType.SelectAllRows: {
      return {
        ...state,
        selectedRows: action.selectedRows,
        allLinesSelected: true,
      }
    }
    case ActionType.SelectRow: {
      const {
        rowToToggle: { row, unicityKey },
      } = action
      return state.selectedRows.some(
        selectedRow => selectedRow[unicityKey] === row[unicityKey]
      )
        ? {
            ...state,
            selectedRows: state.selectedRows.filter(
              r => r[unicityKey] !== row[unicityKey]
            ),
            allLinesSelected: false,
          }
        : {
            ...state,
            selectedRows: [...state.selectedRows, row],
          }
    }
    default: {
      return state
    }
  }
}

enum ActionType {
  SetSelectedRows,
  SetAllLinesSelected,
  DeselectAllRows,
  SelectAllRows,
  SelectRow,
}

type Action = {
  type: ActionType
  selectedRows?: Array<unknown>
  allLinesSelected?: boolean
  row?: unknown
  rowToToggle?: {
    row?: unknown
    unicityKey: string
  }
}

type hookInput = {
  items: Array<unknown>
  columns: Array<Column>
  bulkActions: BulkActionsProps
  unicityKey: string
}

type hookReturn = {
  bulkedColumns?: Array<Column>
  bulkedItems?: Array<unknown>
  bulkState?: BulkState
  hasBulkActions?: boolean
  hasPrimaryBulkAction?: boolean
  hasSecondaryBulkActions?: boolean
  selectAllRows?: () => void
  deselectAllRows?: () => void
  selectRow?: (row: unknown) => void
  setSelectedRows?: (selectedRows: Array<unknown>) => void
  setAllLinesSelected?: (allLinesSelected: boolean) => void
  selectAllVisibleRows?: () => void
}

export type BulkState = {
  selectedRows?: Array<unknown>
  allLinesSelected?: boolean
}

export type Bulk = {
  bulkState?: BulkState
  hasBulkActions?: boolean
  hasPrimaryBulkAction?: boolean
  hasSecondaryBulkActions?: boolean
  selectAllRows?: () => void
  deselectAllRows?: () => void
  selectRow?: (row: unknown) => void
  setSelectedRows?: (selectedRows: Array<unknown>) => void
  setAllLinesSelected?: (allLinesSelected: boolean) => void
  selectAllVisibleRows?: () => void
}

export default useTableBulkActions
