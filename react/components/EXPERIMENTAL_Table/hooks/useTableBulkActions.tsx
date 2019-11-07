import React, { useMemo, useEffect, useReducer, useCallback } from 'react'
import uuid from 'uuid'

import Checkbox from '../Checkbox'
import { BulkActionsProps } from '../BulkActions'
import { NAMESPACES } from '../constants'
import { Column } from '../index'

export default function useTableBulkActions({
  items,
  columns,
  bulkActions,
  comparator = item => candidate =>
    item.id && candidate.id && item.id === candidate.id,
}: BulkActionsInput) {
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
        checked={bulkState.selectedRows.some(comparator(rowData))}
        onClick={() => selectRow(rowData)}
        id={`${NAMESPACES.CHECKBOX}-${rowData}-${uuid()}`}
        disabled={bulkState.allLinesSelected}
      />
    )

    return hasBulkActions
      ? [
          {
            vtexTableRoot: 'bulk',
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
        rowToToggle: { row, comparator },
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

  const isRowSelected = useCallback(
    (row: unknown) => {
      return bulkState && bulkState.selectedRows.some(comparator(row))
    },
    [bulkState.selectedRows, bulkState.allLinesSelected]
  )

  return {
    /** constraints */
    hasBulkActions,
    hasPrimaryBulkAction,
    hasSecondaryBulkActions,

    /** state */
    bulkState,

    /** data */
    bulkedColumns,

    /** handler fn */
    isRowSelected,
    selectAllRows,
    deselectAllRows,
    selectAllVisibleRows,
    selectRow,
    setSelectedRows,
    setAllLinesSelected,
  }
}

export type BulkActionsInput = {
  items: Array<unknown>
  comparator: comparatorCurry
  columns: Array<Column>
  bulkActions: BulkActionsProps
  unicityKey: string
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
        rowToToggle: { row, comparator },
      } = action
      return state.selectedRows.some(comparator(row))
        ? {
            ...state,
            selectedRows: state.selectedRows.filter(
              selectedRow => !comparator(selectedRow)(row)
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
    comparator: comparatorCurry
  }
}

type comparatorCurry = (item: any) => (candidate: any) => boolean

export type BulkState = {
  selectedRows?: Array<unknown>
  allLinesSelected?: boolean
}
