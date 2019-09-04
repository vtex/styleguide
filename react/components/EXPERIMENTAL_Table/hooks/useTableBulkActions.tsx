import React, { useMemo, useEffect, useReducer } from 'react'
import Checkbox from '../BulkActions/Checkbox'

const useTableBulkActions = ({ items, columns, bulkActions }) => {
  const [bulkState, dispatch] = useReducer(reducer, {
    selectedRows: [],
    allLinesSelected: false,
  })

  const hasPrimaryBulkAction = useMemo(
    () =>
      bulkActions &&
      bulkActions.main &&
      typeof bulkActions.main.handleCallback === 'function',
    [bulkActions]
  )

  const hasSecondaryBulkActions = useMemo(
    () => bulkActions && bulkActions.others && bulkActions.others.length > 0,
    [bulkActions]
  )

  const hasBulkActions = hasPrimaryBulkAction || hasSecondaryBulkActions

  const bulkedItems = useMemo(() => {
    return hasBulkActions && items.map((item, i) => ({ id: i, ...item }))
  }, [items, columns])

  const bulkedColumns = useMemo(() => {
    const headerRender = () => {
      const selectedRowsLength = bulkState.selectedRows.length
      const itemsLength = bulkedItems.length
      const isChecked = selectedRowsLength === itemsLength
      const isPartial =
        selectedRowsLength > 0 && selectedRowsLength < itemsLength

      return (
        <Checkbox
          checked={isChecked}
          onClick={selectAllVisibleRows}
          id="all"
          partial={isPartial}
        />
      )
    }

    const cellRender = ({ rowData }) => (
      <Checkbox
        checked={bulkState.selectedRows.some(row => row.id === rowData.id)}
        onClick={() => selectRow(rowData)}
        id={rowData.id}
        disabled={bulkState.allLinesSelected}
      />
    )

    return hasBulkActions
      ? [
          {
            id: 'bulk',
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

  const selectAllRows = () =>
    dispatch({
      type: 'SELECT_ALL_ROWS',
      selectedRows: bulkedItems,
    })

  const deselectAllRows = () => dispatch({ type: 'DESELECT_ALL_ROWS' })

  const selectRow = (row: BulkedItem) => dispatch({ type: 'SELECT_ROW', row })

  const setSelectedRows = (selectedRows: Array<BulkedItem>) =>
    dispatch({ type: 'SET_SELECTED_ROWS', selectedRows })

  const setAllLinesSelected = (allLinesSelected: boolean) =>
    dispatch({ type: 'SET_ALL_LINES_SELECTED', allLinesSelected })

  const selectAllVisibleRows = () =>
    bulkState.selectedRows.length <= bulkedItems.length &&
    bulkState.selectedRows.length !== 0
      ? deselectAllRows()
      : setSelectedRows(bulkedItems)

  return {
    hasBulkActions,
    hasPrimaryBulkAction,
    hasSecondaryBulkActions,

    /** state */
    bulkState,

    /** data */
    bulkedColumns,
    bulkedItems,
    bulkActions,

    /** handler fn */
    selectAllRows,
    deselectAllRows,
    selectAllVisibleRows,
    selectRow,
    setSelectedRows,
    setAllLinesSelected,
  }
}

type BulkedItem = unknown & {
  id: number
}

type BulkState = {
  selectedRows: Array<BulkedItem>
  allLinesSelected: boolean
}

type BulkAction = {
  type:
    | 'SET_SELECTED_ROWS'
    | 'SET_ALL_LINES_SELECTED'
    | 'DESELECT_ALL_ROWS'
    | 'SELECT_ALL_ROWS'
    | 'SELECT_ROW'
  selectedRows?: Array<BulkedItem>
  allLinesSelected?: boolean
  row?: BulkedItem
}

function reducer(state: BulkState, action: BulkAction) {
  switch (action.type) {
    case 'SET_SELECTED_ROWS': {
      return {
        ...state,
        selectedRows: action.selectedRows,
      }
    }
    case 'SET_ALL_LINES_SELECTED': {
      return {
        ...state,
        allLinesSelected: action.allLinesSelected,
      }
    }
    case 'DESELECT_ALL_ROWS': {
      return {
        ...state,
        selectedRows: [],
        allLinesSelected: false,
      }
    }
    case 'SELECT_ALL_ROWS': {
      return {
        ...state,
        selectedRows: action.selectedRows,
        allLinesSelected: true,
      }
    }
    case 'SELECT_ROW': {
      return state.selectedRows.some(
        selectedRow => selectedRow.id === action.row.id
      )
        ? {
            ...state,
            selectedRows: state.selectedRows.filter(
              row => row.id !== action.row.id
            ),
            allLinesSelected: false,
          }
        : {
            ...state,
            selectedRows: [...state.selectedRows, action.row],
          }
    }
    default: {
      return state
    }
  }
}

export default useTableBulkActions
